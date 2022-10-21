import { NextApiRequest, NextApiResponse } from 'next';

import { data } from '../../../../hangman/data/words';

const getRandomWordRes = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    const randomGenre = Math.round(Math.random() * (data.themes.length - 2));
    const randomWord = Math.round(Math.random() * (data.themes[randomGenre].words.length - 1));

    res.status(200).json(data.themes[randomGenre].words[randomWord].toLowerCase());
  }
};

export default getRandomWordRes;
