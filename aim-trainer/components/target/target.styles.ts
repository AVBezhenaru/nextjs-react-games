import styled from 'styled-components';

import { PositionType } from '../../utils/types/sizes';
import { TargetAnimationTypes } from '../../utils/types/target';

export type TargetStyles = {
  size: number;
  lifetime?: number;
  position: PositionType;
  lifecycle: number;
  animationType: TargetAnimationTypes;
};

const selectTargetTransform = (type: TargetAnimationTypes, value: number) => {
  switch (type) {
    case TargetAnimationTypes.scale:
      return `scale(${value})`;
    default:
      return '';
  }
};

export const StyledTarget = styled.div.attrs<TargetStyles>(
  ({ size, lifetime, position, lifecycle, animationType }) => ({
    style: {
      transform: `translate(${position.x}px, ${position.y}px) ${selectTargetTransform(
        animationType,
        lifecycle,
      )}`,
      width: `${size}px`,
      height: `${size}px`,
      transition: `transform ${lifetime / 2}ms ease-in-out, opacity ${lifetime / 2}ms ease-in-out `,
      opacity: animationType === TargetAnimationTypes.fadeIn ? lifecycle : 1,
    },
  }),
)<TargetStyles>`
  background: ${({ theme }) => theme.colors.accent};

  position: absolute;
  left: 0;
  top: 0;

  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
`;
