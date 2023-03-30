import React from 'react';

import classes from './Cell.module.scss';

interface ICellProps {
  classAdd: string;
  onClickLButton: () => void;
  onClickRButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const Cell: React.FC<ICellProps> = ({ classAdd, onClickLButton, onClickRButton, disabled }) => (
  <button
    type="button"
    className={`${classes.cell} ${classes[classAdd]}`}
    onClick={onClickLButton}
    onContextMenu={onClickRButton}
    disabled={disabled}
  >
    {' '}
  </button>
);

export default Cell;
