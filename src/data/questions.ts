import { Word } from "../types/types";
import dataJson from "./data.json";

const loadRoscoData = (index: string): Word[] => {
  console.log("index", index);
  const data = JSON.parse(JSON.stringify(dataJson));
  console.log("data", data);
  const roscos = data.roscos[index];
  console.log("roscos", roscos);
  const rosco = roscos.map(parseWord);
  console.log("rosco", rosco);
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
