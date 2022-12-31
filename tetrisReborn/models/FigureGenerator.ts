import Figure from "./figures/Figure";
import I from "./figures/I";
import J from "./figures/J";
import L from "./figures/l";
import O from "./figures/O";
import S from "./figures/S";
import T from "./figures/T";
import Z from "./figures/Z";

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export default class FigureGenerator {
  private figuresCount: number = 7;

  next(): Figure {
    const rnd = getRandomInt(this.figuresCount);
    const rotate = getRandomInt(3);
    
    let figure;
    switch (rnd) {
      case 1:
        figure = new I();
        break;
      case 2:
        figure = new J();
        break;
      case 3:
        figure = new L();
        break;
      case 4:
        figure = new Z();
        break;
      case 5:
        figure = new S();
        break;
      case 6:
        figure = new T();
        break;
      case 0:
        figure = new O();
        break;
      default:
        figure = new O();
        break;
    }

    for (let i = 0; i < rotate; i++) {
      figure = figure.nextRotate();
    }

    return figure;
  }
}
