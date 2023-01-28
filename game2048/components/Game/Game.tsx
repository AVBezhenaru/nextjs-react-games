import Board from '../../components/Board/Board';
import Header from '../../components/Header/Header';
import styles from '../Game/Game.module.scss';
import React, { useEffect, useState } from 'react';

const Game = () => {
  const [numbers, setNumbers] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [score, setScore] = useState(0);

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
      return copyNumbers;
    }
  };

  const restartGame = () => {
    // let newArr = [
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    // ];

    let newArr: number[][] = [...numbers];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newArr[i][j] = 0;
      }
    }

    let firstRandomNumber = generateNumber(newArr);
    let secondRandomNumber = generateNumber(firstRandomNumber);
    setNumbers(secondRandomNumber);
    setScore(0);
    console.log('secondRandomNumber', secondRandomNumber);
    console.log('numbers', numbers);
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

  const swipeNumbers = (arr: number[]) => {
    let newArr = [...arr];
    let scoreCount = score;
    newArr = newArr.filter((num) => num !== 0);
    for (let i = 0; i < newArr.length - 1; i++) {
      if (newArr[i] === newArr[i + 1]) {
        newArr[i] *= 2;
        scoreCount += newArr[i];
        newArr[i + 1] = 0;
      }
    }
    setScore((oldScore) => oldScore + scoreCount);
    newArr = newArr.filter((num) => num !== 0);
    for (let i = newArr.length; i < 4; i++) {
      newArr.push(0);
    }
    return newArr;
  };

  const reflectArray = (arr: number[][]) => {
    let reversedArr = [];
    for (let i = 0; i < arr.length; i++) {
      reversedArr.push(arr[i].reverse());
    }
    return reversedArr;
  };

  const transposeArray = (arr: number[][]) => {
    for (var d = arr.length, a = 0; a < d; a++)
      for (var c = a + 1; c < d; c++) {
        var e = arr[a][c];
        arr[a][c] = arr[c][a];
        arr[c][a] = e;
      }
    return arr;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (gameIsOver()) {
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        let newNumbersUp = [...numbers];
        newNumbersUp = transposeArray(newNumbersUp);
        for (let i = 0; i < newNumbersUp.length; i++) {
          let newLine = swipeNumbers(newNumbersUp[i]);
          for (let j = 0; j < newNumbersUp[i].length; j++) {
            newNumbersUp[i][j] = newLine[j];
          }
        }
        newNumbersUp = generateNumber(newNumbersUp);
        setNumbers(transposeArray(newNumbersUp));
        break;
      case 'ArrowDown':
        let newNumbersDown = [...numbers];
        newNumbersDown = reflectArray(transposeArray(newNumbersDown));
        for (let i = 0; i < newNumbersDown.length; i++) {
          let newLine = swipeNumbers(newNumbersDown[i]);
          for (let j = 0; j < newNumbersDown[i].length; j++) {
            newNumbersDown[i][j] = newLine[j];
          }
        }
        newNumbersDown = generateNumber(newNumbersDown);
        setNumbers(transposeArray(reflectArray(newNumbersDown)));
        break;
      case 'ArrowLeft':
        let newNumbersLeft = [...numbers];
        for (let i = 0; i < newNumbersLeft.length; i++) {
          let newLine = swipeNumbers(newNumbersLeft[i]);
          for (let j = 0; j < newNumbersLeft[i].length; j++) {
            newNumbersLeft[i][j] = newLine[j];
          }
        }

        newNumbersLeft = generateNumber(newNumbersLeft);
        setNumbers(newNumbersLeft);
        break;
      case 'ArrowRight':
        let newNumbersRight = [...numbers];
        newNumbersRight = reflectArray(newNumbersRight);
        for (let i = 0; i < newNumbersRight.length; i++) {
          let newLine = swipeNumbers(newNumbersRight[i]);
          for (let j = 0; j < newNumbersRight[i].length; j++) {
            newNumbersRight[i][j] = newLine[j];
          }
        }
        newNumbersRight = generateNumber(newNumbersRight);
        setNumbers(reflectArray(newNumbersRight));
        break;
      default:
        return;
    }
  };

  console.log('game state', numbers);
  return (
    <div className={styles.wrapper}>
      <Header score={score} numbers={numbers} restart={() => restartGame()} />
      <Board numbers={numbers} />
    </div>
  );
};

export default Game;
