import styled, { css } from 'styled-components';

type ModalStyledProps = {
  open: boolean;
};

export const ModalOverlay = styled.div<ModalStyledProps>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9;

  background: ${({ theme }) => theme.colors.darkTransparentBackground};

  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 0;
  box-sizing: border-box;
  overflow-y: auto;

  opacity: 0;
  pointer-events: none;

  transition: opacity 0.2s ease-in-out;

  ${({ open }) =>
    open &&
    css`
      pointer-events: all;
      opacity: 1;
    `}
`;

export const StyledModal = styled.div`
  width: 500px;
  background: ${({ theme }) => theme.colors.mainBackground};
  color: ${({ theme }) => theme.colors.text};

  box-sizing: border-box;
  padding: 10px 15px;
  border-radius: ${({ theme }) => theme.borders.baseRadius};

  display: flex;
  flex-direction: column;
  gap: 10px;

  font-weight: 400;
`;
