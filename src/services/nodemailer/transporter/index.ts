import { createTestAccount, createTransport } from "nodemailer";
import { InternalServerError } from "~/errors";
import { left, right } from "~/shared/error-handler/either";
import { ITransporter, transporterInput } from "./ports";

export class Transporter implements ITransporter {
  private readonly transporter: transporterInput;
  constructor(transporter: transporterInput) {
    this.transporter = transporter;
  }

  async create(): ITransporter.OutPut {
    try {
      const address = await createTestAccount();
      const transport = createTransport({
        host: this.transporter.host,
        port: this.transporter.port,
        secure: this.transporter.secure,
        auth: {
          user: this.transporter.userName ? address.user : this.transporter.userName,
          pass: this.transporter.password ? address.pass : this.transporter.password,
        },
      });
      return right(transport);
    } catch (error) {
      return left(new InternalServerError());
    }
  }
}
