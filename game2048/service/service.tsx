export default class Service {
  generateNumber = (arr: number[][]) => {
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

  restartGame = (
    numbers: number[][],
    setNumbers: (numbers: number[][]) => void,
    setScore: (score: number) => void,
  ) => {
    let newArr: number[][] = [...numbers];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newArr[i][j] = 0;
      }
    }

    let firstRandomNumber = this.generateNumber(newArr);
    let secondRandomNumber = this.generateNumber(firstRandomNumber);
    setNumbers(secondRandomNumber);
    setScore(0);
  };

  gameIsOver = (numbers?: number[][]) => {
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

  swipeNumbers = (arr: number[], score: number, setScore: any) => {
    let newArr = [...arr];
    let scoreCount = 0;
    newArr = newArr.filter((num) => num !== 0);
    for (let i = 0; i < newArr.length - 1; i++) {
      if (newArr[i] === newArr[i + 1]) {
        newArr[i] *= 2;
        scoreCount += newArr[i];
        newArr[i + 1] = 0;
      }
    }
    setScore((oldScore: number) => oldScore + scoreCount);
    newArr = newArr.filter((num) => num !== 0);
    for (let i = newArr.length; i < 4; i++) {
      newArr.push(0);
    }
    return newArr;
  };

  reflectArray = (arr: number[][]) => {
    let reversedArr = [];
    for (let i = 0; i < arr.length; i++) {
      reversedArr.push(arr[i].reverse());
    }
    return reversedArr;
  };

  transposeArray = (arr: number[][]) => {
    for (var d = arr.length, a = 0; a < d; a++)
      for (var c = a + 1; c < d; c++) {
        var e = arr[a][c];
        arr[a][c] = arr[c][a];
        arr[c][a] = e;
      }
    return arr;
  };

  onKeyDown = (
    e: KeyboardEvent,
    numbers?: number[][],
    setNumbers?: (numbers: number[][]) => void,
    score?: number,
    setScore?: any,
  ) => {
    e.preventDefault();
    if (this.gameIsOver(numbers)) {
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        let newNumbersUp = [...numbers];
        newNumbersUp = this.transposeArray(newNumbersUp);
        for (let i = 0; i < newNumbersUp.length; i++) {
          let newLine = this.swipeNumbers(newNumbersUp[i], score, setScore);
          for (let j = 0; j < newNumbersUp[i].length; j++) {
            newNumbersUp[i][j] = newLine[j];
          }
        }

        setTimeout(() => {
          newNumbersUp = this.generateNumber(newNumbersUp);
          setNumbers(newNumbersUp);
        }, 200);
        setNumbers(this.transposeArray(newNumbersUp));

        break;

      case 'ArrowDown':
        let newNumbersDown = [...numbers];
        newNumbersDown = this.reflectArray(this.transposeArray(newNumbersDown));
        for (let i = 0; i < newNumbersDown.length; i++) {
          let newLine = this.swipeNumbers(newNumbersDown[i], score, setScore);
          for (let j = 0; j < newNumbersDown[i].length; j++) {
            newNumbersDown[i][j] = newLine[j];
          }
        }

        setTimeout(() => {
          newNumbersDown = this.generateNumber(newNumbersDown);
          setNumbers(newNumbersDown);
        }, 200);
        setNumbers(this.transposeArray(this.reflectArray(newNumbersDown)));

        break;

      case 'ArrowLeft':
        let newNumbersLeft = [...numbers];
        for (let i = 0; i < newNumbersLeft.length; i++) {
          let newLine = this.swipeNumbers(newNumbersLeft[i], score, setScore);
          for (let j = 0; j < newNumbersLeft[i].length; j++) {
            newNumbersLeft[i][j] = newLine[j];
          }
        }

        setTimeout(() => {
          newNumbersLeft = this.generateNumber(newNumbersLeft);
          setNumbers(newNumbersLeft);
        }, 200);
        setNumbers(newNumbersLeft);

        break;

      case 'ArrowRight':
        let newNumbersRight = [...numbers];
        newNumbersRight = this.reflectArray(newNumbersRight);
        for (let i = 0; i < newNumbersRight.length; i++) {
          let newLine = this.swipeNumbers(newNumbersRight[i], score, setScore);
          for (let j = 0; j < newNumbersRight[i].length; j++) {
            newNumbersRight[i][j] = newLine[j];
          }
        }

        setTimeout(() => {
          newNumbersRight = this.generateNumber(newNumbersRight);
          setNumbers(newNumbersRight);
        }, 200);
        setNumbers(this.reflectArray(newNumbersRight));

        break;
      default:
        return;
    }
  };
}
