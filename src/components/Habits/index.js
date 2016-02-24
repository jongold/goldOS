import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import { createElement } from 'react-faux-dom';
import Window from 'components/Window';
import { compose, curry } from 'ramda';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator
export default class Habits extends Component {
  renderHabit(prop) {
    const node = createElement('svg');
    const width = 134 + 2;
    const cellSize = 7;
    const margin = 6;
    const height = 10 * (margin + (2 * cellSize));

    const svg = d3.select(node)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(8, 8)`);

    const position = curry((size, m, i) => {
      return (i - 1) * (m + (2 * size));
    });

    const boundPos = position(cellSize, margin);

    const day = (d) => d.date.isoWeekday();

    const week = (d) => {
      const w = d.date.isoWeek() + 1;
      if (w > 52) {
        return w - 53;
      }
      return w;
    };

    const x = compose(boundPos, day);
    const y = compose(boundPos, week);

    svg.selectAll('.day')
      .data(() => this.props.data)
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
        return d[prop] ? 'fill-gold' : 'fill-gold muted';
      });

    return (
      <div className="flex-grow center">
        <p className="center h6 bold">
          {prop}
        </p>
        {node.toReact()}
      </div>
    );
  }

  render() {
    return (
      <Window {...this.props}>
        <div className="p2 h6">
          <p>I’ve meditated sporadically for years, but I’m finding it fascinating to see how my mind is changing since quitting alcohol (for one, it makes meditating more frequently easier).</p>
          <p>I’m logging my habits with a custom tool I made (just because) that I plan to open source soon.</p>
        </div>
        <div className="p2 flex">
          {this.renderHabit('meditate')}
          {this.renderHabit('no alcohol')}
          {this.renderHabit('reading')}
        </div>
      </Window>
    );
  }
}

Habits.propTypes = {
  data: PropTypes.array,
};
