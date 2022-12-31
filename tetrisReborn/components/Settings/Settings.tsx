import Link from "next/link";
import { FC } from "react";
import Button from "../Button/Button";
import Wrapper from "../Wrapper/Wrapper";
import classes from "./Settings.module.scss";

const Settings: FC = () => {

  return (
    <Wrapper>
      <div className={classes.SettingsContainer}>
        <Link href="./">
          <span><Button text="Back" /></span>
        </Link>
        <h3 className={classes.SettingsHeader}>Навигация</h3>
        <table className={classes.SettingsTable}>
          <tr>
            <td>
              Влево
            </td>
            <td>
              Клавиша A, стрелка влево
            </td>
          </tr>
          <tr>
            <td>
              Вправо
            </td>
            <td>
              Клавиша D, стрелка вправо
            </td>
          </tr>
          <tr>
            <td>
              Поворот
            </td>
            <td>
              Клавиша W, стрелка вверх
            </td>
          </tr>
        </table>
      </div>
    </Wrapper>
  );
}

export default Settings;
