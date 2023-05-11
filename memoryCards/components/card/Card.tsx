import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from '../../styles/index.module.scss';
import background from '../../images/background.jpg';

type Props = {
  photo: {
    id: string;
    urls: {
      small: string;
    };
  };
  cardClickHandler: (id: string, index: number) => void;
  isActive: boolean;
  index: number;
};

const Card: React.FC<Props> = ({ photo, cardClickHandler, isActive, index }) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(() => isActive);
  }, [isActive]);

  return (
    <div
      className={!active ? styles.card : styles.openCard}
      onClick={() => cardClickHandler(photo.id, index)}
    >
      <Image
        height={200}
        width={280}
        src={!active ? background : photo.urls.small}
        className={styles.image}
      />
    </div>
  );
};

export default Card;
