import React, { Component } from 'react';

class Navigation extends Component {

  render() {
    const page = this.props.page
    function isActive(activePage){
    if(page === activePage){
      return 'active'
    }
  }
    return (
      <div className="ui secondary pointing menu">
        <span className={'pointer item ' + isActive('Home')}
        onClick={() => this.props.changePage('Home')}>
          Home
        </span>
        <span className={'pointer item ' + isActive('Quiz')}
        onClick={() => this.props.changePage('Quiz')}>
          Quiz
        </span>
      </div>

    )
  }
}

export default Navigation;
