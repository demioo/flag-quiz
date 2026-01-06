"use client";
import { QuestionCard } from "@/components/quiz/question-card/question-card";
import { ResultsScreen } from "@/components/quiz/results-screen/results-screen";
import { StartScreen } from "@/components/quiz/start-screen/start-screen";
import { quizMachine } from "@/machines/quiz-machine";
import { useMachine } from "@xstate/react";

export const Main = () => {
  const [state, send] = useMachine(quizMachine);
  const { quiz, index, score, selected } = state.context;
  const currentQuestion = quiz[index];

  if (state.matches("idle")) {
    return (
      <StartScreen
        handleStart={(options) =>
          send({ type: "START", continent: options?.continent })
        }
      />
    );
  }

  if (state.matches("finished")) {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={quiz.length}
        handleRestart={() => send({ type: "RESTART" })}
      />
    );
  }

  return (
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
};
