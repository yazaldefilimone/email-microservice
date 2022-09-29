import { InvalidEmailAddress } from "~/errors";
import { Either } from "~/shared/error-handler/either";

export type EmailAddressType = { email: string };

export type EmailBuildSuccess = EmailAddressType;
export type EmailBuildFailed = InvalidEmailAddress;

export type EmailBuildResponse = Either<EmailBuildFailed, EmailBuildSuccess>;
