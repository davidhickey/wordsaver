import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Form, Input} from 'semantic-ui-react'
import Cookies from 'universal-cookie';
import DatePicker from "react-datepicker";
import logo from './logo.svg';
import './App.css';

//components
import WordList from './components/WordList';


class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      quiz_mode: false,
      card_input: '',
      card_value: '',
      card_definition: '',
      cookie_data: ''

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }


  componentDidMount(){
    //grabs cookies and sets them to state
    const cookies = new Cookies();
    this.setState({cookie_data: cookies.getAll()})
  }
  updateInput(event) {
     this.setState({card_input: event.target.value});
  }

  handleSubmit(event){
   event.preventDefault();
   this.setState({ card_value: this.state.card_input });
   var word = this.state.card_input;
   this.grabWebsterData(word);
 }

  grabWebsterData(word){
    let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'+ word +'?key=c7ab16a7-6f5a-45f3-b42d-d60b0fab9d91'
      fetch(url,{
          method: "GET"
        }).then(response => {
          // console.log("response", response);
          response.json().then(data =>{
            // console.log(data[0].shortdef);
            this.setState({
             card_definition: data[0].shortdef[0]
              })
              var def = this.state.card_definition
              this.createCookie(word, def)
          })
      })
  }

  createCookie(word, def){
    //set datepicker
    let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var realDate = [month, day, year].join('-')
    //creates new cookie and sets to state
    const cookies = new Cookies();
    cookies.set(word, [this.state.card_definition, realDate], { path: '/' });
    this.setState({cookie_data: cookies.getAll()})
  }

  render() {
    return (
      <Container>
      <div className="App">
      <Segment>
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
        <div className="results">
          <p>{this.state.card_value}</p>
          <p>{this.state.card_definition}</p>
        </div>
        </Segment>
        <Segment.Group>
          <WordList data = {this.state.cookie_data}/>
        </Segment.Group>


      </div>
      </Container>
    );
  }
}

export default App;
