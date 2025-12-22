import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

type StartScreenProps = {
  handleStart: () => void;
};

export const StartScreen = ({ handleStart }: StartScreenProps) => {
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
          <Button variant="outline" onClick={handleStart} className="w-full">
            Play
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
