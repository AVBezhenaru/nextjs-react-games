import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

import exit from '../img/exit.png';

import { SectionLayout, LayoutHeader, ButtonBack } from './layoutStyle';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [showing, setShowing] = useState(false);
  const router = useRouter();
  const linkLength = router.pathname.split('/').length;

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === 'undefined') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }
  return (
    <>
      {linkLength > 3 && (
        <LayoutHeader>
          <Link href="/profile/games/" passHref>
            <ButtonBack>
              <Image src={exit} alt="вернуться" width={35} height={30} />
              <span> к списку игр</span>
            </ButtonBack>
          </Link>
        </LayoutHeader>
      )}
      <SectionLayout>{children}</SectionLayout>;
    </>
  );
};

export { Layout };
