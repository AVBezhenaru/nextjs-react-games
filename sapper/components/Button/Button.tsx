import { FC } from 'react';

import classes from './Button.module.scss';

interface IButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = ({ text, onClick }) => (
  <button type="button" className={classes.Button} onClick={onClick}>
    {text}
  </button>
);

export default Button;
