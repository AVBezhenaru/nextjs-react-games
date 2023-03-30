import React from 'react';

import classes from './Cell.module.scss';

interface ICellProps {
  classAdd: string;
  onClickLButton: () => void;
  onClickRButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Cell: React.FC<ICellProps> = ({ classAdd, onClickLButton, onClickRButton }) => (
  <button
    type="button"
    className={`${classes.cell} ${classes[classAdd]}`}
    onClick={onClickLButton}
    onContextMenu={onClickRButton}
  >
    {' '}
  </button>
);

export default Cell;
