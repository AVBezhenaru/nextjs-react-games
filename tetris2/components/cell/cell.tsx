import { CellIntrAttrType } from '../../types/types';

import style from './cell.module.scss';

function Cell({ type }: CellIntrAttrType) {
  return (
    <div
      className={style.grid_item}
      style={
        type === 1 ? { backgroundColor: 'rgba(190, 80, 120)' } : { backgroundColor: 'transparent' }
      }
    />
  );
}

export default Cell;
