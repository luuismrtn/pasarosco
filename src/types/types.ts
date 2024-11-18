export type Word = {
  status: "correct" | "incorrect" | "pending";
  letter: string;
  word: string[];
  definition: string;
  letterType: "contains" | "start";
};

export type Rosco = {
  id: string;
  name: string;
  user_name: string;
  theme: string;
  time: number;
  words: Word[];
  date_modification: string;
}

export type Theme = "Random" | "Naturaleza" | "Música" | "Deportes" | "Historia";

export const themes: Theme[] = ["Random", "Naturaleza", "Música", "Deportes", "Historia"];

declare module 'howler';
  