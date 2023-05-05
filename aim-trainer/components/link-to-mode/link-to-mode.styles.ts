import styled from 'styled-components';

export const StyledLinkToMode = styled.div`
  background: ${({ theme }) => theme.colors.darkTransparentBackground};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borders.smallRadius};
  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: rgba(100, 100, 100, 0.3);
  }

  img {
    max-width: 100%;
    height: 230px;
  }
`;
