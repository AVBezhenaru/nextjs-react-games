import { readFile } from 'fs/promises';
import { join } from 'path';

import { NextApiRequest, NextApiResponse } from 'next';

const RU_WORDS = join(`${process.cwd()}/pages/api/wordle`, 'words-ru.txt');
const EN_WORDS = join(`${process.cwd()}/pages/api/wordle`, 'words-ru.txt');

const getRandomWord = (words: string, length = [5, 6]) => {
  const wordsArr = words.split('\n').filter((a) => a.length >= length[0] && a.length <= length[1]);
  const word = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  return word;
};

const checkIfWordExists = (words: string, word: string) => {
  const wordsArr = words.split('\n');
  return wordsArr.indexOf(word) >= 0;
};

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const searchParams = req.query;

  if (searchParams.lang && searchParams.len) {
    const words = await readFile(searchParams.lang === 'ru' ? RU_WORDS : EN_WORDS, {
      encoding: 'utf-8',
    });
    const len = searchParams.len as string;
    const word = getRandomWord(
      words,
      len.split('-').map((num: string) => +num),
    );
    return res.status(200).json({ word });
  }
  if (searchParams.checkWord) {
    const words = await readFile(searchParams.lang === 'ru' ? RU_WORDS : EN_WORDS, {
      encoding: 'utf-8',
    });
    return res.status(200).json({
      exists: checkIfWordExists(words, decodeURI(searchParams.checkWord as string)),
    });
  }

  return res.status(202).json({ response: 'No-Content' });
}
