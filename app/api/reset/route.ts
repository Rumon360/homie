import { sendMail } from "@/lib/mail";
import prisma from "@/lib/prismadb";
import { makeid } from "@/lib/utils";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const email = body.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.emailVerified === false || user.emailVerified === null) {
      return NextResponse.error();
    }

    const token = makeid(5);

    const update_user = await prisma.user.update({
      where: { email },
      data: {
        emailVerificationToken: token,
      },
    });

    const sendTokenMail = await sendMail({
      email,
      subject: "Reset Password Request",
      body: `<h3>Your password reset token is : ${token}</h3>`,
    });

    return NextResponse.json("Token Send");
  } catch (error) {
    return NextResponse.json({ error });
  }
}
