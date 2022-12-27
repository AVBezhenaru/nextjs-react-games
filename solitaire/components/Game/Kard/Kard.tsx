import Image from 'next/image';

import { TypeCard } from '../../../types';

import { CardItem, Corrector } from './KardStyle';

export const Kard = ({
  img,
  name,
  position,
  onDragStart,
  onDragLeave,
  onDragEnd,
  onDragOver,
  onDrop,
}: TypeCard) => (
  <>
    {position === 'bottom' && <Corrector />}
    <CardItem
      draggable
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Image src={img} alt={String(name)} width="120" height="165" />
    </CardItem>
  </>
);
