import { InvalidParamError } from "~/errors";
import { Either } from "~/shared/error-handler/either";

export type EmailAddressType = { email: string };

export type EmailBuildSuccess = EmailAddressType;
export type EmailBuildFailed = InvalidParamError;

export type EmailBuildResponse = Either<EmailBuildFailed, EmailBuildSuccess>;
