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
      show_def: false,
      card_input: '',
      card_value: '',
      card_speech: '',
      card_definition_first: '',
      card_definition_second: '',
      card_definition_third: '',
      cookie_data: '',
      error: null

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateData = this.updateData.bind(this);

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

 updateData(key){
   const cookies = new Cookies();
   cookies.remove(key)
   console.log(key);

   this.setState({cookie_data: cookies.getAll()})
 }

  grabWebsterData(word){
    let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'+ word +'?key=c7ab16a7-6f5a-45f3-b42d-d60b0fab9d91'
      fetch(url,{
          method: "GET"
        }).then(response => {
          if(response.ok){
            return response.json();
          }
          else{
            throw new Error('are you sure this is a word?');
          }
        })
          // console.log("response", response);
          // response.json()
          .then(data =>{
            // console.log(data[0].fl);
            this.setState({
              card_speech: data[0].fl,
             card_definition_first: data[0].shortdef[0],
             card_definition_second: data[0].shortdef[1],
             card_definition_third: data[0].shortdef[2],
             show_def: true,
             error: false
              })
              var speech = this.state.card_speech
              var def1 = this.state.card_definition_first
              var def2 = this.state.card_definition_second
              var def3 = this.state.card_definition_third

              this.createCookie(word, speech, def1, def2, def3)
          })
      // })
      .catch(error => this.setState({
        error: true
      })
    )
  }

  createCookie(word, speech, def1, def2, def3){
    //set datepicker
    let d = new Date(),
    hour = '' + (d.getHours()),
    min  = '' + (d.getMinutes()),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    var timeValue;
    if (hour > 0 && hour <= 12) {
      timeValue= "" + hour;
    } else if (hour > 12) {
      timeValue= "" + (hour - 12);
    } else if (hour == 0) {
      timeValue= "12";
    }
    timeValue += (min < 10) ? ":0" + min : ":" + min;  // get minutes
    timeValue += (hour >= 12) ? " P.M." : " A.M.";  // get AM/PM
    var realTime = timeValue;
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var realDate = [month, day, year].join('-')
    //creates new cookie and sets to state
    const cookies = new Cookies();
    cookies.set(word, [speech, def1, def2, def3, realDate, realTime], { path: '/' });
    this.setState({cookie_data: cookies.getAll()})

  }

  render() {
    const show_def = this.state.show_def
    const error = this.state.error
    // if(error){
    //   return <p>error.message</p>
    // }

    return (
      <Container>
      <div className="App">
        <Header>
          <div className="margin-top">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        <h1 className="no-margin-top">WordSaver</h1>
        </Header>
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
        {error ? (
           <p className="margin-top red">{'Are you sure this is a word?'}</p>
         ) : (
           null
         )
        }
      </Segment>
      <Segment.Group>
        <WordList data = {this.state.cookie_data} updateData = {this.updateData}/>
      </Segment.Group>
      </div>
    </Container>
    );
  }
}

export default App;
