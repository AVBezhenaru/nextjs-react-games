export class Player {
  id: number | null;

  name: string | null;

  bid: number | null;

  color: string;

  constructor(
    id: number | null,
    name: string | null,
    bid: number | null,

    color: string,
  ) {
    this.id = id;
    this.name = name;
    this.bid = bid;

    this.color = color;
  }
}
