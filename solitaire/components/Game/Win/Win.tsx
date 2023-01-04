import React from 'react';
import Image from 'next/image';

import imgWin from '../../../images/HTjD1.gif';

import { WinWrap } from './WinStyle';

type TypeWinProps = {
  newGame: () => void;
};

export const Win: React.FC<TypeWinProps> = ({ newGame }) => (
  <WinWrap>
    <h2>победа!!!</h2>
    <Image src={imgWin.src} width="800" height="430" />
    <button type="button" onClick={newGame}>
      Играть еще
    </button>
  </WinWrap>
);
