import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeScore } from '../reducer/doodleReducer';
import createPlatform from '../functions/createPlatform';
import createFirstPlatforms from '../functions/createFirstPlatforms';
import createBrokenPlatform from '../functions/createBrokenPlatform';

import PlatformComponent from './platformComponent';
import BrokenPlatformComponent from './brokenPlatformComponent';
import { BlockInterface } from './types';

export default function Blocks() {
  const blocks = useAppSelector((state) => state.doodler.blocks);

  const score = useAppSelector((state) => state.doodler.score);
  const dispatch = useAppDispatch();

  const elements = blocks.map((block: BlockInterface, index: number): JSX.Element => {
    if (block.type === 'platform') {
      return (
        <PlatformComponent key={block.posX} posX={block.posX} posY={block.posY} index={index} />
      );
    }

    if (block.type === 'brokenPlatform') {
      return (
        <BrokenPlatformComponent
          key={block.posX}
          posX={block.posX}
          posY={block.posY}
          index={index}
        />
      );
    }
  });

  useEffect(() => {
    createFirstPlatforms(blocks, dispatch);
  }, []);

  const [prevBlocksLength, setPrevBlocksLength] = useState(blocks.length);

  useEffect(() => {
    dispatch(changeScore(score + 1));
    if (blocks.length < prevBlocksLength && blocks.length < 5) {
      const random = Math.random() * 100;
      if (random <= 90) createPlatform(600, blocks, dispatch);
      if (random > 90 && random <= 100) createBrokenPlatform(600, blocks, dispatch);
    }
    setPrevBlocksLength(blocks.length);
  }, [blocks.length]);

  return elements;
}
