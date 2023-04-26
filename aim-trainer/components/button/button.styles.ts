import styled from 'styled-components';

export const Button = styled.button`
  background-image: ${({ theme }) => theme.gradients.main};
  background-size: 200% auto;
  padding: 14px 60px;
  font-size: 20px;

  transition: background-position 0.4s ease-in-out;
  border-radius: 40px;

  &:hover {
    background-position: 100% 0;
  }
`;
