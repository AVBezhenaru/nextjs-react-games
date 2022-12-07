import Image from 'next/image';
import { FC } from 'react';

import { Cell as StyledCell, StyledAvailableCell } from '../styles/chess.style';
import { Cell } from '../models/Cell';
import { King } from '../models/figures/King';
import { useAppSelector } from '../../hooks';

import styles from './CellComponent.module.scss';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  function getCellColor(isSelected: boolean) {
    console.log(isSelected);
    // eslint-disable-next-line no-nested-ternary
    return selected ? '#58514d' : cell.color === 'white' ? '#f1dad0' : 'grey';
  }
  const current = useAppSelector((state) => state.rootSlice.currentPlayer);
  const changeFigure =
    current?.label?.colors === 'белые' ? `${styles.figure}` : `${styles.transformFigure}`;
  return (
    <StyledCell
      color={getCellColor(selected)}
      onClick={() => click(cell)}
      style={{
        background:
          // eslint-disable-next-line no-nested-ternary
          cell.available && cell.figure
            ? 'green'
            : // eslint-disable-next-line no-nested-ternary
            '' || (cell.figure as King)?.chekAndMateFlag
            ? '#ed482c'
            : '' || (cell.figure as King)?.underAttackKing
            ? '#f1c8c8'
            : '',
      }}
    >
      {cell.available && !cell.figure && <StyledAvailableCell />}
      {cell.figure?.logo && (
        <span className={changeFigure}>
          <Image src={cell.figure.logo} alt="figure" />
        </span>
      )}
    </StyledCell>
  );
};

export default CellComponent;
