import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Input} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';

//components
// import Cards from './components/Cards';


class App extends Component {
  constructor () {
    super()
    this.state = {
      quiz_mode: false,
      card_word: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = (event) => this.setState({ card_word: event.target.value });

  handleSubmit(event) {
   event.preventDefault();
   console.log(this.state.card_word);
 }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <form class="ui form" onSubmit= { this.handleSubmit }>
          <div class="field">
            <input
            type="text"
            placeholder="Enter Word Here..."
            name= 'card_word'
            value={ this.state.value }
            onChange={this.onChange}
            />
          </div>
          <button type="submit" value="submit" class="ui button">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
