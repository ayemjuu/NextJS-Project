"use server";

import prisma from "@/lib/prisma";
import { userFormSchema, UserFormValues } from "../schema";

export async function editUserAction(input: UserFormValues) {
  console.log("editUserAction called with input:", input);
  const data = userFormSchema.parse(input);

  if (!data.id) {
    throw new Error("User ID is required for editing");
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: data.id },
  });

  const invite = await prisma.userInvite.findUnique({
    where: { id: data.id },
  });

  if (!user && !invite) {
    throw new Error("User or invite not found");
  }

  // Check if email is being changed and if it's already taken
  if (user) {
    // Check if email is being changed and if it's already taken
    if (data.email !== user.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        throw new Error("Email already in use");
      }
    }

    // Update user
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email,
        firstName: data.firstName || user.firstName,
        lastName: data.lastName || user.lastName,
        fullName: `${data.firstName || user.firstName} ${data.lastName || user.lastName}`,
        roleId: data.roleId,
        isActive: data.isActive,
      },
    });
  }

  if (invite) {
    // Check if email is being changed and if it's already taken
    if (data.email !== invite.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        throw new Error("Email already in use");
      }
    }

    // Update invite
    await prisma.userInvite.update({
      where: { id: data.id },
      data: {
        email: data.email,
        firstName: data.firstName || invite.firstName,
        lastName: data.lastName || invite.lastName,
        roleId: data.roleId,
      },
    });
  }

  return { success: true };
}
