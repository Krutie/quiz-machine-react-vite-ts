import React from 'react';

import { QuizContext, QuizEvent, QuizState } from "../Types";
import { State } from "xstate";

interface InstructionProps {
  state: State<QuizContext, QuizEvent, QuizState>,
}

export default function Instructions({ state }: InstructionProps) {
  return (
  <div>
      { state.matches('initial') && (
      <>
        This quiz is built with XState, React and Vite. Click start to begin.
      </>
    )}
      { state.matches('finish') && (
        <>
          Congratulations! You finished.
        </>
      )}
    </div>
  )
}