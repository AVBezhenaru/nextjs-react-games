import styled from 'styled-components';

export const StyledLeaderListItem = styled.li`
  font-weight: 400;
  background: ${({ theme }) => theme.colors.lightColor};

  display: flex;
  align-items: center;
  gap: 10px;

  margin: 10px 0 0;
  padding: 8px 10px;
  border-radius: ${({ theme }) => theme.borders.smallRadius};

  &:before {
    counter-increment: list-counter;
    content: counter(list-counter);

    width: 30px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.lightColor};
    border-radius: ${({ theme }) => theme.borders.smallRadius};
  }
`;

export const LeaderListItemNickname = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LeaderListItemDate = styled.span`
  font-size: 0.8em;
  color: ${({ theme }) => theme.colors.grayColor};
`;
