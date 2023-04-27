import { MouseEventHandler, useCallback, useContext, useEffect, useState } from 'react';

import { removeTarget } from '../../reducers/targets-slice';
import { useAppDispatch } from '../../../hooks';
import { addDeath } from '../../reducers/game-slice';
import { BoardContext } from '../board/board-context';
import { TargetType } from '../../utils/types/target';

import { StyledTarget } from './target.styles';

export type TargetProps = TargetType;

export const Target = (props: TargetProps) => {
  const { id, position, size, lifetime, animationType } = props;
  const { hitHandler } = useContext(BoardContext);

  const dispatch = useAppDispatch();

  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    if (lifetime) {
      let scaleTimerID = setTimeout(() => {
        setScale(1);

        scaleTimerID = setTimeout(() => {
          setScale(0);
        }, lifetime / 2);
      }, 20);

      const dieTimerID = setTimeout(() => {
        dispatch(removeTarget(id));
        dispatch(addDeath());
      }, lifetime);

      return () => {
        clearTimeout(scaleTimerID);
        clearTimeout(dieTimerID);
      };
    }

    setScale(1);
  }, []);

  const targetHitHandler = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.stopPropagation();
      hitHandler(id);
    },
    [hitHandler],
  );

  return (
    <StyledTarget
      size={size}
      onMouseDown={targetHitHandler}
      lifetime={lifetime}
      position={position}
      lifecycle={scale}
      animationType={animationType}
    />
  );
};
