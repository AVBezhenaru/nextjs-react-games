import Head from 'next/head';

import { Specification } from '../../airhockey/components/Specification/Specification';

const SpecificationPage = () => (
  <>
    <Head>
      <title>Specification</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="Specification" />
    </Head>
    <Specification />
  </>
);

export default SpecificationPage;
