import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Card from '../card/Card';
import { getRandomPhotos } from '../../unsplashServiсe';
import { RootState } from '../../../store';
import ModalDialog from '../modalWindow/ModalWindow';
import styles from '../../styles/index.module.scss';

const Board = () => {
  const [photos, setPhotos] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [guesses, setGuesses] = useState(0);
  const [matches, setMatches] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [firstCard, setFirstCard] = useState({ id: '', index: null });
  const [secondCard, setSecondCard] = useState({ id: '', index: null });
  const [count, setCount] = useState(0);

  const { theme } = useSelector((store: RootState) => store.memoryCards);

  const saveJumbledPhotos = () => {
    getRandomPhotos(theme, 6).then((res) => {
      setPhotos(() => [...res, ...res].sort(() => Math.random() - 0.5));
    });
  };

  useEffect(() => {
    saveJumbledPhotos();
  }, []);

  const resetBoard = () => {
    setFirstCard({ id: '', index: null });
    setSecondCard({ id: '', index: null });
    setCount(0);
  };

  const unflipCards = () => {
    setTimeout(() => {
      setOpenCards(openCards.slice(0, -2));
      resetBoard();
    }, 800);
  };

  const checkForMatch = () => {
    if (firstCard.id === secondCard.id) {
      setMatches(matches + 1);
      resetBoard();
      return;
    }
    unflipCards();
  };

  useEffect(() => {
    if (secondCard.id) {
      checkForMatch();
      setGuesses(guesses + 1);
      setPercentage(guesses !== 0 ? Math.round((matches * 100) / guesses) : 0);
    }
  }, [secondCard]);

  const cardClickHandler = (id: string, index: number) => {
    if (firstCard.index === index) return;
    if (matches >= 6) return;
    setOpenCards((state) => [...state, index]);
    if (count === 0) {
      setFirstCard({ id, index });
      setCount((count) => count + 1);
      return;
    }
    setSecondCard({ id, index });
    setCount((count) => count + 1);
  };

  const reset = () => {
    saveJumbledPhotos();
    setOpenCards([]);
    setGuesses(0);
    setMatches(0);
    setPercentage(0);
    resetBoard();
  };

  const modal = matches === 6 ? <ModalDialog reset={reset} /> : null;

  return (
    <>
      {modal}
      <div className={styles.board}>
        {photos.map((photo, i) => (
          <Card
            cardClickHandler={cardClickHandler}
            photo={photo}
            key={i}
            index={i}
            isActive={openCards.some((index) => index === i)}
          />
        ))}
        <p>Guesses: {guesses}</p>
        <p>Matches: {matches}</p>
        <p>Percent: {percentage}%</p>
        <p>Open cards!</p>
      </div>
      <button className={styles.button} type="button" onClick={reset}>
        Reset
      </button>
    </>
  );
};

export default Board;
