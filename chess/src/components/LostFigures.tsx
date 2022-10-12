import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    return (
      <>
        <div>{title}</div>
        {figures.map((figure) => {
          return (
            <span key={figure.id}>
              {figure?.logo && <img width={30} src={figure.logo} />}
            </span>
          );
        })}
      </>
    );
}

export default LostFigures;
