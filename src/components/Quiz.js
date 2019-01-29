import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { CSSTransitionGroup } from 'react-transition-group'



class Quiz extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }



  render() {
    return (
      <CSSTransitionGroup
          transitionName="comp"
          transitionAppear={true}
          transitionAppearTimeout={100}
          transitionEnter={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionLeave={true}>
      <Segment>
        <h1> This is the Quiz!</h1>
        <div>
          Recent quiz Results
          </div>
      </Segment>
      </CSSTransitionGroup>
    )
  }
}

export default Quiz;
