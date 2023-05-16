import { useState } from 'react';

import Tamagotchi from '../game/tamagotchi';
import Egg from '../dragon/egg';

import classes from './lobby.module.scss';

const Lobby = () => {
  const [isReadyToPlay, getPlay] = useState(false);

  const getPlayToggle = () => {
    setTimeout(() => getPlay(true), 3000);
  };

  const Rules = (
    <div className={classes.rules}>
      <h3 className={classes.rulesTitle}>
        Ты нашел яйцо настоящего дракона, теперь это твой питомец.
      </h3>
      <span className={classes.rulesAnnotation}>
        Чтобы вырасти здоровым и сильным, дракону необходимо много пищи, кроме того, они очень
        привередливы в еде.
      </span>
      <div className={classes.rule1pointer}>➤</div>
      <span className={classes.rule1}>Здесь отображаются его предпочтения.</span>
      <span className={classes.clickToPlay}>
        Кликни на яйцо, если ознакомился с правилами, чтобы помочь дракону вылупиться.
      </span>
      <div className={classes.eggContainer} onClick={() => getPlayToggle()}>
        {Egg()}
      </div>
      <span className={classes.rule2}>Используй панель меню для выбора еды.</span>
      <div className={classes.rule2pointer}>➤</div>
      <span className={classes.rule3}>
        Имей виду, что время кормежки ограничено, поэтому следи за таймером и здоровьем своего
        питомца.
      </span>
      <div className={classes.rule3pointer}>➤</div>
    </div>
  );
  const rulesOption = !isReadyToPlay ? Rules : <> </>;
  return (
    <div className={classes.lobby}>
      {rulesOption}
      <Tamagotchi />
    </div>
  );
};

export default Lobby;
