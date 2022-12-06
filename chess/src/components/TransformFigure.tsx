import { FC } from 'react';

import {
  TransformFigure as TransformBox,
  TransformFigureOverlay,
  TransformFigureImg,
} from '../styles/chess.style';
import { Colors } from '../models/Colors';
import { Figure } from '../models/figures/Figure';
import { Queen } from '../models/figures/Queen';
import { Rook } from '../models/figures/Rook';
import { Bishop } from '../models/figures/Bishop';
import { Knight } from '../models/figures/Knight';
import { Board } from '../models/Board';

const whiteQueen = require('../assets/img/white-queen.png');
const blackQueen = require('../assets/img/black-queen.png');
const whiteRook = require('../assets/img/white-rook.png');
const blackRook = require('../assets/img/black-rook.png');
const whiteBishop = require('../assets/img/white-bishop.png');
const blackBishop = require('../assets/img/black-bishop.png');
const whiteKnight = require('../assets/img/white-knight.png');
const blackKnight = require('../assets/img/black-knight.png');

interface TransformFigureProps {
  updateBoard: () => void;
  board: Board;
  transformData: {
    figure: Figure | null;
    shouldTransform: boolean;
  };
}

interface FiguresData {
  src: string;
  name: string;
}

const TransformFigure: FC<TransformFigureProps> = ({ transformData, board, updateBoard }) => {
  function getTransformFigureList(colors: Colors) {
    if (colors === Colors.BLACK) {
      return [
        { src: blackQueen, name: 'queen' },
        { src: blackRook, name: 'rook' },
        { src: blackBishop, name: 'bishop' },
        { src: blackKnight, name: 'knight' },
      ];
    }
    return [
      { src: whiteQueen, name: 'queen' },
      { src: whiteRook, name: 'rook' },
      { src: whiteBishop, name: 'bishop' },
      { src: whiteKnight, name: 'knight' },
    ];
  }

  function createNewFigure(figureName: string, figureData: Figure | null) {
    const { color, cell } = figureData!;

    board.transformData.shouldTransform = false;

    switch (figureName) {
      case 'queen':
        new Queen(color, board.getCell(cell.x, cell.y));
        updateBoard();
        break;
      case 'rook':
        new Rook(color, board.getCell(cell.x, cell.y));
        updateBoard();
        break;
      case 'bishop':
        new Bishop(color, board.getCell(cell.x, cell.y));
        updateBoard();
        break;
      case 'knight':
        new Knight(color, board.getCell(cell.x, cell.y));
        updateBoard();
        break;
    }
  }

  const figuresArr: FiguresData[] = getTransformFigureList(transformData.figure!.color);

  const elements = figuresArr.map((figuresArrItem, id) => (
    <TransformFigureImg
      key={id}
      src={figuresArrItem.src}
      onClick={() => createNewFigure(figuresArrItem.name, transformData.figure!)}
    />
  ));

  return (
    <TransformBox>
      <TransformFigureOverlay>{elements}</TransformFigureOverlay>
    </TransformBox>
  );
};

export default TransformFigure;
