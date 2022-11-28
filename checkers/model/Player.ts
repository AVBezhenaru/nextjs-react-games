import { Colors } from './Colors';

export class Player {
  id: number | null;

  name: string | null;

  bid: number | null;

  private _color: Colors;

  constructor(id: number | null, name: string, bid: number, color: Colors) {
    this.id = id;
    this.name = name;
    this.bid = bid;
    this._color = color;
  }

  set color(value: Colors) {
    this._color = value;
  }
}
