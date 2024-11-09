export interface Word {
    letter: string;
    word: string;
    definition: string;
    status: 'correct' | 'incorrect' | 'pending';
    letterType: 'contains' | 'start';
  }
  
  export interface WordWheelProps {
    words: Word[];
  }
  
  export interface QuestionProps {
    word: Word;
  }
  
  export interface AnswerInputProps {
    onAnswer: (answer: string) => void;
  }
  