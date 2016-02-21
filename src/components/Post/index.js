import React, { Component, PropTypes } from 'react';
import Window from 'components/Window';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator
class Post extends Component {
  render() {
    console.log('render post');
    return (
      <Window {...this.props}>
        <div
          className="h6 p2"
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
      </Window>
    );
  }
}

Post.propTypes = {
  content: PropTypes.string,
};

export default Post;
