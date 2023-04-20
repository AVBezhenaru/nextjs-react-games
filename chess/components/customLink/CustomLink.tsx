import Link from 'next/link';
import { useDispatch } from 'react-redux';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

import { openModal, setOffline } from '../../dataSlice/DataSlice';

import styles from './CustomLink.module.scss';

interface PropsCustomLinkInterface {
  text: string;
}
const CustomLink: FC<PropsCustomLinkInterface> = ({ text }) => {
  const dispatch = useDispatch();
  const router = useRouter().pathname;
  const checkLink = router.split('/');

  return (
    <Link href={checkLink[checkLink.length - 1] === 'lobby' ? '../chess' : '/chess'}>
      <button
        type="submit"
        onClick={() => {
          dispatch(openModal());
          dispatch(setOffline());
        }}
      >
        <span className={styles.text}>{text}</span>
      </button>
    </Link>
  );
};
export default CustomLink;
