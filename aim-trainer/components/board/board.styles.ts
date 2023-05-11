import styled from 'styled-components';

export const SecondsToStart = styled.span`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.text};
`;

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 50px;
`;

export const StyledBoardInfo = styled.div`\
  width: 100%;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBoardInfoItems = styled.div`
  display: flex;
  gap: 20px;
`;
