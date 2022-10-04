import { Transporter } from "nodemailer";
import { IMail } from "~/core/mail/ports";
import { IMailService } from "~/core/protocols";
import { left, right } from "~/shared/error-handler/either";
import { InternalServerError } from "~/errors";

export class NodemailerEmailService implements IMailService {
  private readonly transporter: Transporter;
  constructor(transporter: Transporter) {
    this.transporter = transporter;
  }

  async sendMail(mail: IMail): IMailService.OutPut {
    try {
      let info = await this.transporter.sendMail({
        from: mail.sourceAddress.email,
        to: mail.destinationAddress.email,
        subject: mail.messageTitle,
        text: mail.messageBody,
        // html: "<b>Hello world?</b>" // html body
      });
      return right({ message: `Message sent: ${info.messageId}` });
    } catch (err) {
      console.log({ err });
      return left(new InternalServerError());
    }
  }
}
