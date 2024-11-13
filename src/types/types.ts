export type Word = {
  status: "correct" | "incorrect" | "pending";
  letter: string;
  word: string[];
  definition: string;
  letterType: "contains" | "start";
};

export type Rosco = {
  id: number;
  name: string;
  user_name: string;
  theme: string;
  time: number;
  words: Word[];
  date_modification: string;
}

declare module 'howler';
  