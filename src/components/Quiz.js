import React, { Component } from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';



class Quiz extends Component {

//starts quiz
quizStart(type, start, questions){
  var quizData = this
   quizData.type = type
   quizData.start = start
  this.props.updateQuizData(quizData)
}

//grabs cards from props for quiz
grabCards(type, questions){
  var cards = this.props.quizData.questions
  var cardData = Object.keys(cards).map((card, i)=>{
      return [i, card, cards[card][0], cards[card].slice(1, 4)]
  })
  return this.shuffleQuiz(cardData)
}

// //Works to shuffle order of cards and organize front and back of card
shuffleQuiz(array){
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array
}

// allTheCards(){
//   let startQuiz = this.props.quizData.quiz_started
//   let type = this.props.quizData.quiz_type
//   if(startQuiz){
//     console.log('quiz started!')
//   let questions = this.props.quizData.questions;
//   const shuffledQuestions = this.grabCards(type, questions)
//   const showShuffledCards = Object.keys(shuffledQuestions).map((key) => {
//     console.log('in shuffled card const');
//     return <p>{'Hi there'}</p>
// })
//
//     if(type === 'Def'){
//       console.log('Def Quiz!')
//       // return()
//
//     }
//     if(type === 'Word')
//     console.log('Word Quiz!')
//
//
// }
//
// }

  render() {
    var startQuiz = this.props.quizData.quiz_started
    var type = this.props.quizData.quiz_type
    var questions = this.props.quizData.questions
if(startQuiz){
    if(type === 'Def'){
      var def = true
       }
       if(type === 'Word'){
         var word = true

   }
 }



    //  function ShowShuffledCards() {
    //     // var startQuiz = this.props.quizData.quiz_started
    //     // var type = this.props.quizData.quiz_type
    //     // if(this.props.quizData.quiz_started === 'true'){
    //       console.log('quiz started!')
    //       var type = this.props.quizData.quiz_type
    //
    //     let questions = this.props.quizData.questions;
    //
    //     const test = <p>{'test'}</p>;
    //     const shuffledQuestions = this.grabCards(questions)
    //     const showShuffledCards = Object.keys(shuffledQuestions).map((key) => {
    //       return (<p>{key}</p>)
    //   })

      //     if(type === 'Def'){
      //       console.log('Def Quiz!')
      //       // return()
      //
      //     }
      //     if(type === 'Word'){
      //     console.log('Word Quiz!')
      //
      //
      // }
    // }
  // }




    return (
      <Segment>
        <h1> This is the Quiz!</h1>
        <div>
          <Button onClick={() => this.quizStart('Def', true)}>Definition Quiz</Button>
          <Button onClick={() => this.quizStart('Word', true)}>Word Quiz</Button>
          </div>
          {startQuiz ? (
            <p>{'Quiz Started'}</p>
          ) : (null)
        }
            {def ? (
              <p>{'Def quiz fo show'}</p>)
              : (null)
            }
            {word ? (
              <p>{'Word quiz fo show'}</p>)
              : (null)
            }
      </Segment>
    )
  }
}

export default Quiz;
