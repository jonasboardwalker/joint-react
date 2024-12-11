import { dia, mvc } from '@joint/core'
import {
  CSSProperties,
  FC,
  ReactNode,
  ReactPortal,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { PaperContext } from '../context'
import { useGraph } from '../hooks'

export const PORTAL_READY_EVENT = 'portal:ready'

export type PaperProps = {
  options?: dia.Paper.Options
  renderElement?: (_element: dia.Element) => ReactNode
  onReady?: (_paper: dia.Paper) => void
  onEvent?: (paper: dia.Paper, ...args: any[]) => void
  style?: CSSProperties
  dataAttributes?: string[]
  portalSelector?: string | ((view: dia.ElementView) => HTMLElement | null)
  children?: ReactNode
}

type ElementState = {
  id: dia.Cell.ID // ID of the element
  data: any // Data from the `model.get('data')`
  containerEl: HTMLElement | null // Reference to the container element
}

export const Paper: FC<PaperProps> = ({
  children,
  options,
  renderElement,
  onReady,
  onEvent,
  style,
  dataAttributes = ['data'],
  portalSelector = 'portal',
}) => {
  const paperWrapperElRef = useRef<HTMLDivElement | null>(null)
  const paperRef = useRef<dia.Paper | null>(null)

  const graph = useGraph()
  const [, setPaperContext] = useContext(PaperContext) ?? []

  const [elements, setElements] = useState<Record<string, ElementState>>({})

  const setElement = (model: dia.Cell, containerEl?: HTMLElement) => {
    setElements((prevState) => {
      const id = model.id
      return {
        ...prevState,
        [id]: {
          id,
          data: model.get('data'),
          containerEl: containerEl ?? prevState[id]?.containerEl ?? null,
        },
      }
    })
  }

  const resizePaperWrapper = (paper: dia.Paper) => {
    if (paperWrapperElRef.current) {
      paperWrapperElRef.current.style.width = paper.el.style.width
      paperWrapperElRef.current.style.height = paper.el.style.height
    }
  }

  const createElementPortal = ({
    id,
    containerEl,
  }: {
    id: dia.Cell.ID
    containerEl: HTMLElement | null
  }): ReactPortal | null => {
    if (!containerEl) {
      return null
    }
    const element = graph.getCell(id)
    if (!element || !(element instanceof dia.Element)) {
      return null
    }
    if (!renderElement) {
      return null
    }
    return createPortal(renderElement(element), containerEl)
  }

  const ElementView = dia.ElementView.extend({
    onRender() {
      let portalEl =
        typeof portalSelector === 'function'
          ? portalSelector(this)
          : portalSelector
      if (typeof portalEl === 'string') {
        portalEl = this.findNode(portalEl)
      }
      portalEl && this.notify(PORTAL_READY_EVENT, portalEl)
    },
  })

  let elementPortals = null
  if (renderElement) {
    elementPortals = Object.values(elements).map(createElementPortal)
  }

  const bindEvents = (paper: dia.Paper) => {
    // An object to keep track of the listeners. It's not exposed, so the users
    // can't undesirably remove the listeners.
    const controller = new mvc.Listener()

    // Update the elements state when the graph data changes
    const attributeChangeEvents = dataAttributes
      .map((attribute) => `change:${attribute}`)
      .join(' ')

    controller.listenTo(graph, attributeChangeEvents, (cell) =>
      setElement(cell)
    )
    // Update the portal node reference when the element view is rendered
    controller.listenTo(paper, PORTAL_READY_EVENT, (elementView, portalEl) =>
      setElement(elementView.model, portalEl)
    )

    controller.listenTo(paper, 'resize', () => resizePaperWrapper(paper))

    if (onEvent) {
      controller.listenTo(paper, 'all', (...args) => onEvent(paper, ...args))
    }

    return () => controller.stopListening()
  }

  useEffect(() => {
    const paper = new dia.Paper({
      width: '100%',
      height: '100%',
      async: true,
      sorting: dia.Paper.sorting.APPROX,
      preventDefaultBlankAction: false,
      // TODO: It is possible to override it. We need to instruct
      // the users to trigger the PORTAL_READY_EVENT event manually
      // or find a better way to do it (e.g. trigger the event in JointJS)
      elementView: ElementView,
      ...options,
      frozen: true,
      model: graph,
    })

    paper.el.style.boxSizing = 'border-box'

    paperWrapperElRef.current?.appendChild(paper.el)
    resizePaperWrapper(paper)

    paper.unfreeze()

    paperRef.current = paper
    setPaperContext?.(paper)

    const unbindEvents = bindEvents(paper)
    if (onReady) {
      onReady(paper)
    }

    return () => {
      paper.remove()
      unbindEvents()
      setPaperContext?.(null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, setPaperContext]) // options, onReady, onEvent, style

  return (
    <div ref={paperWrapperElRef} style={style}>
      <PaperContext.Provider value={[paperRef.current, setPaperContext]}>
        {elementPortals}
        {children}
      </PaperContext.Provider>
    </div>
  )
}
