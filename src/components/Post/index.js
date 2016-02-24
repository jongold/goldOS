import React, { Component, PropTypes } from 'react';
import Window from 'components/Window';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator
class Post extends Component {
  render() {
    console.log('render post');
    const Content = this.props.content;
    return (
      <Window {...this.props}>
        <div className="p2 h5">
          <Content onClickLink={this.props.onClickLink} />
        </div>
      </Window>
    );
  }
}

Post.propTypes = {
  content: PropTypes.string,
  onClickLink: PropTypes.func,
};

export default Post;
