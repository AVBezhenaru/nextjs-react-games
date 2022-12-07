import Link from 'next/link';
import { useDispatch } from 'react-redux';

import React, { FC } from 'react';

import { openModal, setOffline } from '../../store/DataSlice';

import styles from './CustomLink.module.scss';

interface PropsCustomLinkInterface {
  text: string;
}
const CustomLink: FC<PropsCustomLinkInterface> = ({ text }) => {
  const dispatch = useDispatch();

  return (
    <Link href="/chess">
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
