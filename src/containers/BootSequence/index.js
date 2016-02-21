import React, { Component, PropTypes } from 'react';
import Typist from 'react-typist';
import { name, version } from '../../../package.json';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import classNames from 'classnames';

const logo = `
                          88           88    ,ad8888ba,     ad88888ba
                          88           88   d8”'    \`”8b   d8”     ”8b
                          88           88  d8'        \`8b  Y8,
 ,adPPYb,d8   ,adPPYba,   88   ,adPPYb,88  88          88  \`Y8aaaaa,
a8”    \`Y88  a8”     ”8a  88  a8”    \`Y88  88          88    \`”””””8b,
8b       88  8b       d8  88  8b       88  Y8,        ,8P          \`8b
”8a,   ,d88  ”8a,   ,a8”  88  ”8a,   ,d88   Y8a.    .a8P   Y8a     a8P
 \`”YbbdP”Y8   \`”YbbdP”'   88   \`”8bbdP”Y8    \`”Y8888Y”'     ”Y88888P”
 aa,    ,88
  ”Y8bbdP”
`;


class BootSequence extends Component {
  state = {
    show: false,
    renderLoading: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }), 300);
  }

  onCommandsTyped = () => {
    this.setState({ renderLoading: true });
  };

  onFinishLoading = () => {
    this.props.dispatch(routeActions.push('/desktop'));
  };

  render() {
    const cx = classNames('vw100', 'vh100', 'p2', 'bootscreen', {
      'bootscreen--show': this.state.show,
    });

    const typist = {
      startDelay: 1000,
      cursor: {
        show: true,
        blink: true,
        element: '_',
        hideWhenDone: false,
        hideWhenDoneDelay: 1000,
      },
    };

    return (
      <div className={cx}>
        <div className="console-text h6 pre mb4">
          { logo }
          <br />
          <p>Copyright (C) 1989-2016, Jon Gold</p>
          <p>“I think it’s extraordinarily important that<br />
            we in computer science keep fun in computing”<br />
            — Alan J. Perlis</p>
        </div>
          <div className="console-text h6">
            { this.state.show ? (
              <Typist {...typist} onTypingDone={this.onCommandsTyped}>
                <strong>λ</strong> system --version
                <br />
                {name} {version}
                <br />
                <br />
                <strong>λ</strong> system start
                <br />
                <br />
              </Typist>
            ) : null }
            { this.state.renderLoading ? (
              <Typist cursor={{ show: false }}
                avgTypingDelay={0}
                onTypingDone={this.onFinishLoading}
              >
                <span className="pre">View Library       ... ReactJS</span>
                <br />
                <span className="pre">State Container    ... Redux</span>
                <br />
                <span className="pre">StyleSheets        ... Basscss</span>
                <br />
                <br />
                <span className="pre">Aligning Body      ... TRUE</span>
                <br />
                <span className="pre">Aligning Breath    ... TRUE</span>
                <br />
                <span className="pre">Aligning Mind      ... TRUE</span>
                <br />
                <span className="pre">Aligning Algorithm ... TRUE</span>
                <br />
                <br />
                beep boop beep boop
                <br />
                reticulating splines...........
                <br />
                beep boop beep boop
                <br />
                loading........................
                <br />
              </Typist>
            ) : null }
          </div>
      </div>
    );
  }
}

BootSequence.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(BootSequence);
