import "./settings/alias";
import { NodemailerEmailService } from "~/services/nodemailer";
import { Email } from "~/core/email";
import { Transporter } from "~/services/nodemailer/transporter";
import { transporterInput } from "~/services/nodemailer/transporter/ports";
import { env } from "~/shared/env";
import { IMail } from "~/core/mail/ports";
import { SendGridEmailService } from "~/services/sendgrid";

const core = async function () {
  const transport: transporterInput = {
    host: env.host,
    port: env.port,
    secure: env.secure,
    userName: undefined,
    password: undefined,
  };
  const buildTransporter = new Transporter(transport);
  const transporter = await buildTransporter.create();

  if (transporter.isLeft()) {
    return console.error({ error: transporter.value.message });
  }

  const sender = Email.build({ email: "yazaldefilimon@gmail.com" });
  const recipient = Email.build({ email: "yazaldefilimon@gmail.com" });
  if (sender.isLeft()) return console.error({ error: sender.value.message });
  if (recipient.isLeft()) return console.error({ error: recipient.value.message });

  const mail: IMail = {
    sourceAddress: sender.value,
    destinationAddress: recipient.value,
    messageBody: "Hey there, how are you?",
    messageTitle: "Hello",
  };
  // const sendGridEmailService = new SendGridEmailService(sendGrind)
  // const result = sendGridEmailService.sendMail(mail)

  const nodemailerEmailService = new NodemailerEmailService(transporter.value);

  const result = await nodemailerEmailService.sendMail(mail);

  if (result.isLeft()) return console.error({ error: result.value.message });

  console.log(result.value);
};

core();
