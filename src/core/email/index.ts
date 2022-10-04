import { InvalidParamError } from "~/errors";
import { Either, left, right } from "~/shared/error-handler/either";
import { emailAddressValidate } from "~/shared/validators";
import { EmailAddressType, EmailBuildResponse } from "./ports";

export class Email {
  public email: string;

  private constructor(props: EmailAddressType) {
    this.email = props.email;
  }

  public static isValidEmail(props: EmailAddressType): Either<Error, string> {
    return emailAddressValidate(props) ? right(props.email) : left(new InvalidParamError({ param: props.email }));
  }

  public static build(props: EmailAddressType): EmailBuildResponse {
    const emailAddress = {
      email: this.isValidEmail(props),
    };

    if (emailAddress.email.isLeft()) {
      return left(emailAddress.email.value);
    }
    const Address = new Email({
      email: emailAddress.email.value,
    });

    return right(Address);
  }
}
