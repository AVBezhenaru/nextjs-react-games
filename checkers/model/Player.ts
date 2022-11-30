// import { Colors } from './Colors';

export class Player {
  id: number | null;

  name: string | null;

  bid: number | null;

  // colors: Colors;

  color: string;

  constructor(
    id: number | null,
    name: string | null,
    bid: number | null,
    // colors: Colors,
    color: string,
  ) {
    this.id = id;
    this.name = name;
    this.bid = bid;
    // this.colors = colors;
    this.color = color;
  }
}
