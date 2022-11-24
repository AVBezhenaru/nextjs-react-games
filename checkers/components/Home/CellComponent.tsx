import { FC, useState } from 'react';
import Image from 'next/image';

import { Cell } from '../../model/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  const [trueColor, setTrueColor] = useState(false);

  return (
    // ? обозначение шашки и ее хода
    <div
      className={['cell', cell.color, selected && cell.figure?.image ? 'selected' : ' '].join(' ')}
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
