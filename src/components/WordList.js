import React, { Component } from 'react';
// import Cookies from 'universal-cookie';
import { Segment} from 'semantic-ui-react';
import { CSSTransitionGroup } from 'react-transition-group' // ES6



class WordList extends Component {
  // constructor(props) {
  //   super(props);
  // }

// componentWillReceiveProps(props) {
//   const data = this.props.data
// }

  render() {
    const data = this.props.data
    return (

      <Segment className="left-align">
      <CSSTransitionGroup
          transitionName="word"
          transitionEnter={true}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={500}
          transitionLeave={true}>
      {Object.keys(data).reverse().map((key) => {
        return <Segment key={key}>
        <span className="block">{'Added on ' +`${data[key][4]}`+ ' at '+ `${data[key][5]}`}</span>
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
        <i onClick={() => this.props.updateData(key)} className="close icon"></i>
        </Segment>
      })}
      </CSSTransitionGroup>
      </Segment>


    )
  }
}

export default WordList;
