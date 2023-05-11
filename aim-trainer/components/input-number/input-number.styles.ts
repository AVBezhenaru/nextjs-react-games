import styled from 'styled-components';

export const InputNumberWrapper = styled.div``;

export const StyledInputNumber = styled.input`
  background: ${({ theme }) => theme.colors.lightColor};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.transparentGray};
  font-size: 16px;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borders.smallRadius};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.transparentGray};
  }
`;
