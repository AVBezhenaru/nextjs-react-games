import { addBlocks } from '../reducer/doodleReducer';
import { BlockInterface } from '../components/types';

export default function createBrokenPlatform(
  posY: number,
  blocks: BlockInterface[],
  dispatch: any,
) {
  const newObjX = Math.random() * 300;
  const newObj = {
    type: 'brokenPlatform',
    posX: newObjX,
    posY,
  };

  const newArr = [...blocks, newObj];
  dispatch(addBlocks(newArr));
}
