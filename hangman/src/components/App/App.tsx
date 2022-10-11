import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ChangeTheme, Game, Home } from '../../pages';
import { Layout } from '../Layout/Layout';

const App: FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/theme" element={<ChangeTheme />} />
      <Route path="/game" element={<Game />} />
    </Route>
  </Routes>
);

export { App };
