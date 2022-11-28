import { Colors } from './Colors';

export class Player {
  id: number | null;

  name: string | null;

  bid: number | null;

  color: Colors;


  constructor(id: number | null, name: string | null, bid: number | null, color: Colors) {
    this.id = id;
    this.name = name;
    this.bid = bid;
    this.color = color;
  }
}
