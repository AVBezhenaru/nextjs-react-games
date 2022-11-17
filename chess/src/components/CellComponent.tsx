import { FC } from "react";
import {
  Cell as StyledCell,
  FigureLogo,
  StyledAvailableCell,
} from "../styles/chess.style";
import { Cell } from '../models/Cell'
import { King } from '../models/figures/King'
import Image from 'next/image'

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {

  function getCellColor(isSelected: boolean) {
    return selected ? "#58514d" : cell.color === "white" ? "#f1dad0" : "#ad9b93";
  }

  return (
    <StyledCell
      color={getCellColor(selected)}
      onClick={() => click(cell)}
      style={{
        background: cell.available && cell.figure ? "green" : ""
          || (cell.figure as King)?.chekAndMateFlag ? "#ed482c" : ''
            || (cell.figure as King)?.underAttackKing ? "#f1c8c8" : "",
      }}
    >
      {cell.available && !cell.figure && (
        <StyledAvailableCell></StyledAvailableCell>
      )}
      {cell.figure?.logo &&
        // <FigureLogo src={cell.figure.logo} 
        // />
        <Image width='65' height='65' src={cell.figure.logo} alt='figure' />
      }
    </StyledCell>
  );
};

export default CellComponent;
