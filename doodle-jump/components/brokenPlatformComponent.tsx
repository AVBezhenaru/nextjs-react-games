import { useAppDispatch, useAppSelector } from '../../hooks';
import deletePlatform from '../functions/deletePlatform';

import { BrokenPlatform } from './doodleJumpStyles';

export default function BrokenPlatformComponent({
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
    doodlerY < 350
  ) {
    /*    dispatch(changeDoodlerYSpeed(10)); */
  }

  return <BrokenPlatform style={platformStyles} />;
}
