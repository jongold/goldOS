import React from 'react';
import { compose, join, split, toLower } from 'ramda';

// String -> String
const lowerHyphenate = compose(toLower, join('-'), split(' '));

// String -> String
const iconUrl = title => `./icons_${lowerHyphenate(title)}.svg`;

const size = 72;

export default function DesktopIcon({ title, onClick }) {
  const fn = onClick.bind(this, title);
  const src = iconUrl(title);
  const Icon = require(src);
  return (
    <div className="px1 mb2 ml2 flex flex-column flex-center"
      onClick={fn}
    >
      <div className="flex-justify"
        style={{ height: size, width: size }}
      >
        <Icon />
      </div>
      <span className="block center h6 bold white">
        { title }
      </span>
    </div>
  );
}
