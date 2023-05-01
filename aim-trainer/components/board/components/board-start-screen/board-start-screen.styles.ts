import styled, { css } from 'styled-components';

import { Button } from '../../../button/button.styles';

export const StartGameButton = Button;

type SelectModeButtonProps = {
  active?: boolean;
};

export const SelectModeButton = styled.button<SelectModeButtonProps>`
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 20px;
  border-radius: ${({ theme }) => theme.borders.smallRadius};
  background: ${({ theme }) => theme.colors.primary};

  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.colors.lightColor};
      background: ${({ theme }) => theme.colors.accent};
    `}
`;

export const StyledBoardStartScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const SelectModeButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
