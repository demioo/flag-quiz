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
    <Card className="w-full max-w-md ">
      <CardHeader>
        <CardTitle className="text-center text-3xl">Flag Quiz</CardTitle>
        <CardDescription className="text-gray-800 text-center">
          Test your knowledge of world flags.
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
