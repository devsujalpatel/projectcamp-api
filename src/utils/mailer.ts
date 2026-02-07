import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import config from "@/config";


export const emailVerificationMailgenContent = (
  username: string,
  verificationUrl: string
): Mailgen.Content => ({
  body: {
    name: username,
    intro: "Welcome to our App! We're excited to have you on board.",
    action: {
      instructions: "To verify your email, please click the button below:",
      button: {
        color: "#0b6916",
        text: "Verify your email",
        link: verificationUrl,
      },
    },
    outro:
      "Need help, or have questions? Just reply to this email — we got you.",
  },
});


export const forgotPasswordMailgenContent = (
  username: string,
  passwordResetUrl: string
): Mailgen.Content => ({
  body: {
    name: username,
    intro: "We received a request to reset your password.",
    action: {
      instructions: "Click the button below to reset your password:",
      button: {
        color: "#9da50d",
        text: "Reset your password",
        link: passwordResetUrl,
      },
    },
    outro:
      "If you didn't request this, ignore this email. No stress.",
  },
});


const smtpOptions: SMTPTransport.Options = {
  host: config.MAILTRAP_SMTP_HOST,
  port: Number(config.MAILTRAP_SMTP_PORT),
  auth: {
    user: config.MAILTRAP_SMTP_USER,
    pass: config.MAILTRAP_SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(smtpOptions);

const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://sujalpatel.tech/"
    }
})

interface SendMailOptions {
  to: string;
  subject: string;
  mailgenContent: Mailgen.Content;
}


export const sendMail = async ({
  to,
  subject,
  mailgenContent
}: SendMailOptions) => {
  const emailTextual: string = mailGenerator.generatePlaintext(mailgenContent);
  const emailHtml: string = mailGenerator.generate(mailgenContent);

  const mail = {
    from: "mail.sujalpatel@test.com",
    to,
    subject: subject,
    text: emailTextual,
    html: emailHtml,
  }

  try {
    await transporter.sendMail(mail)
  } catch (error) {
    console.error(`Email Service failed silently. Make sure that you have provided the MAILTRAP Credentials in the .env file`)
    console.error("Error:", error)
  }
}