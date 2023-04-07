interface Listener {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [x: string]: Function[];
}
export interface IObserver {
  listeners: Listener;
  emit(): boolean;
  subscribe(): string[];
}
export class Observer {
  listeners: Listener;

  constructor() {
    this.listeners = {};
  }

  // Уведомляем слушателей
  emit(event: string, ...args: { [x: string]: string }[]) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // Подписываемся на уведомления или добавляем новго слушателя
  subscribe(event: string, fn: () => void) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}
