import Image from 'next/image';
import { DragEventHandler, FC, MouseEventHandler } from 'react';

import { CardItem, Corrector } from './CardStyle';

interface ICardProps {
  img: string;
  name: number;
  stacked: boolean;
  draggable: boolean;
  onDragStart?: DragEventHandler;
  onDragEnd?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrop?: DragEventHandler;
  onDrag?: DragEventHandler;
  onDoubleClick?: MouseEventHandler;
  onDragLeave?: MouseEventHandler;
}

export const Card: FC<ICardProps> = ({
  img,
  name,
  stacked,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDoubleClick,
}) => (
  <>
    {!stacked && <Corrector />}
    <CardItem
      draggable
      onDrag={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDoubleClick={onDoubleClick}
    >
      <Image src={img} alt={String(name)} width="100" height="130" />
    </CardItem>
  </>
);
