import { useLayoutEffect, useMemo } from 'react';

import { useAppDispatch } from '../../../hooks';
import { setBoardSizes } from '../../reducers/board-slice';
import { TargetCreator, TargetHitHandler } from '../../utils/types/target';

import { BoardWrapper } from './board.styles';
import { BoardInfo } from './components/board-info/board-info';
import { BoardContext } from './board-context';
import { BoardContent } from './components/board-content/board-content';

type Props = {
  targetCreator: TargetCreator;
  hitHandler: TargetHitHandler;
  missHandler: () => void;
};

export const Board = (props: Props) => {
  const { targetCreator, hitHandler, missHandler } = props;
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(
      setBoardSizes({
        w: 800,
        h: 500,
      }),
    );
  }, []);

  const contextValue = useMemo(() => ({ targetCreator, hitHandler }), [targetCreator, hitHandler]);

  return (
    <BoardContext.Provider value={contextValue}>
      <BoardWrapper>
        <BoardInfo />
        <BoardContent missHandler={missHandler} />
      </BoardWrapper>
    </BoardContext.Provider>
  );
};
