import { AlphabetLetters } from '../types/AppSlice';

const alphabet: AlphabetLetters[] = [];

for (let i = 'а'.charCodeAt(0); i <= 'я'.charCodeAt(0); i += 1) {
  alphabet.push(String.fromCharCode(i) as AlphabetLetters);
}

export { alphabet };
