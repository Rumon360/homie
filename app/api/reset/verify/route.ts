import prisma from "@/lib/prismadb";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password, token } = body.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || user.emailVerified === false || user.emailVerified === null) {
      return NextResponse.error();
    }

    if (user.emailVerificationToken === token) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const update_user = await prisma.user.update({
        where: { email: email },
        data: {
          hashedPassword: hashedPassword,
          emailVerificationToken: "",
        },
      });
      return NextResponse.json("Successfully changed password!");
    }

    return NextResponse.error();
  } catch (error) {
    return NextResponse.json({ error });
  }
}
