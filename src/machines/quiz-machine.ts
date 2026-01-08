import { generateQuiz, type QuizQuestion } from "@/lib/utils";
import type { Continent } from "@/types";
import { assertEvent, assign, setup } from "xstate";

type Context = {
  quiz: QuizQuestion[];
  index: number;
  score: number;
  selected: string | null;
};

type Events =
  | { type: "START"; continent?: Continent }
  | { type: "ANSWER"; code: string }
  | { type: "RESTART" };

const initialContext: Context = {
  quiz: [],
  index: 0,
  score: 0,
  selected: null,
};

export const quizMachine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actions: {
    resetContext: assign(() => initialContext),

    startQuiz: assign(({ event }) => {
      assertEvent(event, "START");
      const quiz = generateQuiz({ continent: event.continent });
      return { quiz, index: 0, score: 0, selected: null };
    }),

    answer: assign(({ context, event }) => {
      assertEvent(event, "ANSWER");
      const currentQuestion = context.quiz[context.index];
      const correct = currentQuestion.correctCountry.code === event.code;
      return {
        selected: event.code,
        score: correct ? context.score + 1 : context.score,
      };
    }),

    nextQuestion: assign(({ context }) => ({
      index: context.index + 1,
      selected: null,
    })),
  },
  guards: {
    hasMoreQuestions: ({ context }) => context.index < context.quiz.length - 1,
  },
}).createMachine({
  id: "quiz",
  initial: "idle",
  context: initialContext,

  on: {
    RESTART: { target: ".idle", actions: "resetContext" },
  },

  states: {
    idle: {
      on: {
        START: { target: "playing", actions: "startQuiz" },
      },
    },
    playing: {
      on: {
        ANSWER: { target: "answered", actions: "answer" },
      },
    },
    answered: {
      after: {
        1250: [
          {
            target: "playing",
            actions: "nextQuestion",
            guard: "hasMoreQuestions",
          },
          { target: "finished" },
        ],
      },
    },
    finished: {},
  },
});
