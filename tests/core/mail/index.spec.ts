import { Mail } from "~/core/mail";
import { Email } from "~/core/email";
import { IMail } from "./ports";

const makeSut = () => {
  const mail = Mail;
  const emailCorrect = {
    correct: "yazaldefilimon@gmail.com",
    correctSecund: "jhoedoe@gmail.com",
  };
  return {
    mail,
    emailCorrect,
  };
};

describe("Mail", () => {
  it("Should return an content mail all data will is correct", () => {
    const { mail, emailCorrect } = makeSut();
    const sender = Email.build({ email: emailCorrect.correct });
    const recipient = Email.build({ email: emailCorrect.correctSecund });
    if (sender.isLeft() || recipient.isLeft()) {
      console.error("Email return error");
      throw new Error("Email return error");
    }
    const mailParams: IMail = {
      sourceAddress: sender.value,
      destinationAddress: recipient.value,
      messageBody: "Hey, I am again",
      messageTitle: "Hello",
    };
    const result = mail.build(mailParams);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(mailParams);
  });
});
