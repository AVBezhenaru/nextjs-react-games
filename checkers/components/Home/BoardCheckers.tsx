import { useSelector, useDispatch } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import { Board } from '../../model/Board';
import { Cell } from '../../model/Cell';
import { Colors } from '../../model/Colors';
import { Player } from '../../model/Player';
import { Figure } from '../../model/figures/Figure';
import Modal from '../Modal/Modal';
import { RootState } from '../../../store';
import { setShow, setShowFirst } from '../../store/checkersReducer';

import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  currentFigure: Figure | null;
  swapPlayer: (num: string) => void;
  swapFigure: (figure: Figure | null) => void;
  restart: () => void;
}

const BoardCheckers: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  currentFigure,
  swapPlayer,
  swapFigure,
  restart,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const [prevBlack, setPrevBlack] = useState(board.lostBlackFigure?.length);
  const [prevWhite, setPrevWhite] = useState(board.lostWhiteFigure?.length);
  let directionEmpty = selectedCell?.figure?.color === Colors.BLACK ? -1 : 1;
  let directionEmptyTwo = selectedCell?.figure?.color === Colors.BLACK ? 1 : -1;

  const { isPlayWithBoot, show, showFirst, color } = useSelector(
    (state: RootState) => state.checkers,
  );

  const transformBord = color === 'black' ? 'board-transform' : 'board';

  const dispatch = useDispatch();

  const click = (cell: Cell) => {
    let banOnHitting = true;
    let ok = 0;
    let ok_two = 0;
    let okOne = 0;
    let okOne_two = 0;
    let okTwo = 0;
    let okTwo_two = 0;
    let okThree = 0;
    let okThree_two = 0;

    if (
      selectedCell &&
      selectedCell !== cell &&
      cell.color !== 'black' &&
      selectedCell?.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);

      // ? реализация удалении шашки с поля
      if (
        (selectedCell.y - cell.y > 1 &&
          selectedCell.x - cell.x < -1 &&
          cell?.figure?.color === 'white') ||
        (cell.x - selectedCell.x > 1 &&
          cell.y - selectedCell.y > 1 &&
          cell?.figure?.color === 'black')
      ) {
        if (
          selectedCell.y - cell.y > 2 &&
          selectedCell.x - cell.x < -2 &&
          cell?.figure?.color === 'white'
        ) {
          for (let i = cell.x - 1; i > selectedCell.x; i -= 1) {
            if (cell.y + 1 <= 7 ? cell.board.getCell(cell.x - 1, cell.y + 1)?.isFigure() : false) {
              banOnHitting = true;
              okOne += 1;
            }
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'white'
                  ? cell.y + directionEmpty++
                  : cell.y + directionEmpty--,
              );
          }
          if (okOne < 1) {
            banOnHitting = false;
            okOne = 0;
          }
          okOne = 0;
        } else if (
          cell.x - selectedCell.x > 2 &&
          cell.y - selectedCell.y > 2 &&
          cell?.figure?.color === 'black'
        ) {
          for (let i = cell.x - 1; i > selectedCell.x; i -= 1) {
            if (cell.y - 1 >= 0 ? cell.board.getCell(cell.x - 1, cell.y - 1)?.isFigure() : false) {
              banOnHitting = true;
              okOne_two += 1;
            }
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'black'
                  ? cell.y + directionEmpty--
                  : cell.y + directionEmpty++,
              );
          }
          if (okOne_two < 1) {
            banOnHitting = false;
            okOne_two = 0;
          }
          okOne_two = 0;
        } else {
          for (let i = cell.x - 1; i > selectedCell.x; i -= 1) {
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'white'
                  ? cell.y + directionEmpty++
                  : cell.y + directionEmpty--,
              );
          }
          okOne = 0;
          okOne_two = 0;
        }
        okOne = 0;
        okOne_two = 0;
      }
      if (
        (selectedCell.x - cell.x > 1 &&
          selectedCell.y - cell.y > 1 &&
          cell?.figure?.color === 'white') ||
        (selectedCell.y - cell.y < -1 &&
          selectedCell.x - cell.x > 1 &&
          cell?.figure?.color === 'black')
      ) {
        if (
          selectedCell.x - cell.x > 2 &&
          selectedCell.y - cell.y > 2 &&
          cell?.figure?.color === 'white'
        ) {
          for (let i = cell.x + 1; i < selectedCell.x; i += 1) {
            if (cell.y + 1 <= 7 ? cell.board.getCell(cell.x + 1, cell.y + 1)?.isFigure() : false) {
              banOnHitting = true;
              okTwo += 1;
            }
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'white'
                  ? cell.y + directionEmpty++
                  : cell.y + directionEmpty--,
              );
          }
          if (okTwo < 1) {
            banOnHitting = false;
            okTwo = 0;
          }
          okTwo = 0;
        } else if (
          selectedCell.y - cell.y < -2 &&
          selectedCell.x - cell.x > 2 &&
          cell?.figure?.color === 'black'
        ) {
          for (let i = cell.x + 1; i < selectedCell.x; i += 1) {
            if (cell.y - 1 >= 0 ? cell.board.getCell(cell.x + 1, cell.y - 1)?.isFigure() : false) {
              banOnHitting = true;
              okTwo_two += 1;
            }
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'black'
                  ? cell.y + directionEmpty--
                  : cell.y + directionEmpty++,
              );
          }
          if (okTwo_two < 1) {
            banOnHitting = false;
            okTwo_two = 0;
          }
          okTwo_two = 0;
        } else {
          for (let i = cell.x + 1; i < selectedCell.x; i += 1) {
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'white'
                  ? cell.y + directionEmpty++
                  : cell.y + directionEmpty--,
              );
          }
          okTwo = 0;
          okTwo_two = 0;
        }
        okTwo = 0;
        okTwo_two = 0;
      }
      if (
        (selectedCell.y - cell.y > 1 &&
          selectedCell.x - cell.x > 1 &&
          cell?.figure?.color === 'black') ||
        (selectedCell.y - cell.y < -1 &&
          selectedCell.x - cell.x > 1 &&
          cell?.figure?.color === 'white')
      ) {
        if (
          selectedCell.y - cell.y > 2 &&
          selectedCell.x - cell.x > 2 &&
          cell?.figure?.color === 'black'
        ) {
          for (let i = cell.x + 1; i < selectedCell.x; i += 1) {
            if (
              cell.y + 1 <= 7
                ? cell.board.getCell(cell.x + 1, cell.y + 1)?.isFigure()?.color === 'white'
                : false
            ) {
              banOnHitting = true;
              ok += 1;
            }
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'black'
                  ? cell.y + directionEmptyTwo++
                  : cell.y + directionEmptyTwo--,
              );
          }
          if (ok < 1) {
            banOnHitting = false;
            ok = 0;
          }
          ok = 0;
        } else if (
          selectedCell.y - cell.y < -2 &&
          selectedCell.x - cell.x > 2 &&
          cell?.figure?.color === 'white'
        ) {
          for (let i = cell.x + 1; i < selectedCell.x; i += 1) {
            if (
              cell.y - 1 >= 0
                ? cell.board.getCell(cell.x + 1, cell.y - 1)?.isFigure()?.color === 'black'
                : false
            ) {
              banOnHitting = true;
              ok_two += 1;
            }
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'white'
                  ? cell.y + directionEmptyTwo--
                  : cell.y + directionEmptyTwo++,
              );
          }
          if (ok_two < 1) {
            banOnHitting = false;
            ok_two = 0;
          }
          ok_two = 0;
        } else {
          for (let i = cell.x + 1; i < selectedCell.x; i += 1) {
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'black'
                  ? cell.y + directionEmptyTwo++
                  : cell.y + directionEmptyTwo--,
              );
          }
          ok = 0;
          ok_two = 0;
        }
        ok = 0;
        ok_two = 0;
      }
      if (
        (selectedCell.x - cell.x < -1 &&
          selectedCell.y - cell.y > 1 &&
          cell?.figure?.color === 'black') ||
        (cell.x - selectedCell.x > 1 &&
          cell.y - selectedCell.y > 1 &&
          cell?.figure?.color === 'white')
      ) {
        if (
          selectedCell.x - cell.x < -2 &&
          selectedCell.y - cell.y > 2 &&
          cell?.figure?.color === 'black'
        ) {
          for (let i = cell.x - 1; i > selectedCell.x; i -= 1) {
            if (cell.y + 1 <= 7 ? cell.board.getCell(cell.x - 1, cell.y + 1)?.isFigure() : false) {
              banOnHitting = true;
              okThree_two += 1;
            }
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'black'
                  ? cell.y + directionEmptyTwo++
                  : cell.y + directionEmptyTwo--,
              );
          }
          if (okThree_two < 1) {
            banOnHitting = false;
            okThree_two = 0;
          }
          okThree_two = 0;
        } else if (
          cell.x - selectedCell.x > 2 &&
          cell.y - selectedCell.y > 2 &&
          cell?.figure?.color === 'white'
        ) {
          for (let i = cell.x - 1; i > selectedCell.x; i -= 1) {
            if (cell.y - 1 >= 0 ? cell.board.getCell(cell.x - 1, cell.y - 1)?.isFigure() : false) {
              banOnHitting = true;
              okThree += 1;
            }
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'white'
                  ? cell.y + directionEmptyTwo--
                  : cell.y + directionEmptyTwo++,
              );
          }
          if (okThree < 1) {
            banOnHitting = false;
            okThree = 0;
          }
          okThree = 0;
        } else {
          for (let i = cell.x - 1; i > selectedCell.x; i -= 1) {
            board
              .getCell(selectedCell.x, selectedCell.y)
              .deleteFigure(
                cell,
                i,
                cell?.figure?.color === 'black'
                  ? cell.y + directionEmptyTwo++
                  : cell.y + directionEmptyTwo--,
              );
          }
          okThree = 0;
          okThree_two = 0;
        }
        okThree = 0;
        okThree_two = 0;
      }
      if (cell.y === 0 && (cell.x || cell.x === 0) && cell?.figure?.color === 'white') {
        board.getCell(cell.x, 0).deleteFigure(cell, cell.x, 0);
        board.addCheckerQueenWhite(cell.x);
      }
      if (cell.y === 7 && cell.x && cell?.figure?.color === 'black') {
        board.getCell(cell.x, 7).deleteFigure(cell, cell.x, 7);
        board.addCheckerQueenBlack(cell.x);
      }

      ok = 0;
      ok_two = 0;
      okOne = 0;
      okOne_two = 0;
      okTwo = 0;
      okTwo_two = 0;
      okThree = 0;
      okThree_two = 0;

      // ? реализация передачи хода между игроками
      if (
        (board?.lostBlackFigure?.length > prevBlack &&
          banOnHitting &&
          (cell.y + 2 <= 7 ? cell.board.getCell(cell.x + 2, cell.y + 2)?.isEmpty() : false) &&
          !cell.board.getCell(cell.x + 1, cell.y + 1)?.isEmpty() &&
          cell.board.getCell(cell.x + 1, cell.y + 1)?.isFigure()?.color === 'black') ||
        (board.lostWhiteFigure?.length > prevWhite &&
          banOnHitting &&
          (cell.y + 2 <= 7 ? cell.board.getCell(cell.x + 2, cell.y + 2)?.isEmpty() : false) &&
          !cell.board.getCell(cell.x + 1, cell.y + 1)?.isEmpty() &&
          cell.board.getCell(cell.x + 1, cell.y + 1)?.isFigure()?.color === 'white') ||
        (board.lostBlackFigure?.length > prevBlack &&
          banOnHitting &&
          (cell.y - 2 >= 0 ? cell.board.getCell(cell.x + 2, cell.y - 2)?.isEmpty() : false) &&
          !cell.board.getCell(cell.x + 1, cell.y - 1)?.isEmpty() &&
          cell.board.getCell(cell.x + 1, cell.y - 1)?.isFigure()?.color === 'black') ||
        (board.lostWhiteFigure?.length > prevWhite &&
          banOnHitting &&
          (cell.y - 2 >= 0 ? cell.board.getCell(cell.x + 2, cell.y - 2)?.isEmpty() : false) &&
          !cell.board.getCell(cell.x + 1, cell.y - 1)?.isEmpty() &&
          cell.board.getCell(cell.x + 1, cell.y - 1)?.isFigure()?.color === 'white') ||
        (board.lostBlackFigure?.length > prevBlack &&
          banOnHitting &&
          (cell.y - 2 >= 0 ? cell.board.getCell(cell.x - 2, cell.y - 2)?.isEmpty() : false) &&
          !cell.board.getCell(cell.x - 1, cell.y - 1)?.isEmpty() &&
          cell.board.getCell(cell.x - 1, cell.y - 1)?.isFigure()?.color === 'black') ||
        (board.lostWhiteFigure?.length > prevWhite &&
          banOnHitting &&
          (cell.y - 2 >= 0 ? cell.board.getCell(cell.x - 2, cell.y - 2)?.isEmpty() : false) &&
          !cell.board.getCell(cell.x - 1, cell.y - 1)?.isEmpty() &&
          cell.board.getCell(cell.x - 1, cell.y - 1)?.isFigure()?.color === 'white') ||
        (board.lostBlackFigure?.length > prevBlack &&
          banOnHitting &&
          (cell.y + 2 <= 7 ? cell.board.getCell(cell.x - 2, cell.y + 2)?.isEmpty() : false) &&
          !cell.board.getCell(cell.x - 1, cell.y + 1)?.isEmpty() &&
          cell.board.getCell(cell.x - 1, cell.y + 1)?.isFigure()?.color === 'black') ||
        (board.lostWhiteFigure?.length > prevWhite &&
          banOnHitting &&
          (cell.y + 2 <= 7 ? cell.board.getCell(cell.x - 2, cell.y + 2)?.isEmpty() : false) &&
          !cell.board.getCell(cell.x - 1, cell.y + 1)?.isEmpty() &&
          cell.board.getCell(cell.x - 1, cell.y + 1)?.isFigure()?.color === 'white')
      ) {
        swapPlayer('four');
        swapFigure(cell?.figure);
        setPrevBlack(board.lostBlackFigure?.length);
        setPrevWhite(board.lostWhiteFigure?.length);
        banOnHitting = false;
      } else {
        swapPlayer('one');
        swapFigure(null);
        setPrevBlack(board.lostBlackFigure?.length);
        setPrevWhite(board.lostWhiteFigure?.length);
      }
      board.highlightCellsColor();
    } else if (
      cell.figure?.id === currentFigure?.id ||
      cell.figure?.color === currentPlayer?.color
    ) {
      setSelectedCell(cell);
    }

    if (
      selectedCell === cell &&
      selectedCell?.figure?.name !== 'королева белая шашка' &&
      selectedCell?.figure?.name !== 'королева черная шашка' &&
      !selectedCell?.figure?.canMove(cell)
    ) {
      if (
        (cell.y + 1 <= 7 ? !cell.board.getCell(cell.x + 1, cell.y + 1)?.isEmpty() : null) &&
        !(cell.y + 2 <= 7 ? cell.board.getCell(cell.x + 2, cell.y + 2)?.isEmpty() : null) &&
        (cell.y + 1 <= 7 ? !cell.board.getCell(cell.x - 1, cell.y + 1)?.isEmpty() : null) &&
        !(cell.y + 2 <= 7 ? cell.board.getCell(cell.x - 2, cell.y + 2)?.isEmpty() : null) &&
        cell.board.getCell(cell.x + 1, cell.y - 1)?.isFigure()?.color !== 'white' &&
        cell.board.getCell(cell.x - 1, cell.y - 1)?.isFigure()?.color !== 'white' &&
        board.lostBlackFigure?.length === 11
      ) {
        swapPlayer('three');
      } else if (
        (cell.y - 1 >= 0 ? !cell.board.getCell(cell.x + 1, cell.y - 1)?.isEmpty() : null) &&
        !(cell.y - 2 >= 0 ? cell.board.getCell(cell.x + 2, cell.y - 2)?.isEmpty() : null) &&
        (cell.y - 1 >= 0 ? !cell.board.getCell(cell.x - 1, cell.y - 1)?.isEmpty() : null) &&
        !(cell.y - 2 >= 0 ? cell.board.getCell(cell.x - 2, cell.y - 2)?.isEmpty() : null) &&
        cell.board.getCell(cell.x + 1, cell.y + 1)?.isFigure()?.color !== 'black' &&
        cell.board.getCell(cell.x - 1, cell.y + 1)?.isFigure()?.color !== 'black' &&
        board.lostWhiteFigure?.length === 11
      ) {
        swapPlayer('two');
      }
    }
  };

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function displayForm() {
    const div = [];
    for (let i = 0; i < 10; i++) {
      const divs = [];
      for (let j = 0; j < 40; j++) {
        divs.push(<div key={j} className="c" />);
      }
      div.push(
        <div key={i} className="firework">
          {divs}
        </div>,
      );
    }
    return div;
  }

  const setStyleColorFigureByConditional = (condition: boolean) => {
    if (isPlayWithBoot) {
      if (condition) {
        return { color: 'white', fontSize: '30px' };
      }
      return { color: 'black', fontSize: '30px' };
    }
    return { color: currentPlayer?.color, fontSize: '30px' };
  };
  const getPlayerColorByCondition = () => currentPlayer?.name;

  return (
    <div className="page__checkers">
      {board.lostWhiteFigure?.length === 12 || board.lostBlackFigure?.length === 12 ? (
        // ? блок победы игрока
        <div className="checkers__win">
          <h2 className="checkers__win-title">
            Поздравляем{' '}
            {board.lostWhiteFigure?.length ? (
              <span className="win-title__black">Черного</span>
            ) : (
              <span>Белого</span>
            )}{' '}
            игрока с победой!!!
          </h2>
          <div className="wrap">{displayForm()}</div>
          <div className="checkers__win-buttons">
            <button className="win-button__left" type="button" onClick={restart}>
              Продолжить игру
            </button>
            <button type="button" className="win-button__right">
              <Link href="../../../checkers">Выйти на главную</Link>
            </button>
          </div>
        </div>
      ) : (
        // ? основной блок
        <div className="checkers">
          <div className="checkers__left-count">
            <h3 className="left-count__title">
              Текущий счет сбитых <br /> белых шашек
            </h3>
            <span className="left-count__number">{board.lostWhiteFigure?.length}</span>
          </div>
          <div className="checkers__numbers-left">
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
            </ul>
          </div>
          <div className="checkers__content">
            {currentFigure ? (
              <h3 className="checkers__content-title">
                Текущий ход{' '}
                <span
                  className="checkers__content-title__player"
                  style={setStyleColorFigureByConditional(currentPlayer?.color === 'white')}
                >
                  {getPlayerColorByCondition()}
                </span>{' '}
                игрока{' '}
              </h3>
            ) : (
              <h3 className="checkers__content-title">
                Текущий ход{' '}
                <span
                  className="checkers__content-title__player"
                  style={setStyleColorFigureByConditional(currentPlayer?.color === 'white')}
                >
                  {getPlayerColorByCondition()}
                </span>{' '}
                {/* игрока{' '} */}
              </h3>
            )}
            <div className="checkers__letters-up">
              <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
              </ul>
            </div>
            {/* модалка */}
            <div className="checkers__modal">
              <button
                type="button"
                className="checkers__modal-button"
                onClick={() => {
                  dispatch(setShow(true));
                  dispatch(setShowFirst(false));
                }}
              >
                Правила игры
              </button>
              <Modal
                title={
                  showFirst
                    ? 'Уважаемый игрок, перед началом игры ознакомьтесь пожалуйста с правилами!'
                    : 'Правила игры'
                }
                onClose={() => dispatch(setShow(false))}
                show={show}
              >
                <p style={{ color: 'red' }}>
                  При блокировки хода необходимо кликнуть дважды по заблакированной шашке.
                </p>
                <p>
                  В игре принимают участие 2 игрока. Игроки располагаются на противоположных
                  сторонах доски.
                </p>
                <p>
                  Шашки расставляются на четырех, ближних к игроку, рядах на белых (светлых)
                  клетках. Право первого хода обычно принадлежит игроку, который играет белым
                  (светлым) цветом. Ходы осуществляются соперниками поочередно.
                </p>
                <p>
                  В начале игры все шашки соперников являются простыми. Простые шашки можно
                  перемещать только вперед по диагоналям на соседнюю свободную клетку.
                </p>
                <p>
                  Если простая шашка дошла до последней горизонтали, она становится «дамкой» и
                  обозначается переворачиванием. Дамка может перемещаться по диагоналям на любое
                  количество свободных клеток.
                </p>
                <p>
                  Взятие шашки соперника производится, переносом через неё своей, в том случае, если
                  она находится на соседней с простой шашкой диагональной клетке и за ней имеется
                  свободное поле. Если после этого хода имеется продолжения для взятия, ход
                  продолжается, при этом выбирается вариант по «правилу большинства», т.е. взятие
                  наибольшего количества шашек соперника, в данном случае дамка не пользуется
                  никакими преимуществами и не накладывает на игрока никаких дополнительных
                  обязательств.
                </p>
                <p>
                  Взятие шашки соперника может производиться, как вперед, так и назад. Шашка (шашки)
                  соперника снимается с доски.
                </p>
                <p>
                  Если простая шашка в процессе взятия шашек соперника достигает поля последней
                  горизонтали и ей предоставляется возможность дальнейшего взятия по правилам боя
                  дамкой, то она превращается в дамку, останавливаясь на поле последнего ряда. Право
                  взятия по правилам дамки она приобретает лишь со следующего хода, если рядом не
                  расположена шашка противника, в противном случае она имеет право забрать эту шашку
                  и последующие шашки которые распологаются на одной клетке за ней, и если есть
                  свободное пространство после взятой шашки.
                </p>
                <div className="modal-footer">
                  <button
                    className="modal-button"
                    type="button"
                    onClick={() => dispatch(setShow(false))}
                  >
                    Закрыть
                  </button>
                </div>
              </Modal>
            </div>

            <div className={transformBord}>
              {board.cells.map((row, index) => (
                <React.Fragment key={index}>
                  {row.map((cell) => (
                    <CellComponent
                      click={click}
                      cell={cell}
                      key={cell.id}
                      selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div className="checkers__letters-down">
              <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
              </ul>
            </div>
          </div>
          <div className="checkers__numbers-right">
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
            </ul>
          </div>
          <div className="checkers__right-count">
            <h3 className="right-count__title">
              Текущий счет сбитых <br /> <span>черных</span> шашек
            </h3>
            <span className="right-count__number">{board.lostBlackFigure?.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardCheckers;
