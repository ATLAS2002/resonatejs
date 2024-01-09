import { Func } from "../types";

export class Executor {
  private _functions: Func[] = [];

  public get functions() {
    return this._functions;
  }

  public addFunction(input: Func | Func[]): void {
    if (Array.isArray(input)) {
      this._functions = [...this._functions, ...input];
    } else {
      this._functions.push(input);
    }
  }

  public executeAll(): ReturnType<(typeof this._functions)[number]>[] {
    const returnValue = [];
    for (const func of this._functions) {
      const value = func();
      returnValue.push(value);
    }
    return returnValue;
  }
}
