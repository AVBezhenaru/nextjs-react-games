import React from 'react';
import Link from 'next/link';

import styles from './MainPage.module.scss';

const MainPage = () => (
    <div className={styles.wrapper}>
        <div className={styles.info}>
            Zuma Revenge
        </div>
        <button className={styles.button}></button>
    </div>
);

export default MainPage;
