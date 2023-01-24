import { FC } from "react";
import FieldModel from "../../../models/FieldModel";
import Cell from "../Cell/Cell";
import classes from "./GameField.module.scss";

interface IGameFieldProps {
  field: FieldModel;
  setField: (field: FieldModel) => void;
}

const GameField: FC<IGameFieldProps> = ({ field, setField }) => {
  
  const cells = field.cells.map((c, index) => (
    <Cell key={index} hasFigure={c.hasFigure} filled={c.filled} />
  ));

  return (
    <div className={classes.GameField}>
      {cells}
    </div>
  );
}

export default GameField;
