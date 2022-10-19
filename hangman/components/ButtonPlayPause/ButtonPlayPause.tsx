import { FC } from 'react';
import Image from 'next/image';

import styles from '../../styles/ButtonPlayPause.module.scss';

import PlayImg from './play.svg';
import PauseImg from './pause.svg';

const Pause: FC = () => <Image className={styles.pause} src={PauseImg} alt="пауза" />;
const Play: FC = () => <Image className={styles.play} src={PlayImg} alt="играть" />;

type ButtonProps = {
  play: boolean;
};

const Button: FC<ButtonProps> = ({ play }) => (
  <button className={styles.button} type="button" aria-label="Кнопка паузы">
    {play === true ? <Pause /> : <Play />}
  </button>
);

export { Button as ButtonPlayPause };
