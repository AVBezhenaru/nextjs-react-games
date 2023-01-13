import Image from 'next/image';
import { FC, memo, useMemo } from 'react';

import blackChecker from '../../../../images/blackUp.png';
import whiteChecker from '../../../../images/whiteUp.png';
import blackKingChecker from '../../../../images/blackDown.png';
import whiteKingChecker from '../../../../images/whiteDown.png';

import classes from './Cell.module.scss';
import createClasses from '../../../../helpers/ClassHelper';
import CellModel from '../../../../models/CellModel';
import { Colors } from '../../../../models/Color';
import { CheckerType } from '../../../../models/Checkers/CheckerType';
import { CheckerColor } from '../../../../models/Checkers/CheckerColor';

interface ICellProps {
  cell: CellModel,
  selected: boolean,
  click: (cell: CellModel) => void,
}

const Cell: FC<ICellProps> = ({ cell, selected, click }) => {
  const { color, checker, capturable } = cell;
  
  const cellClasses = useMemo(() => createClasses([
      [classes.Cell, true],
      [classes.Black, color === Colors.BLACK],
      [classes.White, color === Colors.WHITE],
      [classes.Captured, capturable],
      [classes.Selected, selected],
    ]
  ), [color, selected, capturable]);

  const figure = useMemo(() => {
    if (checker?.checkerType === CheckerType.CHECKER && checker?.checkerColor === CheckerColor.BLACK) return blackChecker;
    if (checker?.checkerType === CheckerType.KING && checker?.checkerColor === CheckerColor.BLACK) return blackKingChecker;
    if (checker?.checkerType === CheckerType.CHECKER && checker?.checkerColor === CheckerColor.WHITE) return whiteChecker;
    if (checker?.checkerType === CheckerType.KING && checker?.checkerColor === CheckerColor.WHITE) return whiteKingChecker;
    return null;
  }, [checker]);
  
  return (
    <div className={cellClasses} onClick={() => click(cell)}>
      {figure && <Image src={figure} className={classes.CheckerImg} />}
      {!figure && cell.available && <div className={classes.Available} />}
    </div>
  );
}

export default memo(Cell);
