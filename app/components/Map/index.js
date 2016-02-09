import React, { Component } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import topojson from 'topojson';
import classNames from 'classnames';
import d3 from 'd3';
import { compose, contains, find, pluck, prop, propEq } from 'ramda';

import world110m from 'json!./out.json';
import states from 'json!./states.topojson';

import { createElement } from 'react-faux-dom';

import Window from 'Window';

class Map extends Component {
  render() {
    const visited = [
      { name: 'Australia', current: true },
      { name: 'Denmark' },
      { name: 'France' },
      { name: 'Germany' },
      { name: 'Ireland' },
      { name: 'Italy' },
      { name: 'Portugal' },
      { name: 'Sweden' },
      { name: 'United Arab Emirates' },
      { name: 'United Kingdom' },
      { name: 'United States of America', states: [
        { name: 'California' },
        { name: 'Florida' },
        { name: 'Illinois' },
        { name: 'Nevada' },
        { name: 'New York' },
        { name: 'North Carolina' },
        { name: 'Oregon' },
      ] },
      { name: 'Belgium' },
      { name: 'Gibraltar' },
      { name: 'Greece' },
      { name: 'Israel' },
      { name: 'Jersey' },
      { name: 'Latvia' },
      { name: 'Malta' },
      { name: 'Mauritius' },
      { name: 'Monaco' },
      { name: 'Netherlands' },
      { name: 'Spain' },
      { name: 'Turkey' },
    ];

    // const visitedNames = pluck('name', visited);

    const statesVisited = compose(
      prop('states'),
      find(propEq('name', 'United States of America'))
    )(visited);

    const statesVisitedNames = pluck('name', statesVisited);

    const {} = this.props;
    const title = 'Travels';

    const height = '480';
    const width = '640';

    const node = createElement('svg');

    const projection = d3.geo.mercator()
      .scale((width - 32) / 2 / Math.PI)
      .translate([width / 2, height / 2]);

    const path = d3.geo.path()
      .projection(projection);

    const svg = d3.select(node)
      .attr('width', width)
      .attr('height', height)
      .append('g');
      // .attr('transform', `translate(8, 8)`);

    // console.log(states)
    svg.selectAll('.country')
      .data(topojson.feature(world110m, world110m.objects.countries).features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', (d) => {
        if (d.properties.name === 'United States of America') {
          return 'fill-white';
        }

        const country = find(propEq('name', d.properties.name), visited);
        return classNames('country', `country-${d.id}`, {
          'fill-gold': !!country,
          'fill-silver': !country,
          muted: !propEq('current', true, country || {}),
        });
      });

    // const statesFeatures = filter((d) => {
    //   return contains(d.id, statesVisitedNames);
    // }, topojson.feature(states, states.objects.gz_2010_us_040_00_20m).features);
    const statesFeatures = topojson.feature(states, states.objects.gz_2010_us_040_00_20m).features;

    svg.selectAll('.state')
      .data(statesFeatures)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', (d) => {
        const state = find(propEq('name', d.properties.name), statesVisited);
        return classNames('state', `state-${d.id}`, {
          'fill-gold': !!state,
          'fill-silver': !state,
          muted: !propEq('current', true, state || {}),
        });
      });

    svg.append('path')
      .datum(topojson.mesh(world110m, world110m.objects.countries, (a, b) => {
        return a !== b;
        // && contains(a.properties.name, visitedNames)
        // && contains(b.properties.name, visitedNames);
      }))
      .attr('d', path)
      .attr('fill', 'none')
      .attr('class', 'stroke-white');

    svg.append('path')
      .datum(topojson.mesh(states, states.objects.gz_2010_us_040_00_20m, (a, b) => {
        return a !== b
          && contains(a.properties.name, statesVisitedNames)
          && contains(b.properties.name, statesVisitedNames);
      }))
      .attr('d', path)
      .attr('fill', 'none')
      .attr('class', 'stroke-white');

    return (
      <Window title={title} height={240} width={260} {...this.props}>
        <div className="p1">
          {node.toReact()}
        </div>
      </Window>
    );
  }
}

Map.propTypes = {
  visited: IPropTypes.list,
};

export default Map;
