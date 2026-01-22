"use server";

import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

type RegisterInput = {
  token: string;
  // phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export async function registerUserAction(input: RegisterInput) {
  const { token, password, confirmPassword } = input;

  if (password !== confirmPassword) throw new Error("Passwords do not match");

  const invite = await prisma.userInvite.findUnique({ where: { token } });
  if (!invite || invite.expiresAt < new Date())
    throw new Error("Invalid or expired invite token");

  const existingUser = await prisma.user.findUnique({
    where: { email: invite.email },
  });
  if (existingUser) throw new Error("User already registered");

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      email: invite.email,
      firstName: invite.firstName,
      lastName: invite.lastName,
      fullName: `${invite.firstName} ${invite.lastName}`,
      roleId: invite.roleId,
      // phoneNumber,
      password: hashedPassword,
      isActive: true,
      emailVerifiedAt: new Date(),
    },
  });

  await prisma.userInvite.delete({ where: { token } });

  return { success: true };
}
