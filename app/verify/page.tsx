import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

async function Verify(params: any) {
  const token: string = params.searchParams.token;
  const email: string = params.searchParams.email;

  if (!token || !email) {
    redirect("/");
  }

  let success = false;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user?.emailVerified && user?.emailVerificationToken === token) {
    const updateUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: true,
        emailVerificationToken: "",
      },
    });
    success = true;
  } else {
    redirect("/");
  }

  return (
    <div className="h-[70vh] flex justify-center items-center text-xl text-primary">
      {success && "Verified Email"}
    </div>
  );
}

export default Verify;
