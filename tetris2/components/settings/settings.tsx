import style from './settings.module.scss';

function Settings() {
  return (
    <table className={style.table}>
      <caption>Навигация</caption>
      <tr>
        <th>Влево</th>
        <td>Клавиша A, стрелка влево</td>
      </tr>
      <tr>
        <th>Вправо</th>
        <td>Клавиша D, стрелка вправо</td>
      </tr>
      <tr>
        <th>Поворот</th>
        <td>Клавиша W, стрелка вверх</td>
      </tr>
      <tr>
        <th>Ускоренное падение элемента</th>
        <td>Пробел</td>
      </tr>
    </table>
  );
}

export default Settings;
