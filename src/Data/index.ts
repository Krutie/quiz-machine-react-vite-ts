import { Question } from "../Types/";

const questions: Question[] = [
  {
    text:
      "You have to author two separate Xstate machines to be used in Vue app and React app. ",
    answer: "False",
    options: ["True", "False"]
  },
  {
    text: "Vite can be used with Vue, React and even Svelte.",
    answer: "True",
    options: ["True", "False"]
  },
  {
    text: "Context API in React is bit similar to Provide/Inject in Vue.",
    answer: "True",
    options: ["True", "False"]
  },
  {
    text:
      "watchEffect in Vue 3 is sort of similar to useEffect in React, like they both handle side-effects.",
    answer: "True",
    options: ["True", "False"]
  },
  {
    text: "Vite is a French word for furious.",
    answer: "False",
    options: ["True", "False"]
  }
];

export const FetchQuestions = () => {
  return questions;
};
