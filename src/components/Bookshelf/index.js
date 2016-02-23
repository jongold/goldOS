import React, { Component } from 'react';

import IPropTypes from 'react-immutable-proptypes';
import Book from 'components/Book';
import Window from 'components/Window';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator
class Bookshelf extends Component {
  render() {
    console.log('render bookshelf');
    let content;
    if (this.props.books.get('loaded') === true) {
      content = this.props.books.get('books').map((book, i) => <Book item={book} key={i} />)
    } else {
      content = 'Loading…';
    }

    return (
      <Window {...this.props}>
        <div className="flex flex-wrap p2">
          { content }
        </div>
      </Window>
    );
  }
}

Bookshelf.propTypes = {
  books: IPropTypes.list,
};

export default Bookshelf;
