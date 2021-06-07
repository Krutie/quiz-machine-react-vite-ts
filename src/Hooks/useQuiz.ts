
import React, { useState, useEffect } from 'react';

// Types
import { QuizEvent, Question, Action } from "../Types/";

// Machine
import { useMachine } from "@xstate/react";
import { QuizMachine } from "../Machines/QuizMachine";

// GSAP Transition
import { shake } from '../Utils/Transitions';

export default function useQuiz(Questions: Question[]) {

  /* initialise xstate machine */
  const [state, send] = useMachine(QuizMachine, { devTools: true });

  /* user answer to the question */
  const [selectedOption, setSelectedOption] = useState<string | undefined>()

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

  return {
    state,
    selectedOption,
    setSelectedOption,
    isQuestionTime,
    isAnswered,
    currentQuestion,
    activeButton
  }
}