import Figure from "./figures/Figure";
import I from "./figures/I";
import J from "./figures/J";
import L from "./figures/l";
import O from "./figures/O";
import S from "./figures/S";
import T from "./figures/T";
import Z from "./figures/Z";

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);
const figures = [ I, J, L, Z, S, T, O ];


export default class FigureGenerator {
  private figuresMaxIndex: number = 6; // 0 - 6

  next(): Figure {
    const rnd = getRandomInt(this.figuresMaxIndex);
    const rotate = getRandomInt(3);
    
    let figure = new figures[rnd]();

    for (let i = 0; i < rotate; i++) {
      figure = figure.nextRotate();
    }

    return figure;
  }
}
