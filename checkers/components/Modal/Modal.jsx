import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const Modal = (props) => {
  const nodeRef = React.useRef(null);

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <CSSTransition in={props.show} unmountOnExit timeout={{ enter: 0, exit: 300 }} nodeRef={nodeRef}>
      <div className="modal" onClick={props.onClose} ref={nodeRef}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
