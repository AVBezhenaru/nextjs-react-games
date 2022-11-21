import React, { FC } from 'react';
import Link from 'next/link';

interface PlayConditional {
  colorCheckers?: string;

  bid?: number;
}
interface UserProps {
  name?: string;
  playConditional?: PlayConditional;
}

const Lobbi: FC<UserProps> = () => {
  const players = [
    { name: 'Вася', playConditional: { colorCheckers: 'белая', bid: 100 } },
    { name: 'Андрей', playConditional: { colorCheckers: 'черная', bid: 1000 } },
    { name: 'Катя', playConditional: { colorCheckers: 'белая', bid: 500 } },
    { name: 'Алина', playConditional: { colorCheckers: 'черная', bid: 100 } },
    { name: 'Жора', playConditional: { colorCheckers: 'черная', bid: 100 } },
  ];
  if (typeof window !== 'undefined') {
    players.map((el) => localStorage.setItem(el.name, JSON.stringify(el)));
  }
  const getUsersFromLocalStorage = () => {
    const usersFromLocalStorage: UserProps[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (typeof key === 'string') {
        usersFromLocalStorage.push(JSON.parse(localStorage.getItem(key) || '{}'));
      }
    }
    return usersFromLocalStorage;
  };

  return (
    <div>
      <div className="lobbi-container">
        {getUsersFromLocalStorage().map((el, index) => (
          <div className="lobbi-label">
            <input type="checkbox" />
            <span className="lobbi-span" key={index}>
              {el.name} {el.playConditional?.bid} {el.playConditional?.colorCheckers}
            </span>
          </div>
        ))}
      </div>
      <Link href="../../../checkers/Home">
        <span className="lobbiCreckers__modal-button">Играть</span>
      </Link>
    </div>
  );
};

export default Lobbi;
