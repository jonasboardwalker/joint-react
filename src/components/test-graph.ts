import { dia, shapes } from '@joint/core'

export const testGraph = (graph: dia.Graph) => {
  const rect1 = new shapes.standard.Rectangle()
    .position(50, 50)
    .resize(100, 40)
    .attr({
      body: { fill: '#f6c343', stroke: '#f39c12', strokeWidth: 2 },
      label: { text: 'Start', fill: '#333' },
    })

  const rect2 = new shapes.standard.Rectangle()
    .position(200, 50)
    .resize(100, 40)
    .attr({
      body: { fill: '#3498db', stroke: '#2980b9', strokeWidth: 2 },
      label: { text: 'Process', fill: '#fff' },
    })

  const circle = new shapes.standard.Circle()
    .position(200, 150)
    .resize(60, 60)
    .attr({
      body: { fill: '#e74c3c', stroke: '#c0392b', strokeWidth: 2 },
      label: { text: 'Decision', fill: '#fff' },
    })

  const link1 = new shapes.standard.Link()
    .source(rect1)
    .target(rect2)
    .attr({
      line: {
        stroke: '#333',
        strokeWidth: 2,
        targetMarker: { name: 'classic', size: 8 },
      },
    })

  const link2 = new shapes.standard.Link()
    .source(rect2)
    .target(circle)
    .attr({
      line: {
        stroke: '#333',
        strokeWidth: 2,
        targetMarker: { name: 'classic', size: 8 },
      },
    })

  graph.addCells([rect1, rect2, circle, link1, link2])
}
