import Link from 'next/link';
import { useDispatch } from 'react-redux';

import React from 'react';

import { useAppSelector } from '../../../../hooks';
import {
  openModal,
  setDataForCurrentPlayer,
  setDataForRival,
  setOffline,
} from '../../store/DataSlice';

import styles from './ListPlayers.module.scss';

const ListPlayers = () => {
  const players = useAppSelector((state) => state.rootSlice.listPlayers);
  const current = useAppSelector((state) => state.rootSlice.currentPlayer);

  const dispatch = useDispatch();
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {players.map((item) => (
          <div>
            <li className={styles['list-item']}>
              <h3 className={styles['player-name']}>имя: {item?.label?.name}</h3>
              <p className={styles['player-name']}>ставка: {item?.label?.bid}</p>
              <span className={styles['player-color']}>цвет шахмат: {item?.label?.colors}</span>
            </li>
            <span>
              <Link href="/chess/game">
                <button
                  onClick={() => {
                    dispatch(setDataForRival(item));
                    dispatch(
                      setDataForCurrentPlayer({
                        label: {
                          bid: item?.label?.bid,
                          name: current?.label?.name,
                          colors:
                            current?.label?.colors && item.label.colors === 'белые'
                              ? 'черные'
                              : 'белые',
                          mode: current?.label?.mode,
                        },
                      }),
                    );
                  }}
                  className={styles.button}
                  type="submit"
                >
                  Выбрать соперника
                </button>
              </Link>
            </span>
          </div>
        ))}
        <li className={styles['list-item']}>
          <h3 className={styles['player-name']}>имя: {current?.label?.name}</h3>
          <p className={styles['player-name']}>ставка: {current?.label?.bid}</p>
          <span className={styles['player-color']}>цвет шахмат: {current?.label?.colors}</span>
          <button
            onClick={() => {
              dispatch(openModal());
              dispatch(setOffline());
            }}
            className={styles.button}
            type="submit"
          >
            Отменить
          </button>
        </li>
      </ul>
    </section>
  );
};

export default ListPlayers;
