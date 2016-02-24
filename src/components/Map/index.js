import React, { Component, PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import topojson from 'topojson';
import classNames from 'classnames';
import d3 from 'd3';
import { compose, contains, find, pluck, prop, propEq } from 'ramda';

import world110m from './world-110m.topojson';
import states from './states.topojson';

import { createElement } from 'react-faux-dom';

import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import Window from 'components/Window';

@immutableRenderDecorator
class Map extends Component {
  render() {
    console.log('render map');
    const visited = this.props.places.toJS();

    // const visitedNames = pluck('name', visited);

    const statesVisited = compose(
      prop('states'),
      find(propEq('name', 'United States of America'))
    )(visited);

    const statesVisitedNames = pluck('name', statesVisited);

    const { height, width } = this.props;

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
      <Window height={240} width={260} {...this.props}>
        <div className="p1">
          {node.toReact()}
        </div>
      </Window>
    );
  }
}

Map.propTypes = {
  places: IPropTypes.list,
  height: PropTypes.number,
  width: PropTypes.number,
  title: PropTypes.string,
};

export default Map;
