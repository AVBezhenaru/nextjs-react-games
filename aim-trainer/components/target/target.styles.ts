import styled from 'styled-components';

import { PositionType } from '../../utils/types/sizes';

export type TargetStyles = {
  size: number;
  lifetime?: number;
  position: PositionType;
  scale: number;
};

export const StyledTarget = styled.div.attrs<TargetStyles>(
  ({ size, lifetime, position, scale }) => ({
    style: {
      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
      width: `${size}px`,
      height: `${size}px`,
      transition: `transform ${lifetime / 2}ms ease-in-out`,
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
