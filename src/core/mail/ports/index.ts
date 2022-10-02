import { Email } from "~/core/email";

export interface IMail {
  sourceAddress: Email;
  destinationAddress: Email;
  messageTitle: string;
  messageBody: string;
  replyToAddress?: Email;
}
