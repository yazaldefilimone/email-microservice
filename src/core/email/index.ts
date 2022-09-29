import { InvalidEmailAddress } from "~/errors";
import { Either, left, right } from "~/shared/error-handler/either";
import { emailAddressValidate } from "~/shared/validators";
import { EmailAddressType, EmailBuildResponse } from "./ports";

export class Email {
  public isValidEmail(props: EmailAddressType): Either<Error, string> {
    return emailAddressValidate(props) ? right(props.email) : left(new InvalidEmailAddress(props));
  }

  public build(props: EmailAddressType): EmailBuildResponse {
    const emailAddress = {
      email: this.isValidEmail(props),
    };

    if (emailAddress.email.isLeft()) {
      return left(emailAddress.email.value);
    }
    const Address = {
      email: emailAddress.email.value,
    };

    return right(Address);
  }
}
