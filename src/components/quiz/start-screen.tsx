import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CONTINENTS } from "@/lib/constants";
import { Continent } from "@/types";

type StartScreenProps = {
  handleStart: ({ continent }?: { continent?: Continent }) => void;
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
        <CardContent className="space-y-4 ">
          <Button
            variant="outline"
            onClick={() => handleStart()}
            className="w-full"
          >
            All Countries
          </Button>
          {CONTINENTS.map((continent) => (
            <Button
              key={continent}
              variant="outline"
              onClick={() => handleStart({ continent })}
              className="w-full"
            >
              {continent}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
