import React from 'react';

const size = 72;

export default function DesktopIcon({ title, onClick }) {
  const fn = onClick.bind(this, title);
  return (
    <div className="px1 mb2 ml2 flex flex-column flex-center"
      onClick={fn}
    >
      <div className="bg-darken-2 mb1 flex align-center center white flex-justify rounded-2"
        style={{ height: size, width: size }}
      >
      </div>
      <span className="block center h6 bold white">
        { title }
      </span>
    </div>
  );
}
