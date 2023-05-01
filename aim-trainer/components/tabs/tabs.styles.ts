import styled, { css } from 'styled-components';

type TabProps = {
  active: boolean;
};

export const Tab = styled.button<TabProps>`
  color: ${({ theme }) => theme.colors.text};
  padding: 6px 15px;
  border-radius: ${({ theme }) => theme.borders.smallRadius};
  background: ${({ theme }) => theme.colors.lightColor};

  ${({ active, theme }) =>
    active &&
    css`
      color: ${theme.colors.accent};
    `}
`;

export const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const TabsContainer = styled.div`
  background: ${({ theme }) => theme.colors.mainBackground};
  color: ${({ theme }) => theme.colors.text};

  width: 100%;
  box-sizing: border-box;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: ${({ theme }) => theme.borders.baseRadius};
`;

export const TabContent = styled.div`
  width: 100%;
`;
