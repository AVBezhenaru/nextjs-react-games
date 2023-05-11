import { FC, ReactElement } from 'react';

import Router from './router';
// import { Grid } from './grid/Grid';

const Game: FC = (): ReactElement => (
  <div>
    <Router />
    {/* <Grid /> */}
  </div>
);

export { Game };
