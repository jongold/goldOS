import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import IPropTypes from 'react-immutable-proptypes';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ItemTypes } from 'redux/modules/constants';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { selectPlaylistItem, selectWindow, closeWindow, moveWindow,
} from 'redux/modules/actions';
import { startBiosAnimation, renderBiosLoading, finishBiosLoading } from 'redux/modules/biosReducer';
import { changeThread } from 'redux/modules/contactReducer';
import config from '../../config';
import selector from './selector';
import './styles.css';

import BootSequence from 'components/BootSequence';
import Bookshelf from 'components/Bookshelf';
import Contact from 'components/Contact';
import DesktopIcon from 'components/DesktopIcon';
import Habits from 'components/Habits';
import Map from 'components/Map';
import MediaPlayer from 'components/MediaPlayer';
import Post from 'components/Post';
import img from './desktopbg.jpg';

import welcomePost from '../../posts/welcome';

const windowTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const x = Math.round(item.x + delta.x);
    const y = Math.round(item.y + delta.y);

    component.onMoveWindow({ id: item.id, x, y });
  },
};

@connect(selector)
@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.WINDOW, windowTarget, dropConnect => ({
  connectDropTarget: dropConnect.dropTarget(),
}))
class Desktop extends Component {
  constructor() {
    super();
    this.onChangeRoute = this.onChangeRoute.bind(this);
    this.onClickPlaylistItem = this.onClickPlaylistItem.bind(this);
    this.onSelectWindow = this.onSelectWindow.bind(this);
    this.onCloseWindow = this.onCloseWindow.bind(this);
    this.onClickDesktopIcon = this.onClickDesktopIcon.bind(this);
    this.onStartBiosAnimation = this.onStartBiosAnimation.bind(this);
    this.onRenderBiosLoading = this.onRenderBiosLoading.bind(this);
    this.onFinishBiosLoading = this.onFinishBiosLoading.bind(this);
    this.onClickThread = this.onClickThread.bind(this);
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onChangeRoute(url) {
    this.props.dispatch(routeActions.push(url));
  }

  onSelectWindow(id) {
    this.props.dispatch(selectWindow(id));
  }

  onCloseWindow(id) {
    this.props.dispatch(closeWindow(id));
  }

  onClickDesktopIcon(title) {
    this.props.dispatch(routeActions.push(`/${title}`));
  }

  onClickPlaylistItem(item) {
    this.props.dispatch(selectPlaylistItem(item));
  }

  onMoveWindow(item) {
    this.props.dispatch(moveWindow(item));
  }

  onStartBiosAnimation() {
    this.props.dispatch(startBiosAnimation());
  }

  onRenderBiosLoading() {
    this.props.dispatch(renderBiosLoading());
  }

  onFinishBiosLoading() {
    this.props.dispatch(finishBiosLoading());
  }

  onClickThread(title) {
    this.props.dispatch(changeThread(title));
  }

  renderWindows() {
    let zIndex = 0;

    return this.props.windows.map((win, key) => {
      switch (win.get('title')) {
        case 'Habits':
          return (
            <Habits
              key={key}
              id={key}
              title={win.get('title')}
              data={this.props.habits}
              x={win.get('x')} y={win.get('y')} z={zIndex++}
              onSelect={this.onSelectWindow}
              onClickClose={this.onCloseWindow}
            />
          );

        case 'Bookshelf':
          return (
            <Bookshelf
              key={key}
              id={key}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={zIndex++}
              books={this.props.books}
              onSelect={this.onSelectWindow}
              onClickClose={this.onCloseWindow}
            />
          );

        case 'Podcasts':
          return (
            <MediaPlayer
              key={key}
              id={key}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={zIndex++}
              onSelect={this.onSelectWindow}
              onClickClose={this.onCloseWindow}
              clickPlaylistItem={this.onClickPlaylistItem}
              current={this.props.podcasts.get('current')}
              items={this.props.podcasts.get('library')}
            />
          );

        case 'Contact':
          return (
            <Contact
              key={key}
              id={key}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={zIndex++}
              data={this.props.contact}
              onSelect={this.onSelectWindow}
              onClickThread={this.onClickThread}
              onClickLink={this.onChangeRoute}
              onClickClose={this.onCloseWindow}
            />
          );

        case 'Welcome':
          return (
            <Post
              key={key}
              id={key}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={zIndex++}
              content={welcomePost}
              onSelect={this.onSelectWindow}
              onClickLink={this.onChangeRoute}
              onClickClose={this.onCloseWindow}
            />
          );

        case 'Hello World':
          return (
            <Map
              key={key}
              id={key}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={zIndex++}
              places={this.props.travel}
              height={480} width={640}
              onSelect={this.onSelectWindow}
              onClickClose={this.onCloseWindow}
            />
          );
        default:
          return null;
      }
    }).valueSeq();
  }

  renderIcons() {
    const icons = [
      'Welcome',
      'Hello World',
      'Bookshelf',
      'Habits',
      'Podcasts',
      'Speaking',
      'Contact',
    ];

    return (
      <ul className="flex flex-column px2 py2 mt3"
        style={{ flexWrap: 'wrap-reverse', justifyContent: 'flex-start',
          alignItems: 'center', alignContent: 'center' }}
      >
        {icons.map((icon) => <DesktopIcon
          key={icon}
          title={icon}
          onClick={this.onClickDesktopIcon}
        />
        )}
      </ul>
    );
  }

  renderBios() {
    return (
      <BootSequence
        bios={this.props.bios}
        start={this.onStartBiosAnimation}
        renderLoading={this.onRenderBiosLoading}
        finish={this.onFinishBiosLoading}
      />
    );
  }

  renderDesktop() {
    const { connectDropTarget, windows } = this.props;
    const title = windows.last() && windows.last().get('title');

    return connectDropTarget(
      <div
        style={{ background: `no-repeat center url(${img}), 20px 20px url(/bgpattern.png), #DFBA69`,
          justifyContent: 'flex-end' }}
        className="bg-gold vh100 vw100 overflow-hidden cu-default flex flex-start"
      >
        <Helmet title={ title || 'Desktop' } />
        <div className="bg-gold-dark white h6 absolute top-0 left-0 right-0 py1 flex">
          <div className="bold px2">λ</div>
          <div className="bold px2">{ title || 'goldOS' }</div>
          <div className="px2">File</div>
          <div className="px2">Edit</div>
          <div className="px2">View</div>
          <div className="px2">Window</div>
          <div className="px2 relative">Help</div>
          {/*   <div className="absolute" style={{ */}
          {/*     background: '#B49655', */}
          {/*     left: 0, */}
          {/*     top: 26, */}
          {/*     zIndex: 100, */}
          {/*     width: 100, */}
          {/*   }} */}
          {/*   > */}
          {/*     <div className="px2 py1">me</div> */}
          {/*     <div className="px2 py1">I’ve</div> */}
          {/*     <div className="px2 py1">got</div> */}
          {/*     <div className="px2 py1">no</div> */}
          {/*     <div className="px2 py1">soul</div> */}
          {/*     <div className="px2 py1">to</div> */}
          {/*     <div className="px2 py1">sell</div> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
        {this.renderWindows()}
        {this.renderIcons()}
      </div>
    );
  }

  render() {
    const content = this.props.renderDesktop ? this.renderBios() : this.renderDesktop();

    return (
      <div>
        <Helmet { ...config.app.head } />
        { content }
      </div>
    );
  }
}

Desktop.propTypes = {
  dispatch: PropTypes.func,
  windows: IPropTypes.orderedSet,
  habits: PropTypes.array,
  books: IPropTypes.list,
  podcasts: IPropTypes.map,
  travel: IPropTypes.list,
  connectDropTarget: PropTypes.func,
  bios: IPropTypes.map,
  contact: IPropTypes.map,
  renderDesktop: PropTypes.func,
};

export default Desktop;
