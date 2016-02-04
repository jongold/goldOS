import React, { Component } from 'react'
import d3 from 'd3'
import moment from 'moment'
import { createElement } from 'react-faux-dom'
import Window from 'Window'
import R, { } from 'ramda'


export default class Habits extends Component {
  render () {
    console.log(this.props)
    const momentify = R.evolve({
      date: moment
    })

    const habits = R.map(momentify, this.props.data.toJS())
    const node = createElement('svg')
    const width = 134 + 2
    const cellSize = 7
    const margin = 6
    const height = 6 * (margin + (2 * cellSize))

    const svg = d3.select(node)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(8, 8)`)

    const position = R.curry((cellSize, margin, i) => {
      return (i - 1) * (margin + (2 * cellSize)) 
    })

    const boundPos = position(cellSize, margin)

    const day = (d) => d.date.isoWeekday()

    const week = (d) => {
      const week = d.date.isoWeek() + 1
      if (week > 52) {
        return week - 53
      } else {
        return week
      }
    }

    const x = R.compose(boundPos, day)
    const y = R.compose(boundPos, week)

    const rect = svg.selectAll('.day')
      .data((d) => habits)
      .enter()
      .append('circle')
      .attr('class', 'day')
      .attr('r', cellSize)
      .attr('cx', x)
      .attr('cy', y)
      .attr('stroke-width', 1)
      .attr('fill', 'white')
      .attr('class', 'stroke-gold')
      .attr('data-date', (d) => d.date.toString())
      .attr('class', (d) => {
        return d.meditate ? 'fill-gold' : 'fill-gold muted'
      })

    return (
      <Window title='Habits'>
        <div className='p2 flex'>
          <div className='fex fex-column'>
          <p className='center h6 bold'>
            Meditate
          </p>
          {node.toReact()}
        </div>
        </div>
      </Window>
    )
  }
}
