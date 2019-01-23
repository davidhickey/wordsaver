import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';


class Navigation extends Component {
  constructor(props) {
    super(props);

  }

componentWillReceiveProps(props) {
  const page = this.props.page
}


  render() {
    const page = this.props.page
    function isActive(activePage){
    if(page === activePage){
      return 'active'
    }
  }
    return (
      <div className="ui secondary pointing menu">
        <a  className={'item ' + isActive('Home')}
        onClick={() => this.props.changePage('Home')}>
          Home
        </a>
        <a className={'item ' + isActive('Quiz')}
        onClick={() => this.props.changePage('Quiz')}>
          Quiz
        </a>
      </div>

    )
  }
}

export default Navigation;
