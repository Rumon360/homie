import nodemailer from "nodemailer";

export const sendMail = async ({
  email,
  subject,
  body,
}: {
  email: string;
  subject: string;
  body: string;
}) => {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: SMTP_EMAIL, pass: SMTP_PASSWORD?.replace(/\s/g, "") },
  });

  await transport.sendMail({
    from: SMTP_EMAIL,
    to: email,
    subject,
    html: body,
  });
};
