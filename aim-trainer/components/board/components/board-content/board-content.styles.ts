import styled from 'styled-components';

export const StyledBoardContent = styled.div`
  width: 800px;
  height: 500px;
  background: ${({ theme }) => theme.colors.mainBackground};

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borders.baseRadius};
`;
