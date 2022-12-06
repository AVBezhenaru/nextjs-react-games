import { NextApiRequest, NextApiResponse } from 'next';

import { data } from '../../../hangman/data/words';

const getThemesRes = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method === 'GET') {
    res.status(200).json(
      data.themes.map(({ name, label }) => ({
        name,
        label,
      })),
    );
  }
};

export default getThemesRes;
