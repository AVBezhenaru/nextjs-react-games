import { useLayoutEffect, useMemo, useRef } from 'react';

import { useAppDispatch } from '../../../hooks';
import { SizeType } from '../../utils/types/sizes';
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
  const boardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { clientWidth, clientHeight } = boardRef.current;
    const boardSizes: SizeType = {
      w: clientWidth,
      h: clientHeight,
    };

    dispatch(setBoardSizes(boardSizes));
  }, [boardRef]);

  const contextValue = useMemo(() => ({ targetCreator, hitHandler }), [targetCreator, hitHandler]);

  return (
    <BoardContext.Provider value={contextValue}>
      <BoardWrapper>
        <BoardInfo />
        <BoardContent ref={boardRef} missHandler={missHandler} />
      </BoardWrapper>
    </BoardContext.Provider>
  );
};
