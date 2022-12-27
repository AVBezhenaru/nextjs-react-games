import { useEffect, useState } from 'react';

import { useAppSelector } from '../../../hooks';
import { TypeCardFull } from '../../types';
import shirt from '../../images/cards/shirts/black.png';
import { Rules } from '../Rules/Rules';

import { Kard } from './Kard/Kard';
import { HeaderGame, SectionGame, BodyGame, Stack } from './GameMainStyle';

export const GameMain = () => {
  const { sortCards, cards } = useAppSelector((state) => state.solitaire);
  const [gameCards, setGameCards] = useState<TypeCardFull[]>(sortCards);
  const [cardsOut, setCardsOut] = useState<TypeCardFull[]>([]);
  const [helperCards, setHelperCards] = useState<TypeCardFull[]>([]);
  const [countFor, setCountFor] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [onRules, setOnRules] = useState(false);
  const [dragItem, setDragItem] = useState({});
  const [dragOver, setDragOver] = useState(0);
  const [resultStack, setResultStack] = useState({
    hearts: [],
    diamonds: [],
    clubs: [],
    spades: [],
  });

  const changeRandomCards = () => {
    setIsReady(false);
    setCardsOut([]);
    setHelperCards([]);
    const newArr = [...cards].sort(() => Math.random() - 0.5);
    newArr.map((item) => {
      item.open = false;
      return item;
    });
    setGameCards(newArr);
    setCountFor(1);
    console.log(gameCards);
  };

  const changeHelperCards = () => {
    const arr = [...helperCards];
    if (gameCards.length === 0) {
      arr.map((item) => {
        item.open = false;
        return item;
      });
      setGameCards(arr.reverse());
      setHelperCards([]);
    } else {
      const el = gameCards[gameCards.length - 1];
      el.open = true;
      arr.push(el);

      setHelperCards(arr);
      setGameCards(gameCards.slice(0, -1));
    }
  };

  const closeRules = () => {
    setOnRules(false);
  };
  const openRules = () => {
    setOnRules(true);
  };

  const getRandomCards = (data: TypeCardFull[], num: number) => {
    const outArr = [...cardsOut];
    outArr.push(
      data.filter((item: TypeCardFull, index: number) => {
        if (index >= data.length - num) {
          return item;
        }
      }),
    );
    const newArr = data.filter((item, index) => {
      if (index < data.length - num) {
        return item;
      }
    });
    setGameCards(newArr);
    setCardsOut(outArr);
  };

  const dragStartHandler = (e: DragEvent, item: object, idStack) => {
    if (idStack === 8) {
      setDragItem({ items: [item], idStack });
    } else {
      const index = cardsOut[idStack].indexOf(item);
      console.log('index: ', index);
      const items = [...cardsOut[idStack]].splice(index);
      setDragItem({ items: [...items], idStack });
    }

    console.log('start', dragItem.items);
  };

  const dragEndHandler = (e: DragEvent) => {};
  const dragLeaveHandler = (e: DragEvent, num) => {
    // console.log(e.target.id, num);
  };

  const dragOverHandler = (e: DragEvent, index) => {
    e.preventDefault();
    if (index !== dragOver) {
      setDragOver(index);
      console.log(dragOver);
    }
  };

  const dropHandler = (e: DragEvent, items, idStack) => {
    e.preventDefault();
    console.log(dragOver);

    const prev = cardsOut[idStack][cardsOut[idStack].length - 1];

    if (prev.color !== items.items[0].color && prev.nameCard === items.items[0].nameCard + 1) {
      const newCardsOut = cardsOut.map((arr, index) => {
        if (index === idStack) {
          arr = [...arr, ...items.items];
        }
        if (index === items.idStack) {
          const count = items.items.length;
          arr = arr.slice(0, arr.length - count);
        }
        return arr;
      });

      if (items.idStack === 8) {
        setHelperCards(helperCards.slice(0, helperCards.length - 1));
      }

      setCardsOut(newCardsOut);
    }
  };

  const onContextMenu = (item) => {
    if (item.name === 1) {
      const newStack = { ...resultStack };
      newStack[item.suit] = [item];
      setResultStack(newStack);
    }
    console.log(newStack);
  };

  useEffect(() => {
    if (countFor < 8) {
      getRandomCards(gameCards, countFor);
      setCountFor(countFor + 1);
    }
    if (countFor === 8) {
      setIsReady(true);
    }
    console.log(countFor, ' useEffect');
  }, [countFor, isReady]);

  return (
    <SectionGame>
      <HeaderGame>
        <button type="button" onClick={openRules}>
          Правила
        </button>
        <button type="button" onClick={changeRandomCards}>
          Новая игра
        </button>
        <span>
          Лучший счет<span>0</span>
        </span>
        <span>
          Текущий счет<span>0</span>
        </span>
        <span>
          Сделано ходов<span>0</span>
        </span>
      </HeaderGame>
      <BodyGame>
        {onRules && <Rules fn={closeRules} />}
        <Stack id="bank" onClick={changeHelperCards}>
          {isReady &&
            gameCards.map((item) => (
              <Kard
                img={item.open ? item.img : shirt.src}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable={false}
              />
            ))}
        </Stack>
        <Stack id="helper">
          {helperCards.length > 0 &&
            helperCards.map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
                onDoubleClick={() => onContextMenu(item)}
              />
            ))}
        </Stack>
        <Stack id="hearts" onDragOver={(e) => dragEndHandler(e, 11)}>
          {resultStack.hearts.length > 0 &&
            resultStack.hearts.map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
              />
            ))}
        </Stack>
        <Stack id="diamonds" onDragOver={(e) => dragEndHandler(e, 12)}>
          {resultStack.diamonds.length > 0 &&
            resultStack.diamonds.map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
              />
            ))}
        </Stack>
        <Stack id="clubs" onDragOver={(e) => dragEndHandler(e, 13)}>
          {resultStack.clubs.length > 0 &&
            resultStack.clubs.map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
              />
            ))}
        </Stack>
        <Stack id="spades" onDragOver={(e) => dragEndHandler(e, 14)}>
          {resultStack.spades.length > 0 &&
            resultStack.spades.map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
              />
            ))}
        </Stack>
      </BodyGame>
      <BodyGame>
        <Stack id="0">
          {isReady &&
            cardsOut[0].map((item, index) => {
              if (index === cardsOut[0].length - 1) {
                cardsOut[0][index].open = true;
              }
              return (
                <Kard
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 0)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, dragItem, 0)}
                  onDragOver={(e) => dragOverHandler(e, 0)}
                  onDoubleClick={() => onContextMenu(item)}
                />
              );
            })}
        </Stack>
        <Stack id="1" onDragOver={(e) => dragOverHandler(e, 1)}>
          {isReady &&
            cardsOut[1].map((item, index) => {
              if (index === cardsOut[1].length - 1) {
                cardsOut[1][index].open = true;
              }
              return (
                <Kard
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 1)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, dragItem, 1)}
                  onDoubleClick={() => onContextMenu(item)}
                />
              );
            })}
        </Stack>
        <Stack id="2" onDragOver={(e) => dragOverHandler(e, 2)}>
          {isReady &&
            cardsOut[2].map((item, index) => {
              if (index === cardsOut[2].length - 1) {
                cardsOut[2][index].open = true;
              }
              return (
                <Kard
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 2)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, dragItem, 2)}
                  onDoubleClick={() => onContextMenu(item)}
                />
              );
            })}
        </Stack>
        <Stack id="3" onDragOver={(e) => dragOverHandler(e, 3)}>
          {isReady &&
            cardsOut[3].map((item, index) => {
              if (index === cardsOut[3].length - 1) {
                cardsOut[3][index].open = true;
              }
              return (
                <Kard
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 3)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, dragItem, 3)}
                  onDoubleClick={() => onContextMenu(item)}
                />
              );
            })}
        </Stack>
        <Stack id="4" onDragOver={(e) => dragOverHandler(e, 4)}>
          {isReady &&
            cardsOut[4].map((item, index) => {
              if (index === cardsOut[4].length - 1) {
                cardsOut[4][index].open = true;
              }
              return (
                <Kard
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 4)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, dragItem, 4)}
                  onDoubleClick={() => onContextMenu(item)}
                />
              );
            })}
        </Stack>
        <Stack id="5" onDragOver={(e) => dragOverHandler(e, 5)}>
          {isReady &&
            cardsOut[5].map((item, index) => {
              if (index === cardsOut[5].length - 1) {
                cardsOut[5][index].open = true;
              }
              return (
                <Kard
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 5)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, dragItem, 5)}
                  onDoubleClick={() => onContextMenu(item)}
                />
              );
            })}
        </Stack>
        <Stack id="6" onDragOver={(e) => dragOverHandler(e, 6)}>
          {isReady &&
            cardsOut[6].map((item, index) => {
              if (index === cardsOut[6].length - 1) {
                cardsOut[6][index].open = true;
              }
              return (
                <Kard
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 6)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, dragItem, 6)}
                  onDoubleClick={() => onContextMenu(item)}
                />
              );
            })}
        </Stack>
      </BodyGame>
    </SectionGame>
  );
};
