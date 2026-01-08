"use client";

import { quizMachine } from "@/machines/quiz-machine";
import { useMachine } from "@xstate/react";

import { QuestionCard } from "@/components/quiz/question-card/question-card";
import { ResultsScreen } from "@/components/quiz/results-screen/results-screen";
import { StartScreen } from "@/components/quiz/start-screen/start-screen";
import { QuizWrapper } from "../quiz-wrapper/quiz-wrapper";

export const Main = () => {
  const [state, send] = useMachine(quizMachine);
  const { quiz, index, score, selected } = state.context;

  const showHome = !state.matches("idle");

  let screen: React.ReactNode;

  if (state.matches("idle")) {
    screen = (
      <StartScreen
        handleStart={(options) =>
          send({ type: "START", continent: options?.continent })
        }
      />
    );
  } else if (state.matches("finished")) {
    screen = (
      <ResultsScreen
        score={score}
        totalQuestions={quiz.length}
        handleRestart={() => send({ type: "RESTART" })}
      />
    );
  } else {
    const currentQuestion = quiz[index];

    screen = (
      <QuestionCard
        question={currentQuestion}
        questionNumber={index + 1}
        totalQuestions={quiz.length}
        handleAnswer={(countryCode) =>
          send({ type: "ANSWER", code: countryCode })
        }
        isAnswered={state.matches("answered")}
        selectedAnswer={selected}
      />
    );
  }

  return (
    <QuizWrapper showHome={showHome} onHome={() => send({ type: "RESTART" })}>
      {screen}
    </QuizWrapper>
  );
};
