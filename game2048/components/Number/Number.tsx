import styles from '../Number/Number.module.scss';
import { useAppSelector } from '../../../hooks';

const Number = (props?: { number: number }) => {
  const { numberColor } = useAppSelector((state) => state.game2048);

  function setOpacity(number: number) {
    if (number > 8000) {
      return 100;
    } else if (number === 4096) {
      return 95;
    } else if (number === 2048) {
      return 90;
    } else if (number === 1024) {
      return 85;
    } else if (number === 512) {
      return 80;
    } else if (number === 256) {
      return 75;
    } else if (number === 128) {
      return 70;
    } else if (number === 64) {
      return 65;
    } else if (number === 32) {
      return 60;
    } else if (number === 16) {
      return 55;
    } else if (number === 8) {
      return 45;
    } else if (number === 4) {
      return 40;
    } else if (number === 2) {
      return 30;
    }
  }
  function setColor(number: number) {
    if (number > 130) {
      return 'white';
    } else {
      return 'black';
    }
  }

  return (
    <div
      className={styles.number}
      style={{
        backgroundColor: `rgba(${[...numberColor]}, ${setOpacity(props.number)}%)`,
        color: `${setColor(props.number)}`,
      }}
    >
      {props.number}
    </div>
  );
};

export default Number;
