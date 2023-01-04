import { DragEvent, MouseEvent, useEffect, useState } from 'react';

import { useAppSelector } from '../../../hooks';
import { TypeCardFull } from '../../types';
import shirt from '../../images/cards/shirts/black.png';
import { Rules } from '../Rules/Rules';

import { Win } from './Win/Win';
import { Header } from './Header/Header';
import { Kard } from './Kard/Kard';
import { SectionGame, BodyGame, Stack } from './GameMainStyle';

type TypeResultStack = {
  [key: number]: TypeCardFull[];
};
type TypeDragItem = {
  items: TypeCardFull[];
  idStack: number;
};

export const GameMain = () => {
  const { sortCards, cards } = useAppSelector((state) => state.solitaire);
  const [gameCards, setGameCards] = useState<TypeCardFull[]>(sortCards);
  const [cardsOut, setCardsOut] = useState<TypeCardFull[][]>([]);
  const [helperCards, setHelperCards] = useState<TypeCardFull[]>([]);
  const [countFor, setCountFor] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [onRules, setOnRules] = useState(false);
  const [dragItem, setDragItem] = useState<TypeDragItem>();
  const [dragOver, setDragOver] = useState<number>();
  const [moveCounter, setMoveCounter] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [resultStack, setResultStack] = useState<TypeResultStack>({
    14: [],
    15: [],
    16: [],
    17: [],
  });

  const changeRandomCards = () => {
    setMoveCounter(0);
    setIsReady(false);
    setCardsOut([]);
    setHelperCards([]);
    setResultStack({
      14: [],
      15: [],
      16: [],
      17: [],
    });
    setIsWin(false);
    const newArr = [...cards].sort(() => Math.random() - 0.5);
    newArr.map((item) => {
      item.open = false;
      return item;
    });
    setGameCards(newArr);
    setCountFor(1);
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
    setMoveCounter(moveCounter + 1);
  };

  const closeRules = () => {
    setOnRules(false);
  };
  const openRules = () => {
    setOnRules(true);
  };

  const getRandomCards = (data: TypeCardFull[], num: number) => {
    const arr = [...data].filter((_, index) => index >= data.length - num);
    const outArr = [...cardsOut, arr];
    const newArr = data.filter((_, index) => index < data.length - num);
    setGameCards(newArr);
    setCardsOut(outArr);
  };

  const dragStartHandler = (e: DragEvent<Element>, item: TypeCardFull, idStack: number) => {
    if (idStack === 8) {
      setDragItem({ items: [item], idStack });
    } else {
      const index = cardsOut[idStack].indexOf(item);
      const items = [...cardsOut[idStack]].splice(index);
      setDragItem({ items: [...items], idStack });
    }
  };

  const dragEndHandler = (
    e: DragEvent,
    index: number,
    items: { items: TypeCardFull[]; idStack: number | string },
  ) => {
    if (index <= 13) {
      if (cardsOut[index].length === 0 && items.items[0].nameCard === 13) {
        const newArr = cardsOut.map((arr, i) => {
          if (i === index) {
            arr = [...arr, ...items.items];
          }
          if (i === items.idStack) {
            const count = items.items.length;
            arr = arr.slice(0, arr.length - count);
          }
          return arr;
        });
        if (items.idStack === 8) {
          setHelperCards([...helperCards].slice(0, helperCards.length - 1));
        }
        setCardsOut(newArr);
      }
      setMoveCounter(moveCounter + 1);
    }

    if (index > 13 && items.items[0].nameCard === 1) {
      const newResult = { ...resultStack };
      newResult[index] = items.items;
      setResultStack(newResult);
      const newArr = cardsOut.map((arr, i) => {
        if (i === index) {
          arr = [...arr, ...items.items];
        }
        if (i === items.idStack) {
          const count = items.items.length;
          arr = arr.slice(0, arr.length - count);
        }
        return arr;
      });
      if (items.idStack === 8) {
        setHelperCards([...helperCards].slice(0, helperCards.length - 1));
      }
      setCardsOut(newArr);
      setMoveCounter(moveCounter + 1);
    }
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (dragOver !== index) {
      setDragOver(index);
    }
  };

  const dropHandler = (
    e: DragEvent<Element>,
    items: { items: TypeCardFull[]; idStack: number },
    idStack: number,
  ) => {
    e.preventDefault();

    if (idStack < 14) {
      const prev = cardsOut[idStack][cardsOut[idStack].length - 1];
      if (prev.color !== items.items[0].color && prev.nameCard === items.items[0].nameCard + 1) {
        const newCardsOut = cardsOut.map((arr, i) => {
          if (i === idStack) {
            arr = [...arr, ...items.items];
          }
          if (i === items.idStack) {
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
      setMoveCounter(moveCounter + 1);
    }
    if (idStack >= 14) {
      const prev = resultStack[idStack][resultStack[idStack].length - 1];

      if (prev.suit === items.items[0].suit && prev.nameCard === items.items[0].nameCard - 1) {
        const newCardsOut = cardsOut.map((arr, i) => {
          if (i === items.idStack) {
            const count = items.items.length;
            arr = arr.slice(0, arr.length - count);
          }
          return arr;
        });

        setCardsOut(newCardsOut);
        const newResult = { ...resultStack };
        newResult[idStack] = [...newResult[idStack], ...items.items];
        setResultStack(newResult);
        if (items.idStack === 8) {
          setHelperCards(helperCards.slice(0, helperCards.length - 1));
        }
      }
      setMoveCounter(moveCounter + 1);
    }
  };

  const putInResultStack = (e: MouseEvent, item: TypeCardFull, idStack: number) => {
    e.preventDefault();
    let idResult;
    if (resultStack[14][0].suit === item.suit) {
      idResult = 14;
    }
    if (resultStack[15][0].suit === item.suit) {
      idResult = 15;
    }
    if (resultStack[16][0].suit === item.suit) {
      idResult = 16;
    }
    if (resultStack[17][0].suit === item.suit) {
      idResult = 17;
    }

    const prev = resultStack[idResult][resultStack[idResult].length - 1];

    if (prev.nameCard === item.nameCard - 1) {
      if (idStack === 8) {
        setHelperCards(helperCards.slice(0, helperCards.length - 1));
      } else {
        const newCardsOut = cardsOut.map((arr, i) => {
          if (i === idStack) {
            arr = arr.slice(0, arr.length - 1);
          }
          return arr;
        });
        setCardsOut(newCardsOut);
      }

      const newResult = { ...resultStack };
      newResult[idResult] = [...newResult[idResult], item];
      setResultStack(newResult);
    }
    setMoveCounter(moveCounter + 1);
  };

  useEffect(() => {
    if (
      resultStack[14].length === 13 &&
      resultStack[15].length === 13 &&
      resultStack[16].length === 13 &&
      resultStack[17].length === 13
    ) {
      setIsWin(true);
    }
  }, [resultStack]);

  useEffect(() => {
    if (countFor < 8) {
      getRandomCards(gameCards, countFor);
      setCountFor(countFor + 1);
    }
    if (countFor === 8) {
      setIsReady(true);
    }
  }, [countFor, isReady]);

  return (
    <SectionGame>
      <Header rules={openRules} newGame={changeRandomCards} moveCounter={moveCounter} />
      <BodyGame>
        {onRules && <Rules fn={closeRules} />}
        {isWin && <Win newGame={changeRandomCards} />}
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
                onDragEnd={(e) => dragEndHandler(e, dragOver, dragItem)}
                onDoubleClick={(e) => putInResultStack(e, item, 8)}
              />
            ))}
        </Stack>
        <Stack id="14" onDragOver={(e) => dragOverHandler(e, 14)}>
          {resultStack['14'].length > 0 &&
            resultStack['14'].map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
                onDrop={(e) => dropHandler(e, dragItem, 14)}
              />
            ))}
        </Stack>
        <Stack id="15" onDragOver={(e) => dragOverHandler(e, 15)}>
          {resultStack['15'].length > 0 &&
            resultStack['15'].map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
                onDrop={(e) => dropHandler(e, dragItem, 15)}
              />
            ))}
        </Stack>
        <Stack id="16" onDragOver={(e) => dragOverHandler(e, 16)}>
          {resultStack['16'].length > 0 &&
            resultStack['16'].map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
                onDrop={(e) => dropHandler(e, dragItem, 16)}
              />
            ))}
        </Stack>
        <Stack id="17" onDragOver={(e) => dragOverHandler(e, 17)}>
          {resultStack['17'].length > 0 &&
            resultStack['17'].map((item) => (
              <Kard
                img={item.img}
                name={item.nameCard}
                position="stack"
                key={item.id}
                draggable
                onDragStart={(e) => dragStartHandler(e, item, 8)}
                onDrop={(e) => dropHandler(e, dragItem, 17)}
              />
            ))}
        </Stack>
      </BodyGame>
      <BodyGame>
        <Stack id="0" onDragOver={(e) => dragOverHandler(e, 0)}>
          {isReady &&
            cardsOut[0].map((item, index) => {
              if (index === cardsOut[0].length - 1) {
                cardsOut[0][index].open = true;
              }
              return (
                <Kard
                  first={index === 0}
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 0)}
                  onDragEnd={(e) => dragEndHandler(e, dragOver, dragItem)}
                  onDrop={(e) => dropHandler(e, dragItem, 0)}
                  onDoubleClick={(e) => putInResultStack(e, item, 0)}
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
                  first={index === 0}
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 1)}
                  onDragEnd={(e) => dragEndHandler(e, dragOver, dragItem)}
                  onDrop={(e) => dropHandler(e, dragItem, 1)}
                  onDoubleClick={(e) => putInResultStack(e, item, 1)}
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
                  first={index === 0}
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 2)}
                  onDragEnd={(e) => dragEndHandler(e, dragOver, dragItem)}
                  onDrop={(e) => dropHandler(e, dragItem, 2)}
                  onDoubleClick={(e) => putInResultStack(e, item, 2)}
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
                  first={index === 0}
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 3)}
                  onDragEnd={(e) => dragEndHandler(e, dragOver, dragItem)}
                  onDrop={(e) => dropHandler(e, dragItem, 3)}
                  onDoubleClick={(e) => putInResultStack(e, item, 3)}
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
                  first={index === 0}
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 4)}
                  onDragEnd={(e) => dragEndHandler(e, dragOver, dragItem)}
                  onDrop={(e) => dropHandler(e, dragItem, 4)}
                  onDoubleClick={(e) => putInResultStack(e, item, 4)}
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
                  first={index === 0}
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 5)}
                  onDragEnd={(e) => dragEndHandler(e, dragOver, dragItem)}
                  onDrop={(e) => dropHandler(e, dragItem, 5)}
                  onDoubleClick={(e) => putInResultStack(e, item, 5)}
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
                  first={index === 0}
                  img={item.open ? item.img : shirt.src}
                  name={item.nameCard}
                  position="bottom"
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStartHandler(e, item, 6)}
                  onDragEnd={(e) => dragEndHandler(e, dragOver, dragItem)}
                  onDrop={(e) => dropHandler(e, dragItem, 6)}
                  onDoubleClick={(e) => putInResultStack(e, item, 6)}
                />
              );
            })}
        </Stack>
      </BodyGame>
    </SectionGame>
  );
};
