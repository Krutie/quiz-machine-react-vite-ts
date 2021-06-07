import React, { useState, useEffect } from 'react';
import './App.css'

// XSTATE
import { useMachine } from "@xstate/react";
import { QuizEvent, Question, Action } from "./Types/";
import { QuizMachine } from "./Machines/QuizMachine";

// fetch questions
import { FetchQuestions } from "./Data";

// Child Components
import Actions from './Components/Actions';
import Instructions from './Components/Instructions';
import Score from './Components/Score';
import Feedback from './Components/Feedback';

// GSAP Transition
import { shake } from './Utils/Transitions';

function App() {
  /* user answer to the question */
  const [selectedOption, setSelectedOption] = useState<string | undefined>()

  const Questions: Question[] = FetchQuestions();
    
  /* initialise xstate machine */
  const [ state, send ] = useMachine(QuizMachine, { devTools: true });

  /* current question based on context value defined in Quiz machine */
  const currentQuestion = Questions[state.context.currentQuestion];

  /* show question if the following states don't matche */
  const isQuestionTime = !state.matches("initial") && !state.matches("finish");

  const resultStates = ["correct", "incorrect"] as const;
  const isAnswered = () => resultStates.some(state.matches);

  
  /* ACTION: Array below decides which button to show based on current state */
  const actions: Action[] = [
    {
      label: "START",
      cond: state => state.matches("initial"),
      action: () =>
        send({
          type: "START",
          totalQuestions: Questions.length
        } as QuizEvent)
    },
    {
      label: "ANSWER",
      cond: state => ["answering.idle", "answering.invalid"].some(state.matches),
      action: () =>
        send({
          type: "ANSWER",
          answer: {
            selectedOption: selectedOption,
            value: currentQuestion.answer
          }
        } as QuizEvent)
    },
    {
      label: "NEXT",
      cond: state => ["correct", "incorrect"].some(state.matches),
      action: () => send({ type: "NEXT_QUESTION" })
    }
  ];

  /* ACTIONS: show active button based on state value */
  const activeButton = actions.find(action => action.cond(state)) || actions[0];

  /* reset answers when new question is set */
  useEffect(() => {
    // reset radio buttons when state becomes pending
    setSelectedOption(undefined)
  }, [state.context.currentQuestion]);

  useEffect(() => {
    // shake box when answer is invalid
    if (state.matches("answering.invalid") && selectedOption === undefined) {
      shake(".box")
    }
  });

  return (
    <div className="App">
      <h2>Quiz Machine with Vite - React - TS</h2>
      <code> {JSON.stringify(state.value)} </code>
    <div className="box">
      <Feedback state={state} />

      {/* <!-- instructions --> */}
      <Instructions state={state} />

      {/* <!-- question --> */}
        {(!state.matches("initial") && !state.matches("finish")) && (
          <>
            <span className="question">
              {currentQuestion.text}
            </span>
            <div>
              {
                currentQuestion.options.map((option, key) => {
                  return (
                  <div key={option}>
                    <input
                      disabled={isAnswered()}
                      type="radio"
                      name="radio"
                      id={option}
                      value={option}
                      onChange={() => setSelectedOption(option)}
                    />
                      <label htmlFor={option}>{option}</label>
                  </div>
                  )
                })
              }
            </div>
          </>
        )}

      {/* <!-- ACTIONS --> */}
      <Actions state={state} activeButton={activeButton} />
    </div>

    {/* SCORE */}
    <Score
      correct={state.context.correct}
      incorrect={state.context.incorrect}
    />
  </div >
)}

export default App
