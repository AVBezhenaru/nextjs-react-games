import styled from 'styled-components';

export const SectionLayout = styled.section`
  font-family: Inter, sans-serif;
  height: 100vh;
  margin: 0 auto;
  // max-width: 1440px;
  min-height: calc(100vh - 50px);
  width: 100%;
  box-sizing: revert;
`;

export const LayoutHeader = styled.div`
  height: 45px;
  width: 100%;
  font-weight: 400;
  font-size: 0.85rem;
  padding-top: 5px;
  padding-left: 15px;
  color: rgba(247, 247, 247, 0.8);
  letter-spacing: 5px;
  background-color: rgba(247, 247, 247, 0.3);
  z-index: 999;
`;

export const ButtonBack = styled.div`
  display: inline-block;
  align-items: center;
  cursor: pointer;

  && span {
    vertical-align: middle;
    margin-left: 10px;
  }
`;
