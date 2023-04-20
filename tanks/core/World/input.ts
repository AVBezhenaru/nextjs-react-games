/* eslint-disable lines-between-class-members */
export default class Input {
  keys: Set<string>;
  drive: HTMLAudioElement;

  constructor() {
    this.keys = new Set();
    this.drive = new Audio('/audio/tanks/tank-move.mp3');
    this.init();
  }

  init() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
          this.drive.play();
          this.keys.add(event.code);
          break;
        case 'Space':
          this.keys.add(event.code);
          break;
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
          this.drive.pause();
          this.keys.delete(event.code);
          break;
        case 'Space':
          this.keys.delete(event.code);
      }
    });
  }

  has(...arg: string[]) {
    return Array.isArray(arg) ? arg.some((key) => this.keys.has(key)) : this.keys.has(arg);
  }
}
