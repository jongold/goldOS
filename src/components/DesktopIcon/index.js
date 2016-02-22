import React from 'react';
import { compose, join, split, toLower } from 'ramda';

// String -> String
const lowerHyphenate = compose(toLower, join('-'), split(' '));

// String -> String
const iconUrl = title => `./icons_${lowerHyphenate(title)}.svg`;

const size = 72;

export default function DesktopIcon({ title, onClick }) {
  const fn = (e) => {
    e.preventDefault()
    return onClick(title);
  }

  const src = require(iconUrl(title));
  return (
    <div className="px1 mb2 ml2 flex flex-column flex-center"
    >
      <a href={`/desktop/${title}`} onClick={fn}>
        <div
          className="flex-justify"
          style={{ height: size, width: size }}
        >
          <img src={src} />
        </div>
        <span className="block center h6 bold white">
          { title }
        </span>
      </a>
    </div>
  );
}
