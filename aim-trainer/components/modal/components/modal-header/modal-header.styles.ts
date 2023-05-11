import styled from 'styled-components';

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ModalTitle = styled.h3`
  font-size: 1rem;
`;
export const ModalCloseButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:before {
    content: '\\2715';
  }
`;
