import React, { PropTypes } from 'react';
import Link from '../components/Link';

export default function Welcome({ onClickLink }) {
  return (
    <div>
      <p className="bold">Beep boop, welcome to my corner of the information superhighway.</p>

      <p>I’m Jon Gold, an inter-disciplinary designer, engineer and adventurer from
        London but <Link handleClick={onClickLink} href="/Hello World">usually travelling</Link>.
      </p>

      <p>I’m in love with the convergence of design, technology, AI &amp; good vibes, and I’m looking for work in London or San Francisco working on algorithmic design systems, prototyping &amp; design tooling.</p>

      <p>Hire me, or find my best self on <a href="http://twitter.com/jongold">Twitter</a>.</p>

      <p>This site was built as an experiment with React, Redux, Immutable.js &amp; Basscss in February 2016.</p>
    </div>
  );
}

Welcome.propTypes = {
  onClickLink: PropTypes.func,
};
