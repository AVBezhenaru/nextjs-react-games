export default class Service {
  isBlocked = false;

  generateNumber = (arr: number[][]) => {
    let copyNumbers: number[][] = [...arr];
    let emptyCells = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (copyNumbers[i][j] === 0) {
          emptyCells += 1;
        }
      }
    }
    if (emptyCells === 0) {
      return arr;
    }
    let randomCell = 1 + Math.floor(Math.random() * emptyCells);
    let randomNumber = Math.random() >= 0.5 ? 2 : 4;
    let emptyCell = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (copyNumbers[i][j] === 0) {
          emptyCell += 1;
        }
        if (emptyCell === randomCell) {
          copyNumbers[i][j] = randomNumber;
          return copyNumbers;
        }
      }
    }
    return copyNumbers;
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

  gameIsOver = (numbers?: number[][], setModal?: (modal: boolean) => void) => {
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers[i].length; j++) {
        if (numbers[i][j] === 0) {
          return false;
        }
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers[i].length; j++) {
        if (
          (j < numbers[i].length - 1 && numbers[i][j] === numbers[i][j + 1]) ||
          (i < numbers.length - 1 && numbers[i][j] === numbers[i + 1][j])
        ) {
          return false;
        }
      }
    }
    setModal(true);
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

  compareArrays = (arr1: number[][], arr2: number[][]) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (arr1[i][j] !== arr2[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  transposeArray = (arr: number[][]) => {
    for (let d = arr.length, a = 0; a < d; a++)
      for (let c = a + 1; c < d; c++) {
        let e = arr[a][c];
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
    setModal?: (modal: boolean) => void,
  ) => {
    e.preventDefault();

    if (this.isBlocked) {
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        let oldNumbersUp = JSON.parse(JSON.stringify(numbers));
        let newNumbersUp = [...numbers];
        newNumbersUp = this.transposeArray(newNumbersUp);
        for (let i = 0; i < newNumbersUp.length; i++) {
          let newLine = this.swipeNumbers(newNumbersUp[i], score, setScore);
          for (let j = 0; j < newNumbersUp[i].length; j++) {
            newNumbersUp[i][j] = newLine[j];
          }
        }

        newNumbersUp = this.transposeArray(newNumbersUp);
        if (!this.compareArrays(newNumbersUp, oldNumbersUp)) {
          this.isBlocked = true;
          setTimeout(() => {
            newNumbersUp = this.generateNumber(newNumbersUp);
            setNumbers(newNumbersUp);
            this.isBlocked = false;
          }, 200);
          setNumbers(newNumbersUp);
        }
        break;

      case 'ArrowDown':
        let oldNumbersDown = JSON.parse(JSON.stringify(numbers));
        let newNumbersDown = [...numbers];
        newNumbersDown = this.reflectArray(this.transposeArray(newNumbersDown));
        for (let i = 0; i < newNumbersDown.length; i++) {
          let newLine = this.swipeNumbers(newNumbersDown[i], score, setScore);
          for (let j = 0; j < newNumbersDown[i].length; j++) {
            newNumbersDown[i][j] = newLine[j];
          }
        }
        newNumbersDown = this.transposeArray(this.reflectArray(newNumbersDown));
        if (!this.compareArrays(newNumbersDown, oldNumbersDown)) {
          this.isBlocked = true;
          setTimeout(() => {
            newNumbersDown = this.generateNumber(newNumbersDown);
            setNumbers(newNumbersDown);
            this.isBlocked = false;
          }, 200);
          setNumbers(newNumbersDown);
        }
        break;

      case 'ArrowLeft':
        let oldNumbersLeft = JSON.parse(JSON.stringify(numbers));
        let newNumbersLeft = [...numbers];
        for (let i = 0; i < newNumbersLeft.length; i++) {
          let newLine = this.swipeNumbers(newNumbersLeft[i], score, setScore);
          for (let j = 0; j < newNumbersLeft[i].length; j++) {
            newNumbersLeft[i][j] = newLine[j];
          }
        }
        if (!this.compareArrays(newNumbersLeft, oldNumbersLeft)) {
          this.isBlocked = true;
          setTimeout(() => {
            newNumbersLeft = this.generateNumber(newNumbersLeft);
            setNumbers(newNumbersLeft);
            this.isBlocked = false;
          }, 200);
          setNumbers(newNumbersLeft);
        }
        break;

      case 'ArrowRight':
        let oldNumbersRight = JSON.parse(JSON.stringify(numbers));
        let newNumbersRight = [...numbers];
        newNumbersRight = this.reflectArray(newNumbersRight);
        for (let i = 0; i < newNumbersRight.length; i++) {
          let newLine = this.swipeNumbers(newNumbersRight[i], score, setScore);
          for (let j = 0; j < newNumbersRight[i].length; j++) {
            newNumbersRight[i][j] = newLine[j];
          }
        }
        newNumbersRight = this.reflectArray(newNumbersRight);
        if (!this.compareArrays(newNumbersRight, oldNumbersRight)) {
          this.isBlocked = true;
          setTimeout(() => {
            newNumbersRight = this.generateNumber(newNumbersRight);
            setNumbers(newNumbersRight);
            this.isBlocked = false;
          }, 200);
          setNumbers(newNumbersRight);
        }
        break;

      // default:
      //   return;
    }
    if (this.gameIsOver(numbers, setModal)) {
      return;
    }
  };
}
