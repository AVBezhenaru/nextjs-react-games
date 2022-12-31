import Image from "next/image";
import { FC } from "react";
import classes from './SettingsButton.module.scss';
import gearLogo from '../../../images/gear-svgrepo-com.svg';

const SettingsButton: FC = () => {

  return (
    <button className={classes.SettingsButton}>
      <Image src={gearLogo} />
    </button>
  );
}

export default SettingsButton;
