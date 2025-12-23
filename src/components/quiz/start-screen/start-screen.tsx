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
  handleStart: (options?: { continent?: Continent }) => void;
};

export const StartScreen = ({ handleStart }: StartScreenProps) => {
  return (
    <Card className="bg-zinc-50 border-0 shadow-none max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center text-5xl">
          <h1>World Flags Quiz</h1>
        </CardTitle>
        <CardDescription className="text-gray-800 text-center text-lg">
          Test your knowledge of flags from around the world!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <Button
          variant="outline"
          className="py-6 w-full"
          onClick={() => handleStart()}
        >
          All Flags
        </Button>
        {CONTINENTS.map((continent) => (
          <Button
            key={continent}
            variant="outline"
            className="py-6 w-full"
            onClick={() => handleStart({ continent })}
          >
            {continent}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
