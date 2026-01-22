"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";

export async function changePasswordAction(
  currentPassword: string,
  newPassword: string,
) {
  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    }),

    // 🔐 optional but recommended
    prisma.session.updateMany({
      where: {
        userId: user.id,
        revoked: false,
      },
      data: { revoked: true },
    }),
  ]);
}
