import React from 'react';

import classes from './Cell.module.scss';

interface ICellProps {
  classAdd: string;
  onClickLButton: () => void;
  onClickRButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  cellSize: number;
}

const Cell: React.FC<ICellProps> = ({
  classAdd,
  onClickLButton,
  onClickRButton,
  disabled,
  cellSize,
}) => {
  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
  };

  return (
    <button
      type="button"
      className={`${classes.cell} ${classes[classAdd]}`}
      style={cellStyle}
      onClick={onClickLButton}
      onContextMenu={onClickRButton}
      disabled={disabled}
    >
      {' '}
    </button>
  );
};

export default Cell;
