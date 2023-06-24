'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), { ssr: false });
const MyMap = () => <Map />;

export default MyMap;
