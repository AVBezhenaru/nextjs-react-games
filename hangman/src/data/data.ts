import { AlphabetLetters } from '../types/AppSlice';

import { data } from './words';

export const getRandomWord = async () => {
  const random = Math.round(Math.random() * (data.themes[0].words.length - 1));

  return Promise.resolve({ data: data.themes[0].words[random].toLowerCase() });
};

export const getThemeWord = async (theme: string) => {
  const themeObj = data.themes.find((element) => element.name === theme);

  if (themeObj) {
    const random = Math.round(Math.random() * (themeObj.words.length - 1));

    return Promise.resolve({ data: themeObj.words[random]?.toLowerCase() });
  }

  return Promise.reject(new Error('тема не найдена'));
};

export const bodyParts = [
  'gallows',
  'head',
  'body',
  'leftHand',
  'rightHand',
  'leftLeg',
  'rightLeg',
];

const alphabet: AlphabetLetters[] = [];

for (let i = 'а'.charCodeAt(0); i <= 'я'.charCodeAt(0); i += 1) {
  alphabet.push(String.fromCharCode(i) as AlphabetLetters);
}

export { alphabet };
