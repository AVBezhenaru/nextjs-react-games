/* eslint-disable react/no-children-prop */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Link from 'next/link';

import Layout from '../../admin-navigate/layout/layout';

import { DivForm, H1, InputBtn, P, Section } from './mainStyle';

const Main = () => (
  <Section>
    <Router>
      <Routes>
        <Route path="/a" element={Layout()} />
      </Routes>
    </Router>
    <DivForm data-testid="form">
      <H1>Welcome</H1>
      <P>
        <Link href="/login">
          <InputBtn type="button" children="login" />
        </Link>
        <Link href="/registration">
          <InputBtn type="button" children="guest" />
        </Link>
      </P>
    </DivForm>
  </Section>
);

export { Main };
