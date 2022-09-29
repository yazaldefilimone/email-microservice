export class InvalidEmailAddress extends Error {
  constructor({ email }: { email: string }) {
    super(`This [${email}] is not valid`);
    this.name = "InvalidEmailAddress";
  }
}
