import { addBlocks } from '../reducer/doodleReducer';
import { BlockInterface } from '../components/types';

export default function createPlatform(posY: number, blocks: BlockInterface[], dispatch: any) {
  const newObjX = Math.random() * 300;
  const newObj = {
    type: 'platform',
    posX: newObjX,
    posY,
  };

  const newArr = [...blocks, newObj];
  dispatch(addBlocks(newArr));
}
