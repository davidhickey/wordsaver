import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

class Navigation extends Component {

  render() {
    const page = this.props.page
    const quizReady = Object.keys(this.props.quizReady)[0] ? true : false ;
    // console.log('quiz ready is', Object.keys(quizReady)[0] ? true : false );
    // let quizReady = this.props.quizReady[0] ? true : false;
    // let quizReady = Object.keys(this.props.quizReady)[0] ? true : false ;
    
    function isActive(activePage){
    if(page === activePage){
      return 'active'
    }
  }
    return (
      <div className="ui secondary pointing menu">
        <span className={'pointer item ' + isActive('Home')}
        onClick={() => this.props.changePage('Home')}>
          List
        </span>
        { quizReady ?
        <CSSTransitionGroup transitionName="comp" transitionAppear={true} transitionAppearTimeout={1000} transitionEnter={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionLeave={true}> 
        <span className={'pointer item ' + isActive('Quiz')}
        onClick={() => this.props.changePage('Quiz')}>
          Quiz
        </span>
        </CSSTransitionGroup>
        :
        <CSSTransitionGroup transitionName="comp" transitionAppear={true} transitionAppearTimeout={1000} transitionEnter={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionLeave={true}> 
        <span className={'pointer item bounce-element bounce'}>
          Add a word to unlock Quiz mode!
        </span>
        </CSSTransitionGroup>
        }
      </div>

    )
  }
}

export default Navigation;
