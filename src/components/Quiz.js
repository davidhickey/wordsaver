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
    // console.log(cards)
  var cardData = Object.keys(cards).map((card, i)=>{
      return [i, card, cards[card][0], cards[card].slice(1, 4)]
  })
  return this.shuffleQuiz(cardData)
}

// //Works to shuffle order of cards and organize front and back of card
shuffleQuiz(array){
  // var array = cardData
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






  render() {
    let startQuiz = this.props.quizData.quiz_started
    let type = this.props.quizData.quiz_type
    if(startQuiz){
      console.log('quiz started!')
    let questions = this.props.quizData.questions;
    let shuffledQuestions = this.grabCards(type, questions)
    console.log(shuffledQuestions)


  }
//     console.log(questions)
//     let shuffledQuestions = this.shuffleQuiz([questions])
// console.log(shuffledQuestions)


    return (
      <Segment>
        <h1> This is the Quiz!</h1>
        <div>
          <Button onClick={() => this.quizStart('Def', true)}>Definition Quiz</Button>
          <Button onClick={() => this.quizStart('Word', true)}>Word Quiz</Button>
          </div>
      </Segment>
    )
  }
}

export default Quiz;
