import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizQuestion } from "@/lib/utils";

type QuestionCardProps = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  handleAnswer: (countryCode: string) => void;
  isAnswered: boolean;
  selectedAnswer: string | null;
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  handleAnswer,
  isAnswered,
  selectedAnswer,
}: QuestionCardProps) {
  const getButtonClassName = (countryCode: string) => {
    if (!isAnswered) {
      return "";
    }

    const isCorrectAnswer = question.correctCountry.code === countryCode;
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

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            Question {questionNumber} of {totalQuestions}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-8">
          <div className="text-9xl">{question.correctCountry.emoji}</div>
          <p className="text-xl font-medium">
            Which country does this flag belong to?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {question.options.map((country) => (
              <Button
                key={country.code}
                variant="outline"
                size="lg"
                onClick={() => handleAnswer(country.code)}
                disabled={isAnswered}
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
  );
}
