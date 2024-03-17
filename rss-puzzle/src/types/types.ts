export type Dictionary = {
  [key: string]: string;
};

export type UserData = {
  name: string;
  surname: string;
  lastPassedRound: { lastLevel: number; lastRound: number };
  passedLevels: number[];
  passedRounds: number[][];
};

export type LevelsData = LevelData[];

export type LevelData = {
  rounds: RoundData[];
  roundsCount: number;
};

export type RoundData = {
  roundResult: RoundResult;
  sentences: SentenceData[];
};

export type SentenceData = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

export type RoundResult = {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
};

export type ShuffleArray = <T>(array: T[]) => T[];

export type CreateDomElement = ({
  tag,
  classNames,
  text,
  attr,
}: CreateDomElementProps) => HTMLElement;

export type GetRandom = (min: number, max: number) => number;

export type CloneObj = <T>(obj: T) => T;
export type GetGridStyles = (words: string[]) => string;

export type CreateDomElementProps = {
  tag?: keyof HTMLElementTagNameMap;
  classNames?: string[];
  text?: string;
  attr?: Dictionary;
};
export type PrimaryBtn = ({
  text,
  classNames,
  isSmall,
  disabled,
  attr,
}: PrimaryBtnProps) => HTMLElement;

export type PrimaryBtnProps = Omit<CreateDomElementProps, 'tag'> & {
  isSmall?: boolean;
  disabled?: boolean;
};

export type LoginLabel = ({ text, inputId }: { text: string; inputId: string }) => HTMLElement;
export type LoginField = ({ name }: { name?: string }) => HTMLElement;
