export type Word = {
  status: "correct" | "incorrect" | "pending";
  letter: string;
  word: string;
  definition: string;
  letterType: "contains" | "start";
};

declare module 'howler';
  