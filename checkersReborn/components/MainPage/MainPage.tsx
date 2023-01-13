import Link from 'next/link';
import { FC } from 'react';

import classes from './MainPage.module.scss';

const MainPage: FC = () => (
  <div className={classes.MainPage}>
    <h2 className={classes.MainPageTitle}>Добро пожаловать в игру</h2>
    <h1 className={classes.MainPageGameTitle}>Шашки</h1>
    <div className={classes.ButtonsContainer}>
      <Link href="./checkersReborn/online">
        <span className={classes.MainPageButton}>Играть онлайн</span>
      </Link>
      <Link href="./checkersReborn/single">
        <span className={classes.MainPageButton}>Играть с ботом</span>
      </Link>
    </div>
  </div>
);

export default MainPage;
