import { ReactElement } from 'react';

import { useAppSelector } from '../../../hooks';
import Cell from '../cell/cell';

import style from './playfield.module.scss';

function PlayField(): ReactElement {
  const stage = useAppSelector((state) => state.tetris.stage);
  return (
    <div className={style.grid}>
      {stage.map((row) => row.map((cell: any, idx: number) => <Cell key={idx} type={cell[0]} />))}
    </div>
  );
}

export default PlayField;
