import { Transporter } from "nodemailer";
import { InternalServerError } from "~/errors";
import { Either } from "~/shared/error-handler/either";

export type transporterInput = {
  host: string;
  port: number;
  secure: boolean;
  userName?: string;
  password?: string;
};

export interface ITransporter {
  create: () => ITransporter.OutPut;
}
export namespace ITransporter {
  export type OutPut = Promise<Either<InternalServerError, Transporter>>;
}
