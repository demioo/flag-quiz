import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COUNTRIES } from "./constants";
import { Continent } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Country = {
  code: string;
  name: string;
  emoji: string;
  continent: string;
};

export type QuizQuestion = {
  correctCountry: Country;
  options: Country[];
};

type GenerateQuizParams = {
  numOfQuestions?: number;
  numOfOptions?: number;
  continent?: Continent;
};

export const generateQuiz = ({
  numOfQuestions = COUNTRIES.length,
  numOfOptions = 4,
  continent,
}: GenerateQuizParams = {}): QuizQuestion[] => {
  const filteredCountries = continent
    ? COUNTRIES.filter((country) => country.continent === continent)
    : COUNTRIES;

  const shuffledCountries = [...filteredCountries].sort(
    () => 0.5 - Math.random()
  );

  const correctAnswers = shuffledCountries.slice(
    0,
    Math.min(numOfQuestions, filteredCountries.length)
  );

  return correctAnswers.map((correctCountry) => {
    const wrongOptions = filteredCountries
      .filter((country) => country.code !== correctCountry.code)
      .sort(() => 0.5 - Math.random())
      .slice(0, numOfOptions - 1);

    const options = [correctCountry, ...wrongOptions].sort(
      () => 0.5 - Math.random()
    );

    return {
      correctCountry,
      options,
    };
  });
};
