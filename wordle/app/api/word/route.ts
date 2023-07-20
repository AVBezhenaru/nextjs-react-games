import { readFile } from 'fs/promises';
import { join } from 'path';

import { NextResponse } from 'next/server';

const RU_WORDS = join(`${process.cwd()}/app/api/word`, 'words-ru.txt');
const EN_WORDS = join(`${process.cwd()}/app/api/word`, 'words-ru.txt');

const getRandomWord = (words: string, length = [5, 6]) => {
  const wordsArr = words
    .split('\r\n')
    .filter((a) => a.length >= length[0] && a.length <= length[1]);
  const word = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  return word;
};

const checkIfWordExists = (words: string, word: string) => {
  const wordsArr = words.split('\r\n');
  return wordsArr.indexOf(word) >= 0;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lang = searchParams.get('lang');
  const wordLength = searchParams.get('len');
  const wordToCheck = searchParams.get('checkWord');
  if (lang) {
    const words = await readFile(lang === 'ru' ? RU_WORDS : EN_WORDS, { encoding: 'utf-8' });
    const word = getRandomWord(
      words,
      wordLength?.split('-').map((num) => +num),
    );
    return NextResponse.json({ word });
  }
  if (wordToCheck) {
    const words = await readFile(lang === 'ru' ? RU_WORDS : EN_WORDS, { encoding: 'utf-8' });
    return NextResponse.json({ exists: checkIfWordExists(words, wordToCheck) });
  }

  return NextResponse.json({ error: 'No Content' }, { status: 200 });
}
