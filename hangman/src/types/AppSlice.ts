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

export type AlphabetLetters = Alphabet[keyof Alphabet];

export interface IInitialStateApp {
  status: string;
  error: string | null;
  guessWord: AlphabetLetters[];
  currentWord: (AlphabetLetters | ' ')[];
  wrongLetters: AlphabetLetters[];
  successLetters: AlphabetLetters[];
}
