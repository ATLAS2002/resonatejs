import { FuncWithParams } from "../types";

interface OperationMethods {
  operations: Function[];
  addFunction: FuncWithParams<void, [Function | Function[]]>;
  executeAll: FuncWithParams<any[], [boolean]>;
}

export class OperationManager implements OperationMethods {
  private _operations: Function[] = [];

  public get operations(): Function[] {
    return this._operations;
  }

  public addFunction(input: Function | Function[]) {
    if (Array.isArray(input)) {
      this._operations = [...this._operations, ...input];
    } else {
      this._operations.push(input);
    }
  }

  public executeAll(reset: boolean = false): any[] {
    const result = this._operations.map((func) => func());
    if (reset === true) this._operations = [];
    return result;
  }
}
