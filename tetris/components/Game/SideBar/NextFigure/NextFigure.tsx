import { FC } from "react";
import Figure from "../../../../models/figures/Figure";
import Cell from "../../Cell/Cell";
import classes from "./NextFigure.module.scss";

interface INextFigureProps {
  figure: Figure | null;
}

const NextFigure: FC<INextFigureProps> = ({ figure }) => {
  
  const cells = figure?.getCellsArrayForNextFigure().map((c, index) => (
    <Cell key={index} hasFigure={c.hasFigure} filled={false} />
  ));

  return (
    <div className={classes.NextFigure}>
      {cells}
    </div>
  );
}

export default NextFigure;
