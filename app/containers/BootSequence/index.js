import React, { Component } from 'react'
import Typist from 'react-typist'
import text from '../../posts/bootsequence.md'
import { name, version } from 'json!../../../package.json'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import classNames from 'classnames'

class BootSequence extends Component {
  state = {
    show: false,
    renderLoading: false
  };

  componentDidMount () {
    setTimeout(() => this.setState({ show: true }), 300)
  };

  onCommandsTyped = () => {
    this.setState({ renderLoading: true })
  };

  onFinishLoading = () => {
    this.props.dispatch(routeActions.push('/desktop'));
  };

  render () {
    const cx = classNames('vw100', 'vh100', 'p2', 'bootscreen', {
      'bootscreen--show': this.state.show
    })

    const typist = {
      startDelay: 1000,
      cursor: {
        show: true,
        blink: true,
        element: '|',
        hideWhenDone: false,
        hideWhenDoneDelay: 1000,
      }
    }
    return (
      <div className={cx}>
>
        <div className='console-text h6 pre mb4'>
          <p>“I think it’s extraordinarily important that<br />
            we in computer science keep fun in computing”<br />
            — Alan J. Perlis</p>
          {logo}
        </div>
          <div className='console-text h6'>
            { this.state.show ? (
              <Typist {...typist} onTypingDone={this.onCommandsTyped}>
                <strong>λ</strong> system --version
                <br />
                {name} {version}
                <br />
                <br />
                <strong>λ</strong> system
              </Typist>
            ) : null }
            { this.state.renderLoading ? (
              <Typist cursor={{show: false}}
                avgTypingDelay={0}
                onTypingDone={this.onFinishLoading}>
                <br />
                loading........................
                <br />
                reticulating splines...........
                <br />
                i
                <br />
                program
                <br />
                my
                <br />
                home
                <br />
                computer
                <br />
                beam
                <br />
                myself
                <br />
                into
                <br />
                the
                <br />
                future
                <br />
              </Typist>
            ) : null }
          </div>
      </div>
    )
  }
}


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



`

export default connect()(BootSequence)
