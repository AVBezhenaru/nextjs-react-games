import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ figures }) => {
  return (
    <div className="lost-figure">
      {figures.map((figure) => {
        return (
          <span className="lost-figure__wrapper" key={figure.id}>
            {figure?.logo && <img className="lost-figure__img" src={figure.logo} alt="figureLogo" />}
          </span>
        );
      })}
    </div>
  );
}

export default LostFigures;
