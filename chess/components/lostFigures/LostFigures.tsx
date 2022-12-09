import { FC } from 'react';
import Image from 'next/image';

import { Figure } from '../../models/figures/Figure';

import styles from './lostFigures.module.scss';

interface LostFiguresProps {
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ figures }) => (
  <div className={styles['lost-figure']}>
    {figures.map((figure) => (
      <span className={styles['lost-figure__wrapper']} key={figure.id}>
        {figure?.logo && (
          <Image
            width="30"
            height="30"
            className="lost-figure__img"
            src={figure.logo}
            alt="figureLogo"
          />
        )}
      </span>
    ))}
  </div>
);

export default LostFigures;
