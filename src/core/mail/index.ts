import { Email } from "~/core/email";
import { IMail } from "./ports";

export class Mail implements IMail {
  public sourceAddress: Email;
  public destinationAddress: Email;
  public messageTitle: string;
  public messageBody: string;
  public replyToAddress?: Email;

  private constructor(props: IMail) {
    this.sourceAddress = props.sourceAddress;
    this.destinationAddress = props.destinationAddress;
    this.messageTitle = props.messageTitle;
    this.messageBody = props.messageBody;
    this.replyToAddress = props.replyToAddress;
  }

  public build(props: IMail) {
    new Mail(props);
  }
}
