import { Board } from "../../styles/chess.style";
import CellComponent from "./CellComponent";
import { WhiteCell } from "../../styles/chess.style";

const BoardComponent = () => {
    return (
      <Board>
        <CellComponent color={'red'}></CellComponent>
        <CellComponent color={'black'}></CellComponent>
        <CellComponent color={undefined}></CellComponent>
        <CellComponent color={undefined}></CellComponent>
        <CellComponent color={undefined}></CellComponent>
        <CellComponent color={undefined}></CellComponent>
        <CellComponent color={undefined}></CellComponent>
        <CellComponent color={undefined}></CellComponent>
        <CellComponent color={undefined}></CellComponent>
      </Board>
    );
}

export default BoardComponent;