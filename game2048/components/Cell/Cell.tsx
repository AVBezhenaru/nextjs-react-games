import styles from '../Cell/Cell.module.scss';
import Number from '../Number/Number';

const Cell = (props?: { number: number }) => {
  return (
    <div className={styles.cell}>{props.number ? <Number number={props.number} /> : null}</div>
  );
};

export default Cell;
