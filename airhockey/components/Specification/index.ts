import styled from 'styled-components';

export const Li = styled.li`
  list-style-type: decimal;
`;

export const SpecificationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  width: 100%;
  height: 100%;
  min-height: 969px;
  background: linear-gradient(to bottom right, #000, #512934);
`;
export const SpecificationWrapperBox = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: rgb(224, 218, 218);
  color: black;
  z-index: 2;
  border: 1px solid black;
  border-radius: 5px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: normal;
  margin-bottom: 1rem;
`;

export const SpecificationTitleH1 = styled.h1`
  margin-top: 0;
  font-family: myFirstFont;
`;
export const RulesWrapper = styled.ol`
  padding: 15px;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 2px;
`;

export const HR = styled.hr`
  width: 100%;
`;
