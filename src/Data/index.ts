import { Question } from "../Types/";

const questions: Question[] = [
  {
    text:
      "False: You have to author two separate Xstate machines to be used in Vue app and React app. ",
    answer: "False",
    options: ['True', 'False']
  },
  {
    text: "Which one of the following is a library?",
    answer: "React",
    options: ['React', 'Vue']
  },
  {
    text: "This is true.",
    answer: "True",
    options: ['True', 'False']
  },
  {
    text: "This is false.",
    answer: "False",
    options: ['True', 'False']
  },
  {
    text: "True: Context API in React is bit similar to Provide/Inject in Vue.",
    answer: "True",
    options: ['True', 'False']
  },
  {
    text:
      "True: watchEffect in Vue 3 is sort of similar to useEffect in React, like they both handle side-effects.",
    answer: "True",
    options: ['True', 'False']
  },
  {
    text: "This is false.",
    answer: "False",
    options: ['True', 'False']
  }
];

export const FetchQuestions = () => {
  return questions;
};
