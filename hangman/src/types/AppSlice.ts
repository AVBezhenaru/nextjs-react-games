export enum COMMON_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure',
  IDLE = 'idle',
}

export type Alphabet = [
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ъ',
  'ы',
  'ь',
  'э',
  'ю',
  'я',
];

export type StatusGame = 'idle' | 'win' | 'lose';

export type AlphabetLetters = Alphabet[keyof Alphabet];

export interface IInitialStateApp {
  status: COMMON_STATUS;
  error: string | null;
  theme: string | null;
  guessWord: AlphabetLetters[];
  currentWord: (AlphabetLetters | ' ')[];
  wrongLetters: AlphabetLetters[];
  successLetters: AlphabetLetters[];
}
