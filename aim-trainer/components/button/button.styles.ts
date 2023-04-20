import styled from 'styled-components';

export const Button = styled.button`
  background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
  background-size: 200% auto;
  padding: 14px 60px;
  font-size: 20px;

  transition: background-position 0.4s ease-in-out;
  border-radius: 40px;

  &:hover {
    background-position: 100% 0;
  }
`;
