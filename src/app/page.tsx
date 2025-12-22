"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { generateQuiz, QuizQuestion } from "@/lib/utils";
import { useState } from "react";

type GameState = "idle" | "playing" | "answered" | "finished";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startQuiz = () => {
    const newQuiz = generateQuiz();
    setQuiz(newQuiz);
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (countryCode: string) => {
    const currentQuestion = quiz[currentQuestionIndex];
    const correct = currentQuestion.correctCountry.code === countryCode;

    setSelectedAnswer(countryCode);
    setIsCorrect(correct);
    setGameState("answered");

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setGameState("playing");
      } else {
        setGameState("finished");
      }
    }, 1500);
  };

  const getButtonClassName = (countryCode: string) => {
    if (gameState !== "answered") {
      return "";
    }

    const currentQuestion = quiz[currentQuestionIndex];
    const isCorrectAnswer = currentQuestion.correctCountry.code === countryCode;
    const isSelectedAnswer = selectedAnswer === countryCode;

    if (isCorrectAnswer) {
      return "border-green-500 border-2 bg-green-50 dark:bg-green-950";
    }

    if (isSelectedAnswer && !isCorrectAnswer) {
      return "border-red-500 border-2 bg-red-50 dark:bg-red-950";
    }

    if (!isSelectedAnswer && !isCorrectAnswer) {
      return "opacity-50";
    }
  };

  if (gameState === "idle") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Flag Quiz</CardTitle>
            <CardDescription className="text-gray-800 text-center">
              Test your knowledge of world flags.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" onClick={startQuiz} className="w-full">
              Play
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (gameState === "finished") {
    const percentage = Math.round((score / quiz.length) * 100);
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Card className="w-full max-w-md">
          <CardHeader className="items-center">
            <CardTitle>Quiz Complete!</CardTitle>
            <CardDescription>Here&apos;s how you did:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-6xl font-bold text-primary">{percentage}%</p>
              <p className="mt-2 text-lg text-muted-foreground">
                {score} out of {quiz.length} correct
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={startQuiz} className="w-full">
              Play Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Question {currentQuestionIndex + 1} of {quiz.length}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-8">
            <div className="text-9xl">
              {currentQuestion.correctCountry.emoji}
            </div>
            <p className="text-xl font-medium">
              Which country does this flag belong to?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {currentQuestion.options.map((country) => (
                <Button
                  key={country.code}
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswer(country.code)}
                  disabled={gameState === "answered"}
                  className={`h-auto py-4 text-lg ${getButtonClassName(
                    country.code
                  )}`}
                >
                  {country.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
