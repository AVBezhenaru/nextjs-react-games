import { FC } from 'react';

import classes from './Button.module.scss';

interface IButtonProps {
  text: string;
  onClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Button: FC<IButtonProps> = ({ text, onClick = () => {} }) => (
  <button type="button" className={classes.Button} onClick={onClick}>
    {text}
  </button>
);

export default Button;
