import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from '../../styles/index.module.scss';
import background from '../../images/background.jpg';

type Props = {
  photoId: {
    id: string;
    urls: {
      small: string;
    };
  };
  cardClickHandler: (id: string, index: number) => void;
  isActive: boolean;
  index: number;
};

const Card: React.FunctionComponent<Props> = ({ photoId, cardClickHandler, isActive, index }) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <div
      className={!active ? styles.card : styles.openCard}
      onClick={() => cardClickHandler(photoId.id, index)}
    >
      <Image
        height={200}
        width={280}
        src={!active ? background : photoId.urls.small}
        className={styles.image}
      />
    </div>
  );
};

export default Card;
