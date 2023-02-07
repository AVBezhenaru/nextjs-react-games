import classNames from "classnames";
import { FC } from "react";
import classes from "./Cell.module.scss";

interface ICellProps {
  hasFigure: boolean;
  filled: boolean;
}

const Cell: FC<ICellProps> = ({ hasFigure, filled }) => {
  const cellClasses = classNames(classes.Cell, { [`${classes.HasFigure}`]: hasFigure || filled });

  return (
    <div className={cellClasses}>

    </div>
  );
}

export default Cell;
