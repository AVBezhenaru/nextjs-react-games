import React, { ChangeEvent, FC } from 'react';

import primary from '../../Img/primary.svg';

import it from './Input.module.scss';

interface InputProps {
  setFilter: (filter: string) => void;
}

const Input: FC<InputProps> = ({ setFilter }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <input
        className={it.input}
        style={{
          backgroundImage: `url(${primary.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '10px',
        }}
        type="text"
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default Input;
