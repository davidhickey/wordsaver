import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Form, Input} from 'semantic-ui-react';


class WordList extends Component {
  constructor(props) {
    super(props);
  }

componentWillReceiveProps(props) {
  const data = this.props.data

  console.log(Object.keys(data));

}


  render() {
    const data = this.props.data
    return (
      <Segment className="left-align">
      {Object.keys(data).map((key) => {
        return <Segment key={key}><b>{key} - </b><i>{data[key]}</i></Segment>
      })}

      </Segment>

    )
  }
}

export default WordList;
