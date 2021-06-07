/* eslint-disable */
import { createMachine, assign, DoneInvokeEvent } from "xstate";
import { QuizContext, QuizState, QuizEvent, Answer } from "../Types/";

/**
 * Validate answer
 * @param ctx
 * @param evt 
 */
const validateAnswer = (ctx: QuizContext, evt: QuizEvent) =>
  new Promise((resolve, reject) => {
    if (evt.type === "ANSWER" && evt.answer?.selectedOption !== undefined) {
      resolve(evt.answer);
    } else {
      reject(new Error("Please select answer."));
    }
  });


/**
 * NEXT_QUESTION transition object
 */
const NEXT_Q = [
  {
    target: "answering",
    cond: "canGoToNextQuestion",
    actions: "goToNextQuestion",
  },
  { target: "finish" },
];


/**
 * CHECK_ANSWER transition object
 */
const CHECK_ANSWER = {
  exit: ["clearErrorMessage"],
  on: {
    ANSWER: {
      target: "submitting",
    },
  },
};

export const QuizMachine = createMachine<QuizContext, QuizEvent, QuizState>(
  {
    id: "quiz",
    initial: "initial",
    context: {
      currentQuestion: 0,
      correct: 0,
      incorrect: 0,
      errorMessage: "",
      answer: undefined,
      totalQuestions: 0,
    },
    states: {
      initial: {
        on: {
          START: {
            cond: "newTotalQuestionsIsValidValue",
            actions: "assignTotalQuestionsToContext",
            target: "answering",
          },
        },
      },
      answering: {
        initial: "idle",
        id: "answering-id",
        onDone: {
          target: "checking",
        },
        states: {
          idle: CHECK_ANSWER,
          submitting: {
            invoke: {
              src: validateAnswer,
              id: "validateAnswer",
              onDone: {
                target: "complete",
                actions: assign<QuizContext, DoneInvokeEvent<Answer>>({
                  answer: (context, event) => event.data,
                }),
              },
              onError: {
                target: "invalid",
                actions: assign<QuizContext, DoneInvokeEvent<any>>(
                  (context, event) => {
                    return {
                      errorMessage: event.data.message,
                    };
                  }
                ),
              },
            },
          },
          invalid: CHECK_ANSWER,
          complete: {
            type: "final",
          },
        },
      },
      checking: {
        always: [
          {
            target: "correct",
            cond: "isCorrect",
            actions: assign<QuizContext, QuizEvent>((context) => {
              return {
                correct: context.correct + 1,
              };
            }),
          },
          {
            target: "incorrect",
            cond: "isIncorrect",
            actions: assign<QuizContext, QuizEvent>((context) => {
              return {
                incorrect: context.incorrect + 1,
              };
            }),
          },
        ],
      },
      correct: {
        on: {
          NEXT_QUESTION: NEXT_Q,
        },
      },
      incorrect: {
        on: {
          NEXT_QUESTION: NEXT_Q,
        },
      },
      finish: {
        type: "final",
      },
    },
  },
  {
    guards: {
      newTotalQuestionsIsValidValue: (
        context: QuizContext,
        event: QuizEvent
      ) => {
        if (event.type !== "START") return false;

        return event.totalQuestions > 0;
      },
      canGoToNextQuestion: (context: QuizContext) => {
        return context.currentQuestion < context.totalQuestions;
      },
      isCorrect: (ctx: QuizContext) => {
        return ctx.answer?.selectedOption === ctx.answer?.value;
      },
      isIncorrect: (ctx: QuizContext) => {
        return ctx.answer?.selectedOption !== ctx.answer?.value;
      },
    },
    actions: {
      clearErrorMessage: assign((context: QuizContext) => {
        return { errorMessage: undefined };
      }),
      goToNextQuestion: assign((context: QuizContext) => {
        return { currentQuestion: context.currentQuestion + 1 };
      }),
      assignTotalQuestionsToContext: assign(
        (context: QuizContext, event: QuizEvent) => {
          if (event.type !== "START") return {};
          // questions array starts from index 0
          // reduce one from the total length of questions array
          return {
            totalQuestions: event.totalQuestions - 1,
          };
        }
      ),
    },
  }
);
