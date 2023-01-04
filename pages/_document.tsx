import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => (
  <Html>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="сайт с играми" />
      {/* <title>Game store</title> */}
    </Head>
    <body style={{ margin: '0', fontFamily: 'Inter' }}>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
