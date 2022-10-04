import { Email } from "~/core/email";
import { InvalidParamError } from "~/errors";
import { Either } from "~/shared/error-handler/either";

export interface IMail {
  sourceAddress: Email;
  destinationAddress: Email;
  messageTitle: string;
  messageBody: string;
  replyToAddress?: Email;
}

export type MailBuildSuccess<T> = T;
export type MailBuildFailed = InvalidParamError;

export type MailBuildResponse<T> = Either<MailBuildFailed, MailBuildSuccess<T>>;
