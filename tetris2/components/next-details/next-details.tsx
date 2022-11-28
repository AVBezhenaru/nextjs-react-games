import { useAppSelector } from '../../../hooks';
import Cell from '../cell/cell';

import styles from './next-details.module.scss';

function NextDetails() {
  const nextDetailStage = useAppSelector((state) => state.tetris.nextDetailStage);
  return (
    <div className={styles.grid}>
      {nextDetailStage.map((row: number[]) =>
        row.map((cell: any, idx: number) => <Cell key={idx} type={cell} />),
      )}
    </div>
  );
}

export default NextDetails;
