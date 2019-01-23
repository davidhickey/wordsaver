import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';


class Quiz extends Component {
  constructor(props) {
    super(props);

  }

// componentWillReceiveProps(props) {
//   const page = this.props.page
// }


  render() {
    return (
      <Segment>
        <h1> This is the Quiz!</h1>
      </Segment>
    )
  }
}

export default Quiz;
