import style from './game-score-all.module.scss';

function GameScoreAll() {
  return (
    <div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Player Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Player1</td>
            <td>0000</td>
            <td>0000</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Player1</td>
            <td>0000</td>
            <td>0000</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Player1</td>
            <td>0000</td>
            <td>0000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GameScoreAll;
