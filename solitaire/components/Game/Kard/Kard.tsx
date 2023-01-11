import Image from 'next/image';

import { TypeCard } from '../../../types';

import { CardItem, Corrector } from './KardStyle';

export const Kard = ({
  first,
  img,
  name,
  position,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDoubleClick,
}: TypeCard) => (
  <>
    {position === 'bottom' && !first && <Corrector />}
    <CardItem
      draggable
      onDrag={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDoubleClick={onDoubleClick}
    >
      <Image src={img} alt={String(name)} width="120" height="165" />
    </CardItem>
  </>
);
