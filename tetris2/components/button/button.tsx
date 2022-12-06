import React from 'react';

import style from './button.module.scss';

const ButtonBase = ({ children }: { children: string }) => (
  <button className={style.btn} type="button">
    {children}
  </button>
);

const withTheme1 = (Button: React.ElementType) => (props: { theme: string }) => {
  if (props.theme === 'play') {
    return (
      <div className={style.play}>
        <Button {...props} className={style.play} />
      </div>
    );
  }

  return <Button {...props} />;
};

const withTheme2 = (Button: React.ElementType) => (props: { theme: string }) => {
  if (props.theme === 'score') {
    return (
      <div className={style.score}>
        <Button {...props} />
      </div>
    );
  }

  return <Button {...props} />;
};

const withTheme3 = (Button: React.ElementType) => (props: { theme: string }) => {
  if (props.theme === 'back') {
    return (
      <div className={style.back}>
        <Button {...props} />
      </div>
    );
  }

  return <Button {...props} />;
};

const withTheme4 = (Button: React.ElementType) => (props: { theme: string }) => {
  if (props.theme === 'restart') {
    return (
      <div className={style.restart}>
        <Button {...props} />
      </div>
    );
  }

  return <Button {...props} />;
};

const withTheme5 = (Button: React.ElementType) => (props: { theme: string }) => {
  if (props.theme === 'exit') {
    return (
      <div className={style.exit}>
        <Button {...props} />
      </div>
    );
  }

  return <Button {...props} />;
};

const withTheme7 = (Button: React.ElementType) => (props: { theme: string }) => {
  if (props.theme === 'settings') {
    return (
      <div className={style.settings}>
        <Button {...props} />
      </div>
    );
  }

  return <Button {...props} />;
};

const withTheme8 = (Button: React.ElementType) => (props: { theme: string }) => {
  if (props.theme === 'backToMenu') {
    return (
      <div className={style.backToMenu}>
        <Button {...props} />
      </div>
    );
  }

  return <Button {...props} />;
};

console.log('check');
// ф-я для оборачивания компонента в несколько HOC
const compose =
  (...hocs: any[]) =>
  (BaseComponent: React.ElementType) =>
    hocs.reduce((Component, nextHOC) => nextHOC(Component), BaseComponent);

// собираем кнопку, передав нужный набор тем
const Button = compose(
  withTheme1,
  withTheme2,
  withTheme3,
  withTheme4,
  withTheme5,
  withTheme7,
  withTheme8,
)(ButtonBase);

export default Button;
