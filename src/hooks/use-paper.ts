import { useContext } from 'react'

import { PaperContext } from '../context/paper-context'

export function usePaper() {
  const context = useContext(PaperContext)
  if (!context) {
    throw new Error('usePaper must be used within a GraphProvider')
  }
  const [paper] = context

  if (!paper) {
    throw new Error(
      'Paper is not initialized. Ensure the `graph` is passed to `GraphProvider`.'
    )
  }
  return paper
}
