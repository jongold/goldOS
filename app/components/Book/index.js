import React from 'react';

const Book = ({ item }) => {
  const width = 100
  const height = 128
  const viewBox = [0, 0, width, height].join(' ')

  const d = "M93,8h-7H7H6C4.9,8,4,7.1,4,6c0-1.1,0.9-2,2-2h74V0H6C2.7,0,0,2.7,0,6v10.5V121c0,3.9,3.1,7,7,7h86c3.9,0,7-3.1,7-7V15C100,11.1,96.9,8,93,8z"

  console.log(item)

  return (
    <div className='mr2 mb2 relative'>
      <svg width={width}
        height={height}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg">
        <path className="fill-gold" d={d} />
      </svg>
      <span className='absolute h6 white left-0 right-0 center mt3'>
        {item.get('title')}
      </span>
    </div>
  )
}

export default Book;

