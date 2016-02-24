import React, { PropTypes } from 'react';
import Link from '../components/Link';

export default function Welcome({ onClickLink }) {
  return (
    <div>
      <p>Beep boop, welcome to my corner of the information superhighway.</p>

      <p>I’m Jon Gold, an inter-disciplinary designer, engineer and adventurer from
        London but <Link handleClick={onClickLink} href="/Hello World">usually travelling</Link>.
      </p>

      <p>I’m absolutely fascinated by the convergence of design, technology, artificial intelligence &amp; good vibes, and I’m looking for work in London or San Francisco working on design systems, prototyping &amp; tooling.</p>

    </div>
  );
}

Welcome.propTypes = {
  onClickLink: PropTypes.func,
};
