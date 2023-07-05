const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
  public keyStates: Map<any, any>;

  public keyMap: Map<any, any>;

  constructor() {
    this.keyStates = new Map();
    this.keyMap = new Map();
  }

  addMapping(keyCode: any, callback: any) {
    this.keyMap.set(keyCode, callback);
  }

  handleEvent(event: any) {
    const { keyCode } = event;

    if (!this.keyMap.has(keyCode)) {
      return false;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);
    this.keyMap.get(keyCode)(keyState);
  }

  listenTo(window: any) {
    ['keydown', 'keyup'].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    });
  }
}
