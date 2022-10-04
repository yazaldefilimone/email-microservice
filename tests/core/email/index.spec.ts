import { Email } from "~/core/email";
import { InvalidParamError } from "~/errors";

const makeSut = () => {
  const emailAddress = Email;
  const emailCorrect = {
    correct: "yazaldefilimon@gmail.com",
    correctSecund: "jhoedoe@gmail.com",
  };
  const emailIncorrect = {
    incorrect: "jhoedoe@mail",
    incorrectSecund: "yazaldefilimon.gmail.com",
  };

  return {
    emailAddress,
    emailCorrect,
    emailIncorrect,
  };
};

describe("Email Address", () => {
  it("Should return an email address if email will is correct", () => {
    const { emailAddress, emailCorrect } = makeSut();

    const result = emailAddress.build({ email: emailCorrect.correct });

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({ email: emailCorrect.correct });
  });
});
