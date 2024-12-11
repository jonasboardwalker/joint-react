import { dia } from '@joint/core'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

type Paper = dia.Paper
type PaperContextValue = [Paper | null, Dispatch<SetStateAction<Paper | null>>]

export const PaperContext = createContext<PaperContextValue>([null, () => {}])

type PaperProviderProps = {
  children: ReactNode
}

export function PaperProvider({ children }: PaperProviderProps) {
  const [paper, setPaper] = useState<Paper | null>(null)
  return (
    <PaperContext.Provider value={[paper, setPaper]}>
      {children}
    </PaperContext.Provider>
  )
}
