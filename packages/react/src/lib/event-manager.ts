export class EventManager {
  private _events: Function[] = [];

  public get events(): Function[] {
    return this._events;
  }

  public addFunction(input: Function | Function[]) {
    if (Array.isArray(input)) {
      this._events = [...this._events, ...input];
    } else {
      this._events.push(input);
    }
  }

  public executeAll(reset: boolean = false): any[] {
    const result = this._events.map((func) => func());
    if (reset === true) this._events = [];
    return result;
  }
}
