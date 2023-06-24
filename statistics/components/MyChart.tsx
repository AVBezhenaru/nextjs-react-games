'use client';

import { useEffect, useState } from 'react';

export default function MyChart(props: any) {
  const [Chart, setChart] = useState<any>();
  const hasType = typeof props?.type !== 'undefined';

  useEffect(() => {
    import('react-apexcharts').then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  return hasType && Chart && <Chart {...props} />;
}
