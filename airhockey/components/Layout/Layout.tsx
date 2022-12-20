import { ReactNode } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

import image from '../../assets/images/air_hockey.png';
import Line from '../Line/Line';

import {
  WrapperLayoutMain,
  WrapperContent,
  Container,
  WrapperImage,
  H1,
  WrapperSphere,
  CanvasLayout,
} from './index';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: NextPage<ILayoutProps> = ({ children }) => (
  <WrapperLayoutMain>
    <CanvasLayout />
    <WrapperContent>
      <Line />
      <Container>
        <WrapperImage>
          <Image src={image} width={900} height={900} />
        </WrapperImage>
        <H1>Air Hockey</H1>
      </Container>
      {children}
      <WrapperSphere />
    </WrapperContent>
  </WrapperLayoutMain>
);
