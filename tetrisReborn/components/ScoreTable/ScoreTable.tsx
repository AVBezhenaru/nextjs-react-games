import { FC } from "react";
import classes from './ScoreTable.module.scss'
import Wrapper from "../Wrapper/Wrapper";
import Button from "../Button/Button";
import { format } from "date-fns";
import Link from "next/link";

interface INote {
  playerName: string;
  score: number;
  date: Date;
}

// TODO: fetch data from backend
const notes: INote[] = [
  {
    playerName: 'first',
    score: 100,
    date: new Date(),
  },
  {
    playerName: 'second',
    score: 200,
    date: new Date(),
  },
  {
    playerName: 'third',
    score: 300,
    date: new Date(),
  },
];

const ScoreTable: FC = () => {

  const rows = notes.map(({playerName, date, score}, index) => (
    <tr className={classes.ScoreTableRow} key={`${playerName}${score}`} >
      <td className={classes.Text}>
        {index + 1}
      </td>
      <td className={classes.Text}>
        {playerName}
      </td>
      <td className={classes.Text}>
        {score}
      </td>
      <td className={classes.Text}>
        {format(date, 'MM/dd/yyyy')}
      </td>
    </tr>
  ));

  return (
    <Wrapper>
      <div className={classes.ScoreTableContainer}>
        <Link href="./">
          <span><Button text="Back" /></span>
        </Link>
        <table className={classes.ScoreTable}>
          <thead className={classes.ScoreTableHeader}>
            <tr>
              <th className={classes.Text}>#</th>
              <th className={classes.Text}>Player name</th>
              <th className={classes.Text}>Score</th>
              <th className={classes.Text}>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}

export default ScoreTable;
