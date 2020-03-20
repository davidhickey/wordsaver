import React, { Component } from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';

const shuffle = (unshuffledCards) => {
  let shuffledCards = {};
  let keys = Object.keys(unshuffledCards);

  keys.sort(function(a,b) {return Math.random() - 0.5;});
  keys.forEach(function(k) {
    shuffledCards[k] = unshuffledCards[k]
  });

  return shuffledCards
}

class Quiz extends Component {

//starts quiz
quizStart(quizType, quizData){

  let getQuestions = this.props.questions
  console.log('at start of quiz the data is', quizData);
  quizData.quiz_started = true;
  quizData.quiz_type = quizType;
  quizData.questions = shuffle(getQuestions);
 
  this.props.updateQuizData(quizData)
}

flipCard(quizData){
  quizData.cardFlipped = true;

  this.props.updateQuizData(quizData);
}

scoreCard(correct, quizData){
  let addOne = quizData.correct + 1;
  let minusOne = quizData.wrong + 1;
  correct ? quizData.correct = addOne : quizData.wrong = minusOne;
  quizData.cardScored = true;

  this.props.updateQuizData(quizData);
}

nextCard(quizData){
  let goToNext = quizData.currentQuestionNumber + 1;
  quizData.currentQuestionNumber = goToNext;

  quizData.cardFlipped = false;
  quizData.cardScored = false;

  this.props.updateQuizData(quizData);
}


reset(quizData){
  quizData.quiz_started = false;
  quizData.quiz_type = null;
  quizData.correct = 0;
  quizData.wrong = 0;
  quizData.currentQuestionNumber = 0;
  quizData.cardFlipped = false;
  quizData.carScored = false;


  this.props.updateQuizData(quizData);
}


render() {

    let quizData = this.props.quizData;
    let quizType = quizData.quiz_type;
    let cardNum = quizData.currentQuestionNumber;
    let cardCount = cardNum + 1;
    let questions = quizData.questions;
    let word = quizData.questions ? Object.keys(questions)[cardNum] : null;
    let def =  quizData.questions ? Object.values(questions)[cardNum] : null;
    let cardTotal = quizData.questions ? Object.keys(questions).length : null;
    let numCorrect = quizData.correct;
    let numWrong = quizData.wrong; 
    let cardFlipped = quizData.cardFlipped;
    let cardScored = quizData.cardScored;
    let resetGame = cardCount === cardTotal ? true : false; 
        
    return (
      <Segment>
        {quizData.quiz_started ? null : <h1>Quiz me on words or definitions?</h1>}
          {quizData.quiz_started ? 
            <div className="card-container">
              <div>
                <span className="inline-block left-align">{'Quiz Started'}</span>
                <span className="inline-block right-align">{'Card Count: '} <span>{cardCount}</span><span>{' / '}</span><span>{cardTotal}</span></span></div>
              <Segment className="Card">
                {cardFlipped ?
                <div> 
                  <p>{quizType === 'def' ? 'The definition is...' : 'The word is...'}</p>
                  <p>{quizType === 'def' ? def : word}</p>
                  {cardScored ?
                  <div> 
                    {resetGame ? 
                      <div>
                        <Button onClick={() => this.shuffleReset(quizData)}>Shuffle and Play Again?</Button>
                      </div>
                      :    
                      <div>             
                        <Button onClick={() => this.nextCard(quizData)}>Next Card</Button>
                      </div>
                    }
                  </div>
                  :
                  <div>
                    <Button onClick={() => this.scoreCard(true, quizData)}>I got it right :)</Button>
                    <Button onClick={() => this.scoreCard(false, quizData)}>I got it wrong :(</Button>
                  </div>
                  }
                </div>
                :
                <div>
                  <p>{quizType === 'def' ? 'What is the definition of this word?' : 'What is the word?'}</p>
                  <p>{quizType === 'def' ? word : def}</p>
                  <Button onClick={() => this.flipCard(quizData)}>Flip Me!</Button>
                </div>
                }
              </Segment>
              <div>{'Quiz Score'}</div>
              <div><span>{'Correct: '}<span>{numCorrect}</span></span><span>{' Wrong: '}<span>{numWrong}</span></span></div>
            </div>
             :
             <div>
             <Button onClick={() => this.quizStart('def', quizData)}>Definition Quiz</Button>
             <Button onClick={() => this.quizStart('word', quizData)}>Word Quiz</Button>
           </div>
          }
      </Segment>
    )
  }
}

export default Quiz;
