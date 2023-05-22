import { PropsWithChildren } from 'react';

import { Button, ButtonSizes, ButtonTypes } from '../../../button/button.styles';

import { StyledModalFooter } from './modal-footer.styles';

type Props = PropsWithChildren<{
  onOk: () => void;
  onCancel: () => void;
}>;

export const ModalFooter = (props: Props) => {
  const { children, onOk, onCancel } = props;

  const defaultChildren = [
    <Button
      buttonType={ButtonTypes.Primary}
      size={ButtonSizes.Small}
      onClick={() => onOk && onOk()}
    >
      Ok
    </Button>,
    <Button buttonType={ButtonTypes.Text} size={ButtonSizes.Small} onClick={() => onCancel()}>
      Cancel
    </Button>,
  ];

  return <StyledModalFooter>{children || defaultChildren}</StyledModalFooter>;
};
