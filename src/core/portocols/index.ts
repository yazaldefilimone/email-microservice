import { IMail } from "~/core/mail/ports";
import { InternalServerError, InvalidParamError } from "~/errors";
import { Either } from "~/shared/error-handler/either";

type mailTransmissionSuccess = {
  success: boolean;
  message: string;
};

type mailTransmissionFailed = InvalidParamError | InternalServerError;

export interface IMailService {
  sendMail(mail: IMailService.Input): IMailService.OutPut;
}
export namespace IMailService {
  export type Input = IMail;
  export type OutPut = Promise<Either<mailTransmissionFailed, mailTransmissionSuccess>>;
}
