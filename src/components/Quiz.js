import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { CSSTransitionGroup } from 'react-transition-group' // ES6


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
  quizData.cardScored = false;


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
      <Segment className="quiz-container">
          {quizData.quiz_started ?
            <CSSTransitionGroup
            transitionName="comp"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={true}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionLeave={true}> 
            <div className="card-container">
              <div>
              <div className="score-container"><span>{'Correct: '}<span>{numCorrect}</span></span><span>{' Wrong: '}<span>{numWrong}</span></span></div>
                <span className="inline-block right-align">{'Card Count: '} <span>{cardCount}</span><span>{' / '}</span><span>{cardTotal}</span></span>
              </div>
              <Segment className="Card">
                {cardFlipped ?
                <div> 
                  <p className="prompt">{quizType === 'def' ? <span>{"The definition of " + word + " is..." }</span> : 'The word is...'}</p>
                  <div>{quizType === 'def' ?
                    <CSSTransitionGroup transitionName="comp" transitionAppear={true} transitionAppearTimeout={1000} transitionEnter={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionLeave={true}> 
                    <div className="def-answer">
                      <div><b>{word + " - " + def[0]}</b></div>
                      <div>
                        <ul>
                          <li>{def[1]}</li>
                          <li>{def[2]}</li>
                          <li>{def[3]}</li>
                        </ul>
                      </div>
                      <div>{"Add on " + def[4] + " at " + def[5]}</div>
                    </div>
                    </CSSTransitionGroup> 
                    : 
                    <CSSTransitionGroup transitionName="comp" transitionAppear={true} transitionAppearTimeout={1000} transitionEnter={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionLeave={true}> 
                    <div className="word-answer">{word}</div>
                    </CSSTransitionGroup>
                    }
                    </div>
                  {cardScored ?
                  <div> 
                    {resetGame ? 
                      <div className="quiz-button-container">
                        <Button onClick={() => this.reset(quizData)}>Shuffle and Play Again?</Button>
                      </div>
                      :    
                      <div className="quiz-button-container">             
                        <Button onClick={() => this.nextCard(quizData)}>Next Card</Button>
                      </div>
                    }
                  </div>
                  :
                  <div className="quiz-button-container">
                    <Button className="correct" onClick={() => this.scoreCard(true, quizData)}>I got it right!</Button>
                    <Button className="wrong" onClick={() => this.scoreCard(false, quizData)}>I got it wrong!</Button>
                  </div>
                  }
                </div>
                :
                <div>
                  <p className="prompt">{quizType === 'def' ? 'What is the definition of this word?' : 'What is this word?'}</p>
                  <CSSTransitionGroup transitionName="comp" transitionAppear={true} transitionAppearTimeout={1000} transitionEnter={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionLeave={true}> 
                  <div className="question">
                    {quizType === 'def' ? word
                    : 
                      <div className="def-question">
                        <div><b>{def[0]}</b></div>
                          <ul>
                            <li>{def[1]}</li>
                            <li>{def[2]}</li>
                            <li>{def[3]}</li>
                          </ul>
                      </div> 
                    }
                  </div>
                  </CSSTransitionGroup>
                  <div className="quiz-button-container">
                  <Button onClick={() => this.flipCard(quizData)}>Flip Me!</Button>
                  </div>
                </div>
                }
              </Segment>
            </div>
            </CSSTransitionGroup>
             :
             <CSSTransitionGroup transitionName="comp" transitionAppear={true} transitionAppearTimeout={1000} transitionEnter={true} transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionLeave={true}> 
             <div className="quiz-button-container">
              <Button onClick={() => this.quizStart('def', quizData)}>Definition Quiz</Button>
              <Button onClick={() => this.quizStart('word', quizData)}>Word Quiz</Button>
            </div>
            </CSSTransitionGroup>
          }
      </Segment>
    )
  }
}

export default Quiz;
