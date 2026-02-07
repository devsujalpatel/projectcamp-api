import Mailgen from "mailgen";

export const emailVerificationMailgenContent = (
  username: string,
  verificationUrl: string,
) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we are excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#0b6916",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, We'd love to help",
    },
  };
};


export const forgotPasswordMailgenContent = (
  username: string,
  passwordResetUrl: string,
) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions:
          "To reset your password click on the following button",
        button: {
          color: "#9da50d",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, We'd love to help",
    },
  };
};


