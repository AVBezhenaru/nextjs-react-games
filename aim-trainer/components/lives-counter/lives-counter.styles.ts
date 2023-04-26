import styled, { css } from 'styled-components';

export const StyledLivesCounter = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;

export type LiveStyles = {
  disable: boolean;
};

export const StyledLive = styled.div<LiveStyles>`
  width: 25px;
  height: 25px;

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.colors.accent};

    ${({ disable }) =>
      disable &&
      css`
        fill: #eee;
      `}
  }
`;
