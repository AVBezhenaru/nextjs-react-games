import styles from '../Board/Board.module.scss';
import Cell from '../Cell/Cell';
import React, { useEffect, useState } from 'react';

const Board = () => {
  const [numbers, setNumbers] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    let firstRandomNumber = generateNumber(numbers);
    let secondRandomNumber = generateNumber(firstRandomNumber);
    setNumbers(secondRandomNumber);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const generateNumber = (arr: number[][]) => {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);

    while (arr[x][y] !== 0) {
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    }
    if (arr[x][y] === 0) {
      let copyNumbers = [...arr];
      copyNumbers[x][y] = Math.random() >= 0.5 ? 2 : 4;
      console.log(arr);
      return copyNumbers;
    }
  };

  const gameIsOver = () => {
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers[i].length; j++) {
        if (numbers[i][j] === 0) {
          return false;
        }
      }
    }
    alert('Game is over');
    return true;
  };

  let tiles = numbers.map((numArr) => {
    return numArr.map((num) => {
      return <Cell number={num} />;
    });
  });

  const moveUp = () => {};
  const moveDown = () => {};
  const moveLeft = (arr: number[]) => {
    let newArr = [...arr];
    newArr = newArr.filter((num) => num !== 0);
    for (let i = 0; i < newArr.length - 1; i++) {
      if (newArr[i] === newArr[i + 1]) {
        newArr[i] *= 2;
        newArr[i + 1] = 0;
      }
    }
    newArr = newArr.filter((num) => num !== 0);
    for (let i = newArr.length; i < 4; i++) {
      newArr.push(0);
    }
    return newArr;
  };
  const moveRight = () => {};

  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();

    switch (e.key) {
      case 'ArrowUp':
        console.log('up');
        break;
      case 'ArrowDown':
        // generateNumber();
        console.log('down');
        break;
      case 'ArrowLeft':
        let newNumbers = [...numbers];
        for (let i = 0; i < newNumbers.length; i++) {
          let newLine = moveLeft(newNumbers[i]);
          for (let j = 0; j < newNumbers[i].length; j++) {
            newNumbers[i][j] = newLine[j];
          }
        }
        console.log('left', newNumbers);
        if (gameIsOver()) {
          return;
        }
        newNumbers = generateNumber(newNumbers);
        setNumbers(newNumbers);
        break;
      case 'ArrowRight':
        // generateNumber();
        console.log('right');
        break;
      default:
        return;
    }
  };

  //   window.addEventListener('keydown', onKeyDown);

  return <div className={styles.field}>{tiles}</div>;
};

export default Board;
