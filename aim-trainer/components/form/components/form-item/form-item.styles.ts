import styled from 'styled-components';

export const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormItemLabel = styled.label`
  font-size: 16px;
`;
