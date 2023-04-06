import { ActionInterface, BlockInterface } from '../components/types';

const initialState = {
  doodlerY: 200,
  doodlerX: 200,
  doodlerXSpeed: 0,
  doodlerYSpeed: 10,
  blocks: [] as BlockInterface[],
  isFirstRender: true,
  score: 0,
  isDead: true,
};

function doodlerReducer(state = initialState, action: ActionInterface) {
  switch (action.type) {
    case 'CHANGE_DOODLER_Y':
      return { ...state, doodlerY: action.payload };
    case 'CHANGE_DOODLER_Y_SPEED':
      return { ...state, doodlerYSpeed: action.payload };
    case 'CHANGE_DOODLER_X':
      return { ...state, doodlerX: action.payload };
    case 'CHANGE_DOODLER_X_SPEED':
      return { ...state, doodlerXSpeed: action.payload };
    case 'ADD_BLOCKS':
      return { ...state, blocks: action.payload };
    case 'DELETE_BLOCK':
      return { ...state, blocks: action.payload };
    case 'CHANGE_IS_FIRST_RENDER':
      return { ...state, isFirstRender: action.payload };
    case 'CHANGE_SCORE':
      return { ...state, score: action.payload };
    case 'CHANGE_IS_DEAD':
      return { ...state, isDead: action.payload };
    case 'PLAY_AGAIN':
      return { ...initialState, blocks: state.blocks, isDead: false };
    default:
      return { ...state };
  }
}

export const playAgain = () => ({
  type: 'PLAY_AGAIN',
});
export const changeDoodlerY = (payload: number) => ({
  type: 'CHANGE_DOODLER_Y',
  payload,
});

export const changeDoodlerYSpeed = (payload: number) => ({
  type: 'CHANGE_DOODLER_Y_SPEED',
  payload,
});

export const changeDoodlerX = (payload: number) => ({
  type: 'CHANGE_DOODLER_X',
  payload,
});

export const changeDoodlerXSpeed = (payload: number) => ({
  type: 'CHANGE_DOODLER_X_SPEED',
  payload,
});
export const addBlocks = (payload: BlockInterface[]) => ({
  type: 'ADD_BLOCKS',
  payload,
});

export const deleteBlock = (payload: BlockInterface[]) => ({
  type: 'DELETE_BLOCK',
  payload,
});

export const changeIsFirstRender = (payload: any) => ({
  type: 'CHANGE_IS_FIRST_RENDER',
  payload,
});

export const changeScore = (payload: number) => ({
  type: 'CHANGE_SCORE',
  payload,
});

export const changeIsDead = (payload: boolean) => ({
  type: 'CHANGE_IS_DEAD',
  payload,
});
export default doodlerReducer;
