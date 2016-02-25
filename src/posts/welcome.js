import React, { PropTypes } from 'react';
import Link from '../components/Link';

export default function Welcome({ onClickLink }) {
  return (
    <div>
      <p className="bold">Beep boop, welcome to my corner of the information superhighway.</p>

      <p>I’m Jon Gold, an inter-disciplinary designer, engineer and adventurer from
        London but <Link handleClick={onClickLink} href="/Hello World">usually travelling</Link>. My favourite emojis are 🙏, 🤖 and 👽.
      </p>

      <p>I’m in love with the convergence of design, technology, AI &amp; good vibes, and <span className="blink">I’m looking for work</span> in London or San Francisco working on algorithmic design systems, prototyping &amp;&amp; / ||  design tooling.</p>

      <p>Most recently I worked on an intelligent typography brain at <a href="http://thegrid.io">The Grid</a>; before that I made a lot of internet at <a href="http://makeshift.io">Makeshift</a> (where I started <a href="http://hiremyfriend.io">Hire My Friend</a>), Sidekick Studios, Evently &amp; Prismatic.</p>

      <p><Link href={"/Contact"} handleClick={onClickLink}>Hire me</Link>, or engage with my personal brand on <a href="http://twitter.com/jongold">Twitter</a>.</p>

      <p>This site was built as an experiment with React, Redux, Immutable.js &amp; Basscss in February 2016.</p>
    </div>
  );
}

Welcome.propTypes = {
  onClickLink: PropTypes.func,
};
