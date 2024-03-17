import {
  CloneObj,
  CreateDomElement,
  GetGridStyles,
  GetRandom,
  ShuffleArray,
} from '../../types/types';

export const shuffleArray: ShuffleArray = (array) => {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const createDomElement: CreateDomElement = ({ tag = 'div', classNames, text, attr }) => {
  const element: HTMLElement = document.createElement(tag);

  if (classNames && Array.isArray(classNames)) {
    element.className = classNames.join(' ');
  }

  if (text) element.textContent = text;

  if (attr) {
    for (const key in attr) {
      element.setAttribute(key, attr[key]);
    }
  }

  return element;
};

// includes min and max
export const getRandom: GetRandom = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const cloneObj: CloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getGridStyles: GetGridStyles = (words) => {
  return `grid-template-columns: repeat(${words.length}, ${100 / words.length}%)`;
};
