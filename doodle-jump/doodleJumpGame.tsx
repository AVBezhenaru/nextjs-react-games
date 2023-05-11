import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';

import background from './images/background.png';
import doodlerGuy from './images/doodler-guy.png';
import {
  BackgroundImg,
  Doodler,
  DoodlerImg,
  Grid,
  PlayAgainButton,
  Score,
} from './components/doodleJumpStyles';
import {
  addBlocks,
  changeDoodlerX,
  changeDoodlerXSpeed,
  changeDoodlerY,
  changeDoodlerYSpeed,
  changeIsDead,
  playAgain,
} from './reducer/doodleReducer';
import Blocks from './components/blocks';

export default function DoodleJumpGame() {
  const doodlerY = useAppSelector((state) => state.doodler.doodlerY);
  const doodlerYSpeed = useAppSelector((state) => state.doodler.doodlerYSpeed);
  const blocks = useAppSelector((state) => state.doodler.blocks);
  const doodlerX = useAppSelector((state) => state.doodler.doodlerX);
  const doodlerXSpeed = useAppSelector((state) => state.doodler.doodlerXSpeed);
  const score = useAppSelector((state) => state.doodler.score);
  const isDead = useAppSelector((state) => state.doodler.isDead);
  const dispatch = useAppDispatch();
  const [frames, changeFrames] = useState(0);
  const gravity = 0.2;
  const [resistanceX, changeResistanceX] = useState(0.25);
  const doodlerStyle = {
    bottom: `min(500px, ${doodlerY}px)`,
    left: `${doodlerX}px`,
  };

  const doodlerImgStyle = () => {
    if (doodlerXSpeed < 0) return { transform: 'scale(-1, 1)' };
  };

  const DoodlerElem = (
    <Doodler style={doodlerStyle}>
      <DoodlerImg src={doodlerGuy.src} style={doodlerImgStyle()} />
    </Doodler>
  );

  function moveDoodlerX(e: any) {
    changeResistanceX(0);
    if (e.key === 'ArrowLeft') {
      dispatch(changeDoodlerXSpeed(doodlerXSpeed - 5));
    } else if (e.key === 'ArrowRight') {
      dispatch(changeDoodlerXSpeed(doodlerXSpeed + 5));
    }
  }

  function restoreResistanceX() {
    changeResistanceX(2.5);
  }

  function moveObjects() {
    const newArr = blocks.map((block: any) => {
      const newBlock = { ...block };
      if (doodlerY > 200) newBlock.posY -= 3;
      return newBlock;
    });

    dispatch(addBlocks([...newArr]));
  }

  function start() {
    dispatch(changeDoodlerYSpeed(doodlerYSpeed - gravity));
    dispatch(changeDoodlerX(doodlerX + doodlerXSpeed));
    if (doodlerXSpeed > 0) dispatch(changeDoodlerXSpeed(doodlerXSpeed - resistanceX));
    if (doodlerXSpeed < 0) dispatch(changeDoodlerXSpeed(doodlerXSpeed + resistanceX));

    dispatch(changeDoodlerY(doodlerY + doodlerYSpeed));

    if (doodlerX <= 0) dispatch(changeDoodlerX(359));
    if (doodlerX >= 360) dispatch(changeDoodlerX(1));

    moveObjects();

    if (doodlerY <= 10) {
      dispatch(changeIsDead(true));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeFrames((frames) => frames + 1);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDead === false) start();
  }, [frames]);

  useEffect(() => {
    window.addEventListener('keydown', moveDoodlerX);
    return () => window.removeEventListener('keydown', moveDoodlerX);
  }, []);

  useEffect(() => {
    window.addEventListener('keyup', restoreResistanceX);
    return () => window.removeEventListener('keyup', restoreResistanceX);
  }, []);

  function again() {
    dispatch(playAgain());
  }

  if (isDead) {
    return (
      <Grid>
        <Score>Ваш счет {score}</Score>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <PlayAgainButton type="button" onClick={again}>
          Играть
        </PlayAgainButton>
        <BackgroundImg src={background.src} />
      </Grid>
    );
  }

  return (
    <Grid>
      <Score>{score}</Score>
      {DoodlerElem}
      <BackgroundImg src={background.src} />
      <Blocks />
    </Grid>
  );
}
