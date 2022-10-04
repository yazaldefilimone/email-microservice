import { Email } from "~/core/email";
import { InvalidParamError } from "~/errors";
import { Either, left, right } from "~/shared/error-handler/either";
import { IMail, MailBuildResponse } from "./ports";

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

  public static isSourceAddress(props: { sourceAddress: Email }): Either<InvalidParamError, Email> {
    const { sourceAddress } = props;
    return sourceAddress instanceof Email
      ? right(sourceAddress)
      : left(new InvalidParamError({ param: "sourceAddress" }));
  }

  public static isDestinationAddress(props: { destinationAddress: Email }): Either<InvalidParamError, Email> {
    const { destinationAddress } = props;
    return destinationAddress instanceof Email
      ? right(destinationAddress)
      : left(new InvalidParamError({ param: "destinationAddress" }));
  }

  public static isMessageTitle(props: { messageTitle: string }): Either<InvalidParamError, string> {
    const { messageTitle } = props;
    return messageTitle.length <= 3 ? left(new InvalidParamError({ param: "messageTitle" })) : right(messageTitle);
  }

  public static isMessageBody(props: { messageBody: string }): Either<InvalidParamError, string> {
    const { messageBody } = props;
    return messageBody.length < 2 ? left(new InvalidParamError({ param: "messageBody" })) : right(messageBody);
  }

  public static build(props: IMail): MailBuildResponse<Mail> {
    const building = {
      sourceAddress: this.isSourceAddress({ sourceAddress: props.sourceAddress }),
      destinationAddress: this.isDestinationAddress({ destinationAddress: props.destinationAddress }),
      messageTitle: this.isMessageTitle({ messageTitle: props.messageTitle }),
      messageBody: this.isMessageBody({ messageBody: props.messageBody }),
      replyToAddress: props.replyToAddress,
    };

    if (building.sourceAddress.isLeft()) {
      return left(building.sourceAddress.value);
    }

    if (building.destinationAddress.isLeft()) {
      return left(building.destinationAddress.value);
    }

    if (building.messageTitle.isLeft()) {
      return left(building.messageTitle.value);
    }

    if (building.messageBody.isLeft()) {
      return left(building.messageBody.value);
    }

    const mail = {
      sourceAddress: building.sourceAddress.value,
      destinationAddress: building.destinationAddress.value,
      messageTitle: building.messageTitle.value,
      messageBody: building.messageBody.value,
      replyToAddress: building.replyToAddress,
    };

    return right(new Mail(mail));
  }
}
