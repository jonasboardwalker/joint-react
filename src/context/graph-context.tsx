import { dia } from '@joint/core'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

type Graph = dia.Graph
type GraphContextValue = [Graph, Dispatch<SetStateAction<Graph>>]

export const GraphContext = createContext<GraphContextValue | undefined>(
  undefined
)

type GraphProviderProps = {
  children: ReactNode
  graph: Graph
}

export function GraphProvider({ children, graph }: GraphProviderProps) {
  const [graphContext, setGraphContext] = useState(graph)
  return (
    <GraphContext.Provider value={[graphContext, setGraphContext]}>
      {children}
    </GraphContext.Provider>
  )
}
