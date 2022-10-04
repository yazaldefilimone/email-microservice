import { Email } from "~/core/email";
import { Either, left, right } from "~/shared/error-handler/either";
import { IMail } from "./ports";

export class Mail implements IMail {
  public readonly sourceAddress: Email;
  public readonly destinationAddress: Email;
  public readonly messageTitle: string;
  public readonly messageBody: string;
  public readonly replyToAddress?: Email;

  private constructor(props: IMail) {
    this.sourceAddress = props.sourceAddress;
    this.destinationAddress = props.destinationAddress;
    this.messageTitle = props.messageTitle;
    this.messageBody = props.messageBody;
    this.replyToAddress = props.replyToAddress;
  }

  public isSourceAddress(props: { sourceAddress: Email }): Either<Error, Email> {
    const { sourceAddress } = props;
    return sourceAddress instanceof Email ? right(sourceAddress) : left(new Error("Invalid source address"));
  }

  public isDestinationAddress(props: { destinationAddress: Email }): Either<Error, Email> {
    const { destinationAddress } = props;
    return destinationAddress instanceof Email
      ? right(destinationAddress)
      : left(new Error("Invalid destination address"));
  }

  public isMessageTitle(props: { messageTitle: string }): Either<Error, string> {}
  public isMessageBody(props: { messageBody: string }): Either<Error, string> {}

  public build(props: IMail) {
    new Mail(props);
  }
}
