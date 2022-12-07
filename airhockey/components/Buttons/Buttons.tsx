import Link from 'next/link';

import { IButton } from '../../types/ButtonsTypes';

import { ButtonsDiv, ButtonPlay, ButtonSpecification } from './index';

const buttons: IButton[] = [
  { title: 'PLAY', node: ButtonPlay, path: 'airhockey/gamePage' },
  { title: 'SPECIFICATION', node: ButtonSpecification, path: 'airhockey/specificationPage' },
];

const Buttons = () => (
  <ButtonsDiv>
    {buttons.map((item: IButton, index) => (
      <Link key={index} href={item.path}>
        <item.node>{item.title}</item.node>
      </Link>
    ))}
  </ButtonsDiv>
);

export default Buttons;
