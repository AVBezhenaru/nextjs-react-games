import { PropsWithChildren, ReactNode, useLayoutEffect } from 'react';

import { ModalOverlay, StyledModal } from './modal.styles';
import { ModalHeader } from './components/modal-header/modal-header';
import { ModalFooter } from './components/modal-footer/modal-footer';

type Props = PropsWithChildren<{
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  footer?: ReactNode[];
  title?: string;
  hasHeader?: boolean;
}>;

export const Modal = (props: Props) => {
  const { open, footer, onOk, onCancel, children, title, hasHeader = true } = props;

  useLayoutEffect(() => {
    document.body.style.overflow = open ? 'hidden' : null;
  }, [open]);

  return (
    <ModalOverlay onClick={() => onCancel()} open={open}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader hasHeader={hasHeader} title={title} onCancel={onCancel} />
        {children}
        <ModalFooter onOk={onOk} onCancel={onCancel}>
          {footer}
        </ModalFooter>
      </StyledModal>
    </ModalOverlay>
  );
};
