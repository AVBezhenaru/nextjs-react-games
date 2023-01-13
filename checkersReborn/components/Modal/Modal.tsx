import { FC } from "react";

import classes from './Modal.module.scss';

interface IModalProps {
  children?: JSX.Element,
  onClose: () => void,
  title: string,
}

const Modal: FC<IModalProps> = ({ children, title, onClose }) => {

  return (
    <div className={classes.Modal}>
      <div className={classes.ModalContent}>
        <div className={classes.ModalHeader}>
          <h4 className={classes.ModalTitle}>{title}</h4>
        </div>
        <div className={classes.ModalBody}>{children}</div>
        
        <div className={classes.ModalFooter}>
          <button
            className={classes.ModalButton}
            type="button"
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
