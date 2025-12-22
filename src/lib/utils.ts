import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Country = {
  code: string;
  name: string;
  emoji: string;
  continent: string;
};

export const COUNTRIES: Country[] = [
  { code: "UK", name: "United Kingdom", emoji: "🇬🇧", continent: "Europe" },
  { code: "NG", name: "Nigeria", emoji: "🇳🇬", continent: "Africa" },
  { code: "JP", name: "Japan", emoji: "🇯🇵", continent: "Asia" },
  { code: "BR", name: "Brazil", emoji: "🇧🇷", continent: "South America" },
  { code: "ZA", name: "South Africa", emoji: "🇿🇦", continent: "Africa" },
  { code: "CA", name: "Canada", emoji: "🇨🇦", continent: "North America" },
  { code: "FR", name: "France", emoji: "🇫🇷", continent: "Europe" },
  { code: "CO", name: "Colombia", emoji: "🇨🇴", continent: "South America" },
];

export type QuizQuestion = {
  correctCountry: Country;
  options: Country[];
};

type GenerateQuizParams = {
  numOfQuestions?: number;
  numOfOptions?: number;
};

export const generateQuiz = ({
  numOfQuestions = COUNTRIES.length,
  numOfOptions = 4,
}: GenerateQuizParams = {}): QuizQuestion[] => {
  const shuffledCountries = [...COUNTRIES].sort(() => 0.5 - Math.random());

  const correctAnswers = shuffledCountries.slice(
    0,
    Math.min(numOfQuestions, COUNTRIES.length)
  );

  return correctAnswers.map((correctCountry) => {
    const wrongOptions = COUNTRIES.filter(
      (country) => country.code !== correctCountry.code
    )
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
