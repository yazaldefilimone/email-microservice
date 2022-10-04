import { IMailService } from "~/core/protocols";
import { InternalServerError } from "~/errors";
import { left, right } from "~/shared/error-handler/either";

export class SendGridEmailService implements IMailService {
  private sendGrid: any;

  constructor(apiKey: string, sgInstance: any) {
    this.sendGrid = sgInstance;
    this.sendGrid.setApiKey(apiKey);
  }

  async sendMail(email: IMailService.Input): IMailService.OutPut {
    try {
      const msg = {
        to: email.destinationAddress.email,
        from: email.sourceAddress.email,
        subject: email.messageTitle,
        text: email.messageBody,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };

      await this.sendGrid.send(msg);
      return right({ message: "Success" });
    } catch (err) {
      return left(new InternalServerError());
    }
  }
}
