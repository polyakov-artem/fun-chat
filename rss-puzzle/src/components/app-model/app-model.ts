import { LevelsData, UserData } from '../../types/types';

export class AppModel {
  currentLevel: number;
  currentRound: number;
  currentSentenceNumber: number;
  isRoundEnded: boolean;
  userData: UserData;
  lastRoundResults: { resolved: number[]; notResolved: number[] };
  levelsData: LevelsData;

  constructor() {
    this.currentLevel = 0;
    this.currentRound = 0;
    this.currentSentenceNumber = 0;
    this.isRoundEnded = false;
    this.userData = {
      name: '',
      surname: '',
      lastPassedRound: { lastLevel: 0, lastRound: 0 },
      passedLevels: [],
      passedRounds: [],
    };
    this.lastRoundResults = { resolved: [], notResolved: [] };
    this.levelsData = [
      {
        rounds: [
          {
            roundResult: {
              id: '',
              name: '',
              imageSrc: '',
              cutSrc: '',
              author: '',
              year: '',
            },
            sentences: [
              {
                audioExample: '',
                textExample: '',
                textExampleTranslate: '',
                id: 0,
                word: '',
                wordTranslate: '',
              },
            ],
          },
        ],
        roundsCount: 0,
      },
    ];
  }

  // game info
  get numOfLevels() {
    return this.levelsData.length;
  }

  get currentSentenceWords() {
    return this.currentSentenceText.split(' ');
  }

  get currentSentenceText() {
    const sentenceData = this.currentSentenceData;
    return sentenceData.textExample;
  }

  get currentSentenceTranslate() {
    const sentenceData = this.currentSentenceData;
    return sentenceData.textExampleTranslate;
  }

  get currentSentenceAudio() {
    const sentenceData = this.currentSentenceData;
    return sentenceData.audioExample;
  }

  get currentRoundImg() {
    const roundData = this.currentRoundData;
    return roundData.roundResult.cutSrc;
  }

  get currentRoundSentences() {
    const roundData = this.currentRoundData;
    return roundData.sentences;
  }
  get currentRoundData() {
    return this.levelsData[this.currentLevel].rounds[this.currentRound];
  }

  get currentSentenceData() {
    return this.currentRoundSentences[this.currentSentenceNumber];
  }

  // user data
  get name() {
    return this.userData.name;
  }
  get surname() {
    return this.userData.surname;
  }

  get lastPassedRound() {
    return this.userData.lastPassedRound;
  }

  get passedRounds() {
    return this.userData.passedRounds;
  }

  get passedLevels() {
    return this.userData.passedLevels;
  }

  get currentNumOfRounds() {
    return this.levelsData[this.currentLevel].rounds.length;
  }

  get currentLevelPassedRounds() {
    return this.passedRounds[this.currentLevel];
  }

  get currentImgCaption() {
    const { author = '', name = '', year = '' } = this.currentRoundData.roundResult;

    const authorData = author.split(', ');
    const authorName = authorData[1];
    let authorSurname = authorData[0].toLowerCase();
    authorSurname = authorSurname.slice(0, 1).toUpperCase() + authorSurname.slice(1);
    return `${authorName} ${authorSurname} - ${name} (${year})`;
  }
}
