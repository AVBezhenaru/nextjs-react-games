import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const HangmanHead: NextPage = () => (
  <Head>
    <title>Виселица игра</title>
    <meta name="description" content="игра виселица" />
    <link rel="icon" type="image/png" sizes="32x32" href="/hangmanFavicon.png" />
  </Head>
);

export { HangmanHead };
