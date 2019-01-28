import React, { Component } from 'react';
// import { Header } from 'semantic-ui-react';


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
        <span className={'item ' + isActive('Home')}
        onClick={() => this.props.changePage('Home')}>
          Home
        </span>
        <span className={'item ' + isActive('Quiz')}
        onClick={() => this.props.changePage('Quiz')}>
          Quiz
        </span>
      </div>

    )
  }
}

export default Navigation;
