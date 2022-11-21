import React, { FC, useState } from 'react';

import Modal from '../../checkers/components/Modal/Modal';

interface СhoosePlayerProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
const СhoosePlayer: FC<СhoosePlayerProps> = () => {
  const [, setShowFirst] = useState(true);
  const [show, setShow] = useState(false);
  return (
    <div className="closePlayer__page">
      <button
        type="button"
        className="lobbiCreckers__modal-button"
        onClick={() => {
          setShow(true);
          setShowFirst(false);
        }}
      >
        Создать игру
      </button>
      <Modal onClose={() => setShow(false)} show={show}>
        <p>При блокировки хода необходимо кликнуть дважды по заблакированной шашке.</p>
      </Modal>
    </div>
  );
};
export default СhoosePlayer;
