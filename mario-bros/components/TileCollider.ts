import TileResolver from './TileResolver';
import { Matrix } from './Vec2';

export default class TileCollider {
  private tiles: TileResolver;

  constructor(tileMatrix: Matrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkX(entity: any) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.pos.x + entity.size.x;
    } else if (entity.vel.x < 0) {
      x = entity.pos.x;
    } else return;

    const matches = this.tiles.searchByRange(
      entity.pos.x,
      entity.pos.x + entity.size.x,
      entity.pos.y,
      entity.pos.y + entity.size.y,
    );

    matches.forEach((match: any) => {
      if (!match) return;

      if (match.tile.name !== 'ground') return;

      if (entity.vel.x > 0) {
        if (entity.pos.x + entity.size.x > match.x1) {
          entity.pos.x = match.x1 - entity.size.x;
          entity.vel.x = 0;
        }
      } else if (entity.vel.x < 0) {
        if (entity.pos.x < match.x2) {
          entity.pos.x = match.x2;
          entity.vel.x = 0;
        }
      }
    });
  }

  checkY(entity: any) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.pos.y + entity.size.y;
    } else if (entity.vel.y < 0) {
      y = entity.pos.y;
    } else return;

    const matches = this.tiles.searchByRange(entity.pos.x, entity.pos.x + entity.size.x, y, y);

    matches.forEach((match: any) => {
      if (!match) return;

      if (match.tile.name !== 'ground') return;

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > match.y1) {
          entity.pos.y = match.y1 - entity.size.y;
          entity.vel.y = 0;
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < match.y2) {
          entity.pos.y = match.y2;
          entity.vel.y = 0;
        }
      }
    });
  }

  test(entity: object) {
    this.checkY(entity);
  }
}
