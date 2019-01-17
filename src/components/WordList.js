import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Form, Input} from 'semantic-ui-react';


class WordList extends Component {
  constructor(props) {
 super(props);
// this.state = { term: '' };
}

componentDidUpdate () {
  const data = this.props.data

  console.log(Object.keys(data));


}


  render() {
    const data = this.props.data
    return (
      <Segment>
      <ul>
      {Object.keys(data).map((key) => {
        return <li key={key}><b>{key} - </b><i>{data[key]}</i></li>
      })}

      </ul>
      </Segment>

    )
  }
}

export default WordList;
