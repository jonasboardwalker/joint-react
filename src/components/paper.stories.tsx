import { dia, shapes } from '@joint/core'
import type { Meta, StoryObj } from '@storybook/react'

import { GraphProvider, PaperProvider } from '../context'
import { Paper } from './paper'
import { testGraph } from './test-graph'

// Define mock data for the Graph
const graph = new dia.Graph({}, { cellNamespace: shapes })
testGraph(graph)

const paperOptions: dia.Paper.Options = {
  width: 800,
  height: 400,
  background: { color: '#f8f9fa' },
  gridSize: 10,
}

// Mock function to render elements
const renderElement = (element: dia.Element) => {
  const data = element.get('data') || {}
  return (
    <div style={{ padding: '4px', backgroundColor: '#e9ecef' }}>
      <strong>{data.label || 'Default Label'}</strong>
    </div>
  )
}

const meta: Meta<typeof Paper> = {
  title: 'Components/Paper',
  component: Paper,
  decorators: [
    (Story) => (
      <GraphProvider graph={graph}>
        <PaperProvider>
          <Story />
        </PaperProvider>
      </GraphProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Paper>

export const Default: Story = {
  args: {
    options: paperOptions,
    renderElement,
    style: { border: '1px solid #ccc' },
  },
}
