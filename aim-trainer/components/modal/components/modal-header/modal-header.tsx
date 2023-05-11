import { ModalCloseButton, ModalTitle, StyledModalHeader } from './modal-header.styles';

type Props = {
  title?: string;
  onCancel?: () => void;
  hasHeader?: boolean;
};

export const ModalHeader = (props: Props) => {
  const { title, onCancel, hasHeader = true } = props;

  if (!hasHeader) return null;

  return (
    <StyledModalHeader>
      <ModalTitle>{title}</ModalTitle>
      <ModalCloseButton onClick={() => onCancel} />
    </StyledModalHeader>
  );
};
