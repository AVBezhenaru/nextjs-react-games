import deletePlatform from '../functions/deletePlatform';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeDoodlerYSpeed } from '../reducer/doodleReducer';

import { Platform, PlatformImg } from "./doodleJumpStyles";

import platform from '../images/platform.png';

export default function PlatformComponent({
  posX,
  posY,
  index,
}: {
  posX: number;
  posY: number;
  index: number;
}) {
  const platformStyles = { left: `${posX}px`, bottom: `${posY}px` };

  const dispatch = useAppDispatch();
  const doodlerY = useAppSelector((state) => state.doodler.doodlerY);
  const doodlerYSpeed = useAppSelector((state) => state.doodler.doodlerYSpeed);
  const doodlerX = useAppSelector((state) => state.doodler.doodlerX);
  const blocks = useAppSelector((state) => state.doodler.blocks);

  if (posY <= 15) {
    deletePlatform(blocks, dispatch, index);
  }

  if (
    posX + 85 >= doodlerX &&
    posX <= doodlerX + 60 &&
    posY + 15 >= doodlerY &&
    posY <= doodlerY &&
    doodlerYSpeed <= 0 &&
    doodlerY < 400
  ) {
    dispatch(changeDoodlerYSpeed(10));
  }

  return (
    <Platform style={platformStyles}>
      <PlatformImg src={platform.src} />
    </Platform>
  );
}
