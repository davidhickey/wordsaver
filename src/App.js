import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Form, Input} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';

//components
// import Cards from './components/Cards';


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quiz_mode: false,
      card_input: '',
      card_value: '',
      card_definition: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }
  handleSubmit(event) {
   event.preventDefault();
   this.setState({ card_value: this.state.card_input });
   // console.log(this.state.card_value);
  }
  updateInput(event) {
     this.setState({card_input: event.target.value});
  }
  componentDidUpdate(prevState){
      let value = this.state.card_value;
      console.log(value);

     //  let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'+ value +'?key=c7ab16a7-6f5a-45f3-b42d-d60b0fab9d91'
     //
     // fetch(url,{
     //      method: "GET"
     //    }).then(response => {
     //      console.log("response", response);
     //
     //      response.json().then(data =>{
     //        console.log(data[0].shortdef);
     //        this.setState({
     //          card_definition: data[0].shortdef[0]
     //        });
     //      });
     //    })


  }


  render() {
    return (
      <div className="App">

        <form className="ui form" onSubmit= { this.handleSubmit }>
          <div className="field">
            <input
            type="text"
            placeholder="Enter Word Here..."
            name= 'card_word'
            value={ this.state.card_input }
            onChange={this.updateInput}
            />
          </div>
          <button type="submit" value="submit" className="ui button">Submit</button>
        </form>
        <div className="segment results">
          <p>{this.state.card_value}</p>
          <p>{this.state_card_definition}</p>

        </div>
      </div>
    );
  }
}

export default App;
