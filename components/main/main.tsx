import Link from 'next/link';

import style from './main.module.scss';

const Main = () => (
  <div className={style.container}>
    <h1 className={style.title}>Welcome</h1>
    <p className={style.text}>
      Go to{' '}
      <Link href="/login">
        <a className={style.link}>login</a>
      </Link>{' '}
      or{' '}
      <Link href="/registration">
        <a className={style.link}>registration</a>
      </Link>
    </p>
  </div>
);

export default Main;
