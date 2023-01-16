import Image from 'next/image';
import { DragEventHandler, FC, MouseEventHandler } from 'react';

import { CardItem, Corrector } from './CardStyle';

interface ICardProps {
  style?: object;
  first?: boolean;
  img: string;
  name: number;
  position: string;
  draggable: boolean;
  onDragStart?: DragEventHandler;
  onDragEnd?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrop?: DragEventHandler;
  onDrag?: DragEventHandler;
  onDoubleClick?: MouseEventHandler;
}

export const Card: FC<ICardProps> = ({
  first,
  img,
  name,
  position,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDoubleClick,
}) => (
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
      <Image src={img} alt={String(name)} width="100" height="130" />
    </CardItem>
  </>
);
