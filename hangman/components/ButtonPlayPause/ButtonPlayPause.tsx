import { FC } from 'react';

import styles from '../../styles/ButtonPlayPause.module.scss';

import PlayImg from './play.svg';
import PauseImg from './pause.svg';

const Pause: FC = () => <img className={styles.pause} src={PauseImg} alt="пауза" />;
const Play: FC = () => <img className={styles.play} src={PlayImg} alt="играть" />;

type ButtonProps = {
  play: boolean;
};

const Button: FC<ButtonProps> = ({ play }) => (
  <button className={styles.button} type="button" aria-label="Кнопка паузы">
    {play === true ? <Pause /> : <Play />}
  </button>
);

export { Button as ButtonPlayPause };
