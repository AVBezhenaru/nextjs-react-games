import { FC, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { Cell } from '../../model/Cell';
import { RootState } from '../../../store';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  const [trueColor, setTrueColor] = useState(false);
  const { color } = useSelector((state: RootState) => state.checkers);
  const transformColor = color === 'black' ? 'cell-transform' : 'cell';
  return (
    // ? обозначение шашки и ее хода
    <div
      className={[
        transformColor,
        cell.color,
        selected && cell.figure?.image ? 'selected' : ' ',
      ].join(' ')}
      onClick={() => {
        click(cell);
        setTrueColor(true);
      }}
      style={{
        background: trueColor && cell.figureDeleteColor && !selected && cell.figure ? 'red' : '',
      }}
    >
      {cell.available && !cell.figure && cell.color === 'white' && <div className="available" />}
      {cell.figure?.image && <Image src={cell.figure.image} style={{ cursor: 'pointer' }} />}
    </div>
  );
};

export default CellComponent;
