import styled from 'styled-components';

export const CardItem = styled.div`
  position: absolute;
  width: 100px;
  height: 138px;
  && img {
    border-radius: 13px;
  }
`;

export const Corrector = styled.div`
  height: 20px;
  &&:first-child {
    height: 0;
  }
`;
