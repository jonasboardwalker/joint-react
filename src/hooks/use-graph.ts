import { useContext } from 'react'

import { GraphContext } from '../context/graph-context'

export function useGraph() {
  const context = useContext(GraphContext)
  if (!context) {
    throw new Error('useGraph must be used within a GraphProvider')
  }
  const [graph] = context

  if (!graph) {
    throw new Error(
      'Graph is not initialized. Ensure the `graph` is passed to `GraphProvider`.'
    )
  }

  return graph
}
