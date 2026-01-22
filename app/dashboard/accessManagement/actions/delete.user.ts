"use server";

import prisma from "@/lib/prisma";

export async function deleteAccessAction(
  id: string,
  source: "USER" | "INVITE"
) {
  if (source === "USER") {
    await prisma.user.delete({
      where: { id },
    });
    return;
  }

  if (source === "INVITE") {
    await prisma.userInvite.delete({
      where: { id },
    });
    return;
  }
}
