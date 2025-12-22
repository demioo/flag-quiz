import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

type ResultsScreenProps = {
  score: number;
  totalQuestions: number;
  handlePlayAgain: () => void;
};

export function ResultsScreen({
  score,
  totalQuestions,
  handlePlayAgain,
}: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center">
        <CardTitle>Quiz Complete!</CardTitle>
        <CardDescription>Here&apos;s how you did:</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="text-6xl font-bold text-primary">{percentage}%</p>
          <p className="mt-2 text-lg text-muted-foreground">
            {score} out of {totalQuestions} correct
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={handlePlayAgain} className="w-full">
          Play Again
        </Button>
      </CardFooter>
    </Card>
  );
}
