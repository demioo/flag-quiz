import { Button } from "@/components/ui/button";

type QuizWrapperProps = {
  showHome: boolean;
  onHome: () => void;
  children: React.ReactNode;
};

export const QuizWrapper = ({
  showHome,
  onHome,
  children,
}: QuizWrapperProps) => {
  return (
    <>
      <div className="w-full max-w-2xl">
        {showHome && <Button onClick={onHome}>Home</Button>}
        {children}
      </div>
    </>
  );
};
