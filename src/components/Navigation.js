import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';


class Navigation extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);

  }

componentWillReceiveProps(props) {
  const page = this.props.page
}

// handleClick(event){
 //   event.target.classList.add('active');
 // }

  render() {
    const page = this.props.page

    return (
      <div className="ui secondary pointing menu">
        <a className="item active" onClick={() => this.props.changePage('Home')}>
          Home
        </a>
        <a className="item" onClick={() => this.props.changePage('Quiz')}>
          Quiz
        </a>
      </div>

    )
  }
}

export default Navigation;
