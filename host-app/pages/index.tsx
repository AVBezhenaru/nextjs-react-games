import { FC } from 'react'
import Main from "../components/main";
import style from '../styles/main.module.scss';

import Link from 'next/link';
// import dynamic from 'next/dynamic';
// const Page = dynamic(
//   async () => {
//     return import('../async-pages/index');
//   },
//   {
//     ssr: false,
//   },
// );

const Home:FC = () => {
  return <Main/>

}

export default Home;