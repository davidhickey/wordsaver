import React, { Component } from 'react';
import { Container, Header, Segment, Button, Form, Input} from 'semantic-ui-react'
import Cookies from 'universal-cookie';
import { CSSTransitionGroup } from 'react-transition-group'
import logo from './logo.svg';
import './App.css';

//components
import Navigation from './components/Navigation';
import WordList from './components/WordList';
import Quiz from './components/Quiz';

class App extends Component {
  constructor (props) {

    super(props)

    this.state = {
      page: 'Home',
      show_def: false,
      card_input: '',
      card_value: '',
      card_multi_meaning: '',
      card_speech: '',
      card_definition_first: '',
      card_definition_second: '',
      card_definition_third: '',
      cookie_data: '',
      error: null,
      success: false,
      quiz_mode: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateData = this.updateData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleWordChoice = this.handleWordChoice.bind(this);
    this.updateQuizData = this.updateQuizData.bind(this);
  }


  componentDidMount(){
    console.log('componenent mounted');
    //grabs cookies and sets them to state
    const cookies = new Cookies();
    this.setState({
      cookie_data: cookies.getAll(),
      quiz_mode:{
        quiz_started: false,
        quiz_type: null,
        questions: cookies.getAll(),
        correct: 0,
        wrong: 0,
        currentQuestionNumber: 0,
        cardFlipped: false,
        cardScored: false
      }

    })
  }

  changePage(destination){
    this.setState({page: destination})
  }

  updateInput(event) {
     this.setState({
       card_input: event.target.value,
       success: false,
       error: false
     });
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
          .then(data =>{
            if (!data[0].meta){
              throw new Error('are you sure this is a word?');
            }
            else {
              if(data.length > 1){
                this.setState({
                  card_multi_meaning: data,
                  error: false
                })
                console.log(data)
              }
              else{
                this.setState({
                card_speech: data[0].fl,
                card_definition_first: data[0].shortdef[0],
                card_definition_second: data[0].shortdef[1],
                card_definition_third: data[0].shortdef[2],
                show_def: true,
                error: false,
                success: true,
                  })
                  var speech = this.state.card_speech
                  var def1 = this.state.card_definition_first
                  var def2 = this.state.card_definition_second
                  var def3 = this.state.card_definition_third
                  this.createCookie(word, speech, def1, def2, def3)
              }
            }
          })
      .catch(error => this.setState({
        error: true,
        success: false
      })
    )
  }

  handleWordChoice(multiWord, key){
    this.setState({
    card_speech: multiWord.fl,
     card_definition_first: multiWord.shortdef[0],
     card_definition_second: multiWord.shortdef[1],
     card_definition_third: multiWord.shortdef[2],
     show_def: true,
     error: false,
     card_multi_meaning: '',
     success: true
   })
       var word = this.state.card_value
       var speech = multiWord.fl
       var def1 = multiWord.shortdef[0]
      var def2 = multiWord.shortdef[1]
       var def3 = multiWord.shortdef[2]
      this.createCookie(word, speech, def1, def2, def3)
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
    } else if (hour === 0) {
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

  updateQuizData(quizData){
    this.setState({
      quiz_mode:{
        quiz_started: quizData.quiz_started,
        quiz_type: quizData.quiz_type,
        questions: quizData.questions,
        correct: quizData.correct,
        wrong: quizData.wrong,
        currentQuestionNumber: quizData.currentQuestionNumber,
        cardFlipped: quizData.cardFlipped,
        cardScored: quizData.cardScored
      }

  })
}

  render() {
    const error = this.state.error
    const success = this.state.success
    const page = this.state.page
    const multiMeaning = this.state.card_multi_meaning

    return (
      <Container>
      <div className="App">
      <Header className="margin-bottom relative">
        <h1 className="inline-block left-align site-title">WordSaver</h1>
        <div className="inline-block right-align react-icon">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      <Navigation page = {this.state.page} changePage = {this.changePage} quizReady={this.state.cookie_data} />
      </Header>
      { page === "Home" ?
      <div> 
      <CSSTransitionGroup
     transitionName="comp"
     transitionAppear={true}
     transitionAppearTimeout={1000}
     transitionEnter={true}
     transitionEnterTimeout={500}
     transitionLeaveTimeout={500}
     transitionLeave={true}>
      <Segment className={"margin-bottom"}>
        <Form className="ui form" onSubmit= { this.handleSubmit }>
          <div className="field">
            <Input
            type="text"
            placeholder="Enter Word Here..."
            name= 'card_word'
            value={ this.state.card_input }
            onChange={this.updateInput}
            />
          </div>
          <Button type="submit" value="submit" className="ui button">Get Definition</Button>
        </Form>
        {error ?

          <p className="margin-top red">{'Are you sure this is a word?'}</p>
        : null
      }

        {multiMeaning ?
           <div><p className="margin-top green">{'Which meaning of the word do you want to save?'}</p></div>
           : null
         }

         {multiMeaning ?
              multiMeaning.map((word, key) => {
                return <Segment className="left-align option-container" key={key} onClick={() => this.handleWordChoice(word, key)}>
                 <i className="check icon green pointer"></i>
                 <b>{this.state.card_value} - </b><b><i>{word.fl}</i></b>
                 <ul>{word.shortdef.map((def, key)=> {
                  return <li key={key}>{def}</li>
                   })}</ul>
                 </Segment>
                 }
              )
            : null
          }
          {success ?
          <p className="green margin-top">{'Word has been saved to your cookies!'}</p>
        :
        null
        }

      </Segment>
    </CSSTransitionGroup>
    <CSSTransitionGroup
     transitionName="comp"
     transitionAppear={true}
     transitionAppearTimeout={1000}
     transitionEnter={true}
     transitionEnterTimeout={500}
     transitionLeaveTimeout={500}
     transitionLeave={true}>
      <Segment.Group>
        <WordList data = {this.state.cookie_data} updateData = {this.updateData}/>
      </Segment.Group>
      </CSSTransitionGroup>
      </div>
      :
      <div>
        <Quiz  questions={this.state.cookie_data} page={this.state.page} quizData = {this.state.quiz_mode} updateQuizData = {this.updateQuizData} />
      </div>
      }
      </div>
    </Container>
    );
  }
}

export default App;
