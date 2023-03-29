import { addBlocks } from '../reducer/doodleReducer';
import { BlockInterface } from '../components/types';

export default function createFirstPlatforms(blocks: BlockInterface[], dispatch: any) {
  const newBlocks = [];
  for (let i = 0; i < 7; i++) {
    const platGap = 600 / 7;
    const newObjY = 100 + i * platGap;
    const newObjX = Math.random() * (400 - 85);
    const newObj = {
      type: 'platform',
      posX: newObjX,
      posY: newObjY,
    };
    newBlocks.push(newObj);
  }

  dispatch(addBlocks(newBlocks));
}
