import React, { PropTypes } from 'react';

export default function Link(props) {
  const { handleClick, href } = props;
  const fn = (e) => {
    e.preventDefault();
    handleClick(href);
  };

  return (
    <a {...props} onClick={fn} />
  );
}

Link.propTypes = {
  handleClick: PropTypes.func,
  href: PropTypes.string,
};
