import React, { useState } from 'react';
import Link from 'next/link';

import styles from './modal.module.scss';

type Props = {
  reset: () => void;
};

const ModalDialog: React.FC<Props> = ({ reset }) => {
  const [open, setOpen] = useState(true);

  const clickHandler = () => {
    setOpen(!open);
    reset();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>You win!</h2>
        <button className={styles.modalButton} type="button" onClick={clickHandler}>
          Restart
        </button>
        <Link href="../memoryCards">
          <button className={styles.modalButton} type="button" onClick={clickHandler}>
            Choose theme
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ModalDialog;
