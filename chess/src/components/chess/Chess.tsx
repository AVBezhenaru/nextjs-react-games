import Image from 'next/image';

import React, { useState, useEffect, useRef } from 'react';

import { App as MainChess, Container, CurrentPlayerText } from '../../styles/chess.style';
import BoardComponent from '../boardComponent/BoardComponent';
import { Board } from '../../models/Board';
import { Player } from '../../models/Player';
import { Colors } from '../../models/Colors';
import LostFigures from '../lostFigures/LostFigures';
import Header from '../header/Header';
import PlayerData from '../playerData/PlayerData';
import { Cell } from '../../models/Cell';
// eslint-disable-next-line import/order
import { GameMode } from '../../models/Settings';
// import { useAppSelector } from '../../../../hooks/useAppSelector';

import { useAppSelector } from '../../../../hooks';

import styles from './chess.module.scss';
// import {useAppSelector} from "../../../../hooks";

// interface GameSettings {
//   // не сделано
//   gameTime: string | null;
//   gainTime: string | null;
//   startColor: Colors;
//   gameMode: GameMode;
// }

const Chess = () => {
  const [board, setBoard] = useState(new Board());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const settingsGame = useRef({
    gameTime: null,
    gainTime: null,
    startColor: Colors.WHITE,
    gameMode: GameMode.friendOffline,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gainTime, setGainTime] = useState<string | null>(null);

  const rival = useAppSelector((state) => state.rootSlice.rival);
  const player = useAppSelector((state) => state.rootSlice.currentPlayer);

  // const [gameStartSettings, setGameStartSettings] = useState<GameSettings>(settingsGame.current);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameMode, setGameMode] = useState('');
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const scroll: any = useRef<HTMLInputElement>();
  console.log(player);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setSelectedCell(null);
    // setGameTime(null);
    setGainTime(null);
  };

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
    // setGameMode(JSON.parse(localStorage.getItem('gameSettings')).mode);
  }, [gameMode]);

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  const historyCounter = () => {
    let counter = 1;
    const steps = board.historyMove;
    const data = [];
    for (let i = 0; i < steps.length; i += 1) {
      if (i % 2 !== 0) {
        data.push(' ');
      } else {
        data.push(`${counter}. `);
        counter += 1;
      }
    }
    return data;
  };

  const historyCounterElements = historyCounter().map((count, i) => (
    <div className={styles['chess__history-count']} key={i + 100}>
      {count}{' '}
    </div>
  ));

  const historyElements = board.historyMove.map((step, i) => (
    <div className={styles['chess__history-item']} key={i}>
      <div className={styles['chess__hisstory-image']}>
        <Image
          width="25"
          height="25"
          className={styles['chess__history-figure-img']}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          src={step.figureData?.logo}
          alt="figure"
        />
      </div>

      <div className={styles['chess__history-move']}>
        {step.moveData}

        {step.eatFigureData && (
          <div className={styles['chess__history-eat-figure']}>
            {'x '}
            <Image
              className={styles['chess__history-figure-img']}
              width="25"
              height="25"
              src={step.eatFigureData}
              alt="figure"
            />
          </div>
        )}

        {step.check && ' +'}
      </div>
    </div>
  ));
  useEffect(() => {
    scroll.current.scrollTop = scroll.current.scrollHeight;
  });

  let winPlayer: string | null;
  if (board.blackKing?.chekAndMateFlag) {
    winPlayer = 'белые';
  } else {
    winPlayer = null || board.whiteKing?.chekAndMateFlag ? 'черные' : null;
  }

  const stalemateInfo = board.stalemate ? 'ничья' : null;

  const endGameMessage = winPlayer ? (
    <div className={styles['chess__win-message']}>Игра окончена, {winPlayer} победили</div>
  ) : null || stalemateInfo ? (
    <div className={styles['chess__win-message']}>Игра окончена, {stalemateInfo}</div>
  ) : null;

  const playerStep =
    player?.label.colors === 'белые'
      ? player?.label.name || 'Вероника'
      : rival?.label.name || 'name';

  const rivalStep =
    rival?.label.colors === 'белые'
      ? player?.label.name || 'Вероника'
      : rival?.label.name || 'name';

  return (
    <MainChess>
      <Header restart={restart} setGainTime={setGainTime} settingsGame={settingsGame.current} />
      <Container>
        <section className={styles.chess}>
          <div className={styles.chess__data}>
            <div className={styles['chess__data-title']}>Матч</div>
            <div className={styles['chess__data-wrapper']}>
              <div className={styles['chess__data-suptitle']}>Режим игры:</div>
              <span className={styles.chess__mode}>{player?.label?.mode}</span>
            </div>
            <div className={styles['chess__data-suptitle']}>История ходов:</div>
            <div className={styles.chess__history}>
              <div className={styles['chess__history-inner']} ref={scroll}>
                <div className={styles['chess__history-wrapper']}>
                  <div className={styles['chess__history-items']}>{historyCounterElements}</div>
                  <div className={styles['chess__history-items']}>{historyElements}</div>
                </div>
              </div>
            </div>
          </div>
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            changePlayer={changePlayer}
            restart={restart}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
          />
          <div className={styles.chess__info}>
            <LostFigures figures={board.lostWhiteFigures} />
            <div className={styles['chess__info-wrapper']}>
              <PlayerData
                currentPlayer={currentPlayer}
                playerName={rivalStep}
                playerColor={Colors.BLACK}
              />
              <CurrentPlayerText>
                Ход {currentPlayer?.color === 'white' ? 'белых' : 'чёрных'}
                {endGameMessage}
              </CurrentPlayerText>
              <PlayerData
                currentPlayer={currentPlayer}
                playerName={playerStep}
                playerColor={Colors.WHITE}
              />
            </div>
            <LostFigures figures={board.lostBlackFigures} />
          </div>
        </section>
      </Container>
    </MainChess>
  );
};

export default Chess;
