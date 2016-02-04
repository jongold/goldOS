import React, { Component } from 'react'
import d3 from 'd3'
import { createElement } from 'react-faux-dom'
import Window from 'Window'
import { compose, curry, map, pick } from 'ramda'

export default class Habits extends Component {
  renderHabit (prop) {
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

    const position = curry((cellSize, margin, i) => {
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

    const x = compose(boundPos, day)
    const y = compose(boundPos, week)

    const rect = svg.selectAll('.day')
      .data((d) => this.props.data)
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
        return d[prop] ? 'fill-gold' : 'fill-gold muted'
      })

    return (
      <div className='mr3'>
        <p className='center h6 bold'>
          {prop}
        </p>
        {node.toReact()}
      </div>
    )
  }

  render () {

    return (
      <Window title='Habits'>
        <div className='p2 flex'>
          {this.renderHabit('meditate')}
          {this.renderHabit('no alcohol')}
          {this.renderHabit('reading')}
        </div>
      </Window>
    )
  }
}
