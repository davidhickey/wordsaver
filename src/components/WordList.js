import React, { Component } from 'react';
// import Cookies from 'universal-cookie';
import { Segment} from 'semantic-ui-react';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

class WordList extends Component {

  render() {
    const data = this.props.data;


    const wordList = Object.assign([], data);

    return (

      <Segment className="left-align no-border">
      <CSSTransitionGroup
          transitionName="word"
          transitionEnter={true}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={500}
          transitionLeave={true}>
      {Object.keys(wordList).reverse().map((key) => {
        return <Segment key={key}>
        <br/>
        <b>{key} - </b>
        <b><i>{data[key][0]}; </i></b>
        <ul>
          <li>{data[key][1]}</li>
          {data[key][2] ? (
            <li>{data[key][2]}</li>
          ) : (
            null
          )
          }
          {data[key][3] ? (
          <li>{data[key][3]}</li>
          ) : (
            null
          )
          }
        </ul>
        <span className="block word-added">Added on {data[key][4]} at {data[key][5]}</span>
        <i onClick={() => this.props.updateData(key)} className="close icon"></i>
        </Segment>
      })}
      </CSSTransitionGroup>
      </Segment>
    )
  }
}

export default WordList;
