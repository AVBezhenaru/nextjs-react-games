import Link from "next/link";
import { FC } from "react";
import Button from "../Button/Button";
import Wrapper from "../Wrapper/Wrapper";
import classes from "./Settings.module.scss";

interface ISettingsItem {
  title: string;
  description: string;
}

const settingsItems: ISettingsItem[] = [
  { title: 'Влево', description: 'Клавиша A, стрелка влево' },
  { title: 'Вправо', description: 'Клавиша D, стрелка вправо' },
  { title: 'Вниз', description: 'Клавиша S, стрелка вниз' },
  { title: 'Поворот', description: 'Клавиша W, стрелка вверх' },
];

const Settings: FC = () => {
  const settingsTableRows = settingsItems.map(({ title, description }) => (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
    </tr>
  ));

  return (
    <Wrapper>
      <div className={classes.SettingsContainer}>
        <Link href="./">
          <span><Button text="Back" /></span>
        </Link>
        <h3 className={classes.SettingsHeader}>Навигация</h3>
        <table className={classes.SettingsTable}>
          {settingsTableRows}
        </table>
      </div>
    </Wrapper>
  );
}

export default Settings;
