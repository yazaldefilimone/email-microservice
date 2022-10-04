export class InvalidParamError extends Error {
  constructor({ param }: { param: string }) {
    super(`This [${param}] is not valid`);
    this.name = "InvalidParamError";
  }
}
