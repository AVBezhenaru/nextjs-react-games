import styled from 'styled-components';

export const StyledLinkToMode = styled.div`
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border-radius: 10px;
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
