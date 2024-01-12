interface OperationMethods {
  operations: unknown;
  addFunction: unknown;
  executeAll: unknown;
}

export class OperationManager implements OperationMethods {
  private _operations: Function[] = [];

  public get operations(): Function[] {
    return this._operations;
  }

  public addFunction(input: Function | Function[]) {
    if (Array.isArray(input)) {
      this._operations = [...this.operations, ...input];
    } else {
      this.operations.push(input);
    }
  }

  public executeAll(reset: boolean = false): any[] {
    const result = this._operations.map((func) => func());
    if (reset === true) this._operations = [];
    return result;
  }
}
