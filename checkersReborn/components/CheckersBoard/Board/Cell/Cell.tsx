import Image from 'next/image';
import { FC } from 'react';

import blackChecker from '../../../../images/blackUp.png';
import whiteChecker from '../../../../images/whiteUp.png';
import blackKingChecker from '../../../../images/blackDown.png';
import whiteKingChecker from '../../../../images/whiteDown.png';

import classes from './Cell.module.scss';
import createClasses from '../../../../helpers/ClassHelper';
import CellModel from '../../../../models/CellModel';

interface ICellProps {
  cell: CellModel
}

const Cell: FC<ICellProps> = ({ cell }) => {
  const { isBlack, hasBlackChecker, hasWhiteChecker, kingChecker, canBeCaptured, selected, available } = cell;
  
  const cellClasses = createClasses([
      [classes.Cell, true],
      [classes.Black, isBlack],
      [classes.White, !isBlack],
      [classes.Red, canBeCaptured],
      [classes.Selected, selected],
      [classes.Available, available]
    ]
  );

  return (
    <div className={cellClasses}>
      {hasBlackChecker && <Image src={kingChecker ? blackKingChecker : blackChecker} className={classes.CheckerImg} />}
      {hasWhiteChecker && <Image src={kingChecker ? whiteKingChecker : whiteChecker} className={classes.CheckerImg} />}
    </div>
  );
}

export default Cell;
