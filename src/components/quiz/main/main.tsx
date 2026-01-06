"use client";
import { QuestionCard } from "@/components/quiz/question-card/question-card";
import { ResultsScreen } from "@/components/quiz/results-screen/results-screen";
import { StartScreen } from "@/components/quiz/start-screen/start-screen";
import { generateQuiz, type QuizQuestion } from "@/lib/utils";
import { useEffect, useState } from "react";

type GameState = "idle" | "playing" | "answered" | "finished";

type StartQuizParams = {
  continent?:
    | "Africa"
    | "Asia"
    | "Europe"
    | "North America"
    | "Oceania"
    | "South America";
};

export const Main = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const startQuiz = ({ continent }: StartQuizParams = {}) => {
    const newQuiz = generateQuiz({ continent });
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
  };

  useEffect(() => {
    if (gameState !== "answered") return;

    const timeOutId = setTimeout(() => {
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setGameState("playing");
      } else {
        setGameState("finished");
      }
    }, 1250);

    return () => clearTimeout(timeOutId);
  }, [gameState, currentQuestionIndex, quiz.length]);

  if (gameState === "idle") {
    return <StartScreen handleStart={startQuiz} />;
  }

  if (gameState === "finished") {
    return (
      <ResultsScreen
        score={score}
        totalQuestions={quiz.length}
        handlePlayAgain={() => setGameState("idle")}
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
};
