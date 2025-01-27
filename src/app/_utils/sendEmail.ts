import nodemailer, { type SentMessageInfo } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  context?: object;
}

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  port: Number(process.env.EMAIL_PORT!),
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM!,
    pass: process.env.EMAIL_APP_PASSWORD!,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: path.resolve("./src/mails/layouts"),
      partialsDir: path.resolve("./src/mails/partials"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./src/mails/templates"),
    extName: ".hbs",
  }),
);

export async function sendEmail(
  options: EmailOptions,
): Promise<SentMessageInfo> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM!,
      to: options.to,
      subject: options.subject,
      text: options?.text,
      html: options?.html,
      template: options?.template,
      context: options?.context,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
