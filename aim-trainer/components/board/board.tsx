import { useLayoutEffect, useMemo } from 'react';

import { useAppDispatch } from '../../../hooks';
import { setBoardSizes } from '../../reducers/board-slice';

import { BoardWrapper } from './board.styles';
import { BoardInfo } from './components/board-info/board-info';
import { BoardContext, BoardContextType } from './board-context';
import { BoardContent } from './components/board-content/board-content';

type Props = BoardContextType & {
  missHandler: () => void;
};

export const Board = (props: Props) => {
  const { targetCreator, hitHandler, missHandler, difficultyModes } = props;
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(
      setBoardSizes({
        w: 800,
        h: 500,
      }),
    );
  }, []);

  const contextValue = useMemo<BoardContextType>(
    () => ({ targetCreator, hitHandler, difficultyModes }),
    [targetCreator, hitHandler, difficultyModes],
  );

  return (
    <BoardContext.Provider value={contextValue}>
      <BoardWrapper>
        <BoardInfo />
        <BoardContent missHandler={missHandler} />
      </BoardWrapper>
    </BoardContext.Provider>
  );
};
