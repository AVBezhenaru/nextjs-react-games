import { Cell } from "../../styles/chess.style";

const CellComponent = ({color}) => {
  return <Cell style={{backgroundColor: color}}></Cell>;
};

export default CellComponent;
