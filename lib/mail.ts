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
    service: "gmail",
    auth: { user: SMTP_EMAIL, pass: SMTP_PASSWORD },
  });

  try {
    const testResult = await transport.verify();
  } catch (error) {
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject,
      html: body,
    });
  } catch (error) {}
};
