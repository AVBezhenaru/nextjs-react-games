import styles from '../Board/Board.module.scss';
import Cell from '../Cell/Cell';
import React, { useEffect, useState } from 'react';

interface BoardProps {
  numbers: number[][];
}

const Board = (props: BoardProps) => {
  let tiles = props.numbers.map((numArr) => {
    return numArr.map((num, index) => {
      return <Cell key={index} number={num} />;
    });
  });

  return <div className={styles.field}>{tiles}</div>;
};

export default Board;
