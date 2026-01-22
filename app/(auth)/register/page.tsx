import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import RegisterForm from "./form";

type InviteData = {
  email: string;
  firstName: string;
  lastName: string;
  roleName: string;
};

interface Props {
  searchParams: { token?: string };
}

export default async function RegisterPage({ searchParams }: Props) {
  const { token } = await searchParams;
  if (!token) {
    redirect("/error?message=Missing%20invite%20token");
  }

  const invite = await prisma.userInvite.findUnique({
    where: { token },
    include: {
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!invite || invite.expiresAt < new Date()) {
    redirect("/error?message=Invalid%20or%20expired%20invite%20token");
  }

  // Pass invite data as props to client form
  const inviteData: InviteData = {
    email: invite.email,
    firstName: invite.firstName,
    lastName: invite.lastName,
    roleName: invite.role.name,
  };

  return <RegisterForm inviteData={inviteData} token={token} />;
}
