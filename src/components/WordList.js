import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Form, Input} from 'semantic-ui-react';


class WordList extends Component {
  constructor(props) {
    super(props);
  }

componentWillReceiveProps(props) {
  const data = this.props.data


  console.log(
    Object.keys(data).map((key) => {

    return data[key][1]

    })
  );
  console.log(Object.keys(data));

}

  render() {
    const data = this.props.data
    return (
      <Segment className="left-align">
      {Object.keys(data).reverse().map((key) => {
        return <Segment key={key}>
        <span className="block">{data[key][4]}</span>
        <span className="block">{data[key][5]}</span>
        <b>{key} - </b>
        <b><i>{data[key][0]}; </i></b>
        <ul>
          <li>{data[key][1]}</li>
          <li>{data[key][2]}</li>
          <li>{data[key][3]}</li>
        </ul>
        <i onClick={() => this.props.updateData(key)} className="close icon"></i>
        </Segment>
      })}

      </Segment>

    )
  }
}

export default WordList;
