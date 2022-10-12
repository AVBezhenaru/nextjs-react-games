import { FC } from "react";
import {
  Cell as StyledCell,
  FigureLogo,
  StyledAvailableCell,
} from "../styles/chess.style";
import { Cell } from '../models/Cell'

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {

  function getCellColor(isSelected: boolean) {
    return selected
      ? "#58514d"
      : cell.color === "white"
      ? "#f1dad0"
      : "#ad9b93";
  }

  return (
    <StyledCell
      color={getCellColor(selected)}
      onClick={() => click(cell)}
      style={{ background: cell.available && cell.figure ? "" : ""}}
    >
      {cell.available && !cell.figure && (
        <StyledAvailableCell></StyledAvailableCell>
      )}
      {cell.figure?.logo && <FigureLogo src={cell.figure.logo} />}
    </StyledCell>
  );
};

export default CellComponent;
