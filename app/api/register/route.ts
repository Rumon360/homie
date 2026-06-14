import { sendMail } from "@/lib/mail";
import prisma from "@/lib/prismadb";
import { generateVerificationToken } from "@/lib/utils";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const emailVerificationToken = generateVerificationToken();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        emailVerified: false,
        emailVerificationToken: emailVerificationToken,
      },
    });

    if (!user) return NextResponse.error();

    await sendMail({
      email,
      subject: "Email Verification",
      body: `<h1><a href="${process.env.NEXTAUTH_URL}verify?token=${emailVerificationToken}&email=${user.email}" target="_blank">Click here to verify your email</a></h1>`,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[register]", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
