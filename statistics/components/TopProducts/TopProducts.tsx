import React from 'react';

import classes from './TopProducts.module.scss';

const TopProducts = () => (
  <div className={classes.TopProducts}>
    <h2>Top Games</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Sales</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Chess</td>
          <td className={classes.popularity}>
            <div
              className={classes.progress}
              style={{
                backgroundColor: '#cde7ff',
              }}
            >
              <div
                className={classes.progress__line}
                style={{
                  backgroundColor: '#0095ff',
                  width: `${50}%`,
                }}
              />
            </div>
          </td>
          <td>{`${50}%`}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Tanks</td>
          <td className={classes.popularity}>
            <div
              className={classes.progress}
              style={{
                backgroundColor: '#8cfac7',
              }}
            >
              <div
                className={classes.progress__line}
                style={{
                  backgroundColor: '#00e096',
                  width: `${20}%`,
                }}
              />
            </div>
          </td>
          <td>{`${20}%`}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Tetris</td>
          <td className={classes.popularity}>
            <div
              className={classes.progress}
              style={{
                backgroundColor: '#c5a8ff',
              }}
            >
              <div
                className={classes.progress__line}
                style={{
                  backgroundColor: '#884dff',
                  width: `${16}%`,
                }}
              />
            </div>
          </td>
          <td>{`${16}%`}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Doodle Jump</td>
          <td className={classes.popularity}>
            <div
              className={classes.progress}
              style={{
                backgroundColor: '#ffd5a4',
              }}
            >
              <div
                className={classes.progress__line}
                style={{
                  backgroundColor: '#ff8f0d',
                  width: `${14}%`,
                }}
              />
            </div>
          </td>
          <td>{`${14}%`}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default TopProducts;
