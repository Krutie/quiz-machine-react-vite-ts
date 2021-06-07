import React from 'react';

import { Action, QuizContext, QuizEvent, QuizState } from "../Types";
import { State } from "xstate";

interface ActionProps {
  state: State<QuizContext, QuizEvent, QuizState>,
  activeButton: Action
}

export default function Actions({ state, activeButton }: ActionProps) {

  const { errorMessage } = state.context;

  return (
    <div>
    { !state.matches('finish') && (
        <div className="action">
        <button onClick={activeButton.action}>
          { activeButton.label }
        </button>
        <span style={{display: 'block'}}>{ errorMessage }</span>
      </div>
    )}
    </div>
  )
}