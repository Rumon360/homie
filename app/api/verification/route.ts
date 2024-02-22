import { sendMail } from "@/lib/mail";
import prisma from "@/lib/prismadb";
import { generateVerificationToken } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { email } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user?.emailVerified) {
      NextResponse.json("Already Verified");
    }

    const emailVerificationToken = generateVerificationToken();

    const userD = await prisma.user.update({
      where: { email },
      data: {
        emailVerificationToken: emailVerificationToken,
      },
    });

    const verificationMail = await sendMail({
      email,
      subject: "Email Verification",
      body: `<h1><a href="https://homie-flame.vercel.app/verify?token=${emailVerificationToken}&email=${userD.email}" target="_blank">Click here to verify your email</a></h1>`,
    });

    return NextResponse.json("Email Send");
  } catch (error) {
    return NextResponse.json({ error });
  }
}
