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
        <div>
            There are total three questions in this quiz. You can choose to answer or
            skip. Skipped question will be marked as an incorrect answer.
        </div>
      </>
    )}
      { state.matches('finish') && (
        <>
          <div>
            Congratulations! You finished.
          </div>
        </>
      )}
    </div>
  )
}