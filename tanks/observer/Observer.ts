export class EventManager {
  events = new Map();

  on(event: string, handler: any) {
    if (this.events.has(event)) {
      this.events.get(event).add(handler);
    } else {
      this.events.set(event, new Set([handler]));
    }
  }

  off(event: string, handler: any) {
    this.events.get(event)?.delete(handler);
  }

  emit(event: string, arg?: any) {
    this.events.get(event)?.forEach((handler: (arg0: any) => any) => handler(arg));
  }
}
