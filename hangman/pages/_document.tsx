import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => (
  <Html>
    <Head>
      <meta name="description" content="игра виселица" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      <title>Виселица игра</title>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
