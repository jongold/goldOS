import React, { Component } from 'react';

import IPropTypes from 'react-immutable-proptypes';
import Book from 'Book';
import Window from 'Window';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator
class Bookshelf extends Component {
  render() {
    console.log('render bookshelf');
    return (
      <Window {...this.props}>
        <div className="flex flex-wrap p2">
          {this.props.books.map((book, i) => <Book item={book} key={i} />)}
        </div>
      </Window>
    );
  }
}

Bookshelf.propTypes = {
  books: IPropTypes.list,
};

export default Bookshelf;
