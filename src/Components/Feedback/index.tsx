import React from 'react';
import { Feedback, QuizContext, QuizEvent, QuizState } from "../../Types";
import { State } from "xstate";

import { 
  Answering, Correct, Finish, Idle, Incorrect, Invalid
} from './Moods';

interface FeedbackCompProps {
  state: State<QuizContext, QuizEvent, QuizState>,
}

/* default feedback object map */
const defaultFeedback = { state: "initial", mood: Idle, color: "#a27ae8" };

const feedbackMap: Feedback[] = [
  { state: "initial", mood: Idle, color: "#a27ae8" },
  { state: "answering.idle", mood: Answering, color: "#FCCB7E" },
  { state: "answering.invalid", mood: Invalid, color: "#FCCB7E" },
  { state: "correct", mood: Correct, color: "#50b97e" },
  { state: "incorrect", mood: Incorrect, color: "#ff7043" },
  { state: "finish", mood: Idle, color: "#a27ae8" }
];

/* show current feedback based on state value */
const currentFeedback = (state: State<QuizContext, QuizEvent, QuizState>) => {
  const matched = feedbackMap.filter(feedback =>
    state.toStrings().includes(feedback.state)
  );
  return matched.length === 1 ? matched[0] : defaultFeedback;
};

export default function FeedbackComp({ state }: FeedbackCompProps) {
  
  const Mood = currentFeedback(state).mood;

  return (
    <div className="feedback">
      <div className="emoji">
        <Mood />
      </div>
    </div>
    )
}