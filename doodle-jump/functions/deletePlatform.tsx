import { deleteBlock } from '../reducer/doodleReducer';
import { BlockInterface } from '../components/types';

export default function deletePlatform(blocks: BlockInterface[], dispatch: any, index: number) {
  const newArray = [...blocks.slice(0, index), ...blocks.slice(index + 1)];
  dispatch(deleteBlock(newArray));
}
