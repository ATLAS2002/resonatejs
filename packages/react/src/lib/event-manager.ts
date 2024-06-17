import type { EventKeys, Listener } from "../types";

export class EventManager {
  private _events: Function[] = [];

  public addFunction(input: Function | Function[]) {
    if (Array.isArray(input)) {
      this._events = [...this._events, ...input];
    } else {
      this._events.push(input);
    }
  }

  public addEvent<T extends HTMLElement, E extends EventKeys>(
    target: T,
    event: E,
    listener: Listener<E>,
  ) {
    target.addEventListener(event, listener);
    this.addFunction(() => target.removeEventListener(event, listener));
  }

  public executeAll(): any[] {
    const result = this._events.map((func) => func());
    this._events = [];
    return result;
  }
}
