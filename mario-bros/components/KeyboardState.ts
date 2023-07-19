const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
  public keyStates: Map<any, any>;

  public keyMap: Map<any, any>;

  constructor() {
    this.keyStates = new Map();
    this.keyMap = new Map();
  }

  addMapping(code: any, callback: any) {
    this.keyMap.set(code, callback);
  }

  handleEvent(event: any) {
    const { code } = event;

    if (!this.keyMap.has(code)) {
      return false;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);
    this.keyMap.get(code)(keyState);
  }

  listenTo(window: any) {
    ['keydown', 'keyup'].forEach((eventName) => {
      window.addEventListener(eventName, (event: any) => {
        this.handleEvent(event);
      });
    });
  }
}
