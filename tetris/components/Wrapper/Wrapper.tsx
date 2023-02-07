import { BaseSyntheticEvent, FC, useEffect, useRef } from "react";
import classes from './Wrapper.module.scss';

interface IWrapperProps {
  children: JSX.Element,
  onKeyDown?: (e: BaseSyntheticEvent) => void,
}

const Wrapper: FC<IWrapperProps> = ({ children, onKeyDown }) => {
  const wrapper = useRef(null);

  useEffect(() => {
    if (onKeyDown && wrapper.current) {
      wrapper.current.focus();
    }
  }, [onKeyDown]);

  return (
    <div className={classes.Wrapper} onKeyDown={onKeyDown} tabIndex={0} ref={wrapper}>
      {children}
    </div>
  );
}

export default Wrapper;
