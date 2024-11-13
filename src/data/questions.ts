import { Word } from "../types/types";
import dataJson from "./data.json";

const loadRoscoData = (index: string): Word[] => {
  const data = JSON.parse(JSON.stringify(dataJson));
  const roscos = data.roscos;
  const rosco = roscos[index][0].map(parseWord);
  return rosco;
};

export const getRosco = async (): Promise<Word[]> => {
  return loadRoscoData("0");
};


export const getRoscoIndex = async (index: string): Promise<Word[]> => {
  return loadRoscoData(index);
};

const parseWord = (data: any): Word => {
  const { letter, word, definition, letterType } = data;

  return {
    status: "pending",
    letter,
    word,
    definition,
    letterType,
  };
};
