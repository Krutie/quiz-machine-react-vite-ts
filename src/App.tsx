import React from 'react';

// fetch questions
import { FetchQuestions } from "./Data";

// Child Components
import Action from './Components/Action';
import Instructions from './Components/Instructions';
import Score from './Components/Score';
import Feedback from './Components/Feedback';

import useQuiz from './Hooks/useQuiz';

function App() {

  const { 
    state,
    selectedOption,
    setSelectedOption,
    isQuestionTime,
    isAnswered,
    currentQuestion,
    activeButton
  } = useQuiz(FetchQuestions())

  return (
    <div className="App">
      <h1>Quiz Machine</h1>
      <h2>Vite + React + TypeScript</h2>
      <code> State: {JSON.stringify(state.value)} </code>
    <div className="box">
      <Feedback state={state} />

      {/* <!-- instructions --> */}
      <Instructions state={state} />

      {/* <!-- question --> */}
      <div>
        {(isQuestionTime) && (
          <>
            <span className="question">
              {currentQuestion.text}
            </span>
            {/* <div > */}
              {
                currentQuestion.options.map(option => {
                  return (
                    <div key={option} style={{ textAlign: "left" }}>
                    <input
                      disabled={isAnswered()}
                      type="radio"
                      name="radio"
                      id={option}
                      value={option}
                      checked={ selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                    />
                      <label htmlFor={option}>{option}</label>
                  </div>
                  )
                })
              }
            {/* </div> */}
          </>
        )}
        </div>
      {/* <!-- ACTIONS --> */}
      <Action state={state} activeButton={activeButton} />
    </div>

    {/* SCORE */}
    <Score
      correct={state.context.correct}
      incorrect={state.context.incorrect}
    />
  </div >
)}

export default App
