import { BoardWrapper } from './board.styles';
import { BoardInfo } from './components/board-info/board-info';
import { BoardContext, BoardContextType } from './board-context';
import { BoardContent } from './components/board-content/board-content';

type Props = BoardContextType & {
  missHandler: () => void;
};

export const Board = (props: Props) => {
  const { missHandler, ...contextValue } = props;

  return (
    <BoardContext.Provider value={contextValue}>
      <BoardWrapper>
        <BoardInfo />
        <BoardContent missHandler={missHandler} />
      </BoardWrapper>
    </BoardContext.Provider>
  );
};
