import React from 'react';

import cl from './MyButton.module.css';

interface MyButtonProps {
  children: React.ReactNode;
  mainPage?: boolean;
  modal?: boolean;
  onClick?: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ children, mainPage, modal, ...otherButtonProps }) => (
  <button
    type="button"
    className={`
      ${cl['custom-button']}
      ${mainPage ? cl['main-page-button'] : ''}
      ${modal ? cl['modal-button'] : ''}
    `}
    {...otherButtonProps}
  >
    {children}
  </button>
);

export default MyButton;
