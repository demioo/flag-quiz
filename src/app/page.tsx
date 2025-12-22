"use client";

import { useState } from "react";
import { generateQuiz, type QuizQuestion } from "@/lib/utils";
import { StartScreen } from "@/components/quiz/start-screen";
import { QuestionCard } from "@/components/quiz/question-card";
import { ResultsScreen } from "@/components/quiz/results-screen";

type GameState = "idle" | "playing" | "answered" | "finished";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const startQuiz = () => {
    const newQuiz = generateQuiz();
    setQuiz(newQuiz);
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (countryCode: string) => {
    const currentQuestion = quiz[currentQuestionIndex];
    const correct = currentQuestion.correctCountry.code === countryCode;

    setSelectedAnswer(countryCode);
    setGameState("answered");

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setGameState("playing");
      } else {
        setGameState("finished");
      }
    }, 1500);
  };

  if (gameState === "idle") {
    return <StartScreen handleStart={startQuiz} />;
  }

  if (gameState === "finished") {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={quiz.length}
        handlePlayAgain={startQuiz}
      />
    );
  }

  return (
    <QuestionCard
      question={quiz[currentQuestionIndex]}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={quiz.length}
      handleAnswer={handleAnswer}
      isAnswered={gameState === "answered"}
      selectedAnswer={selectedAnswer}
    />
  );
}
