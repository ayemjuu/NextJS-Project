"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const categories = await prisma.category.findMany({
  orderBy: { createdAt: "desc" },
});
console.log(categories);

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;
  const icon = formData.get("icon") as string | null;
  const color = formData.get("color") as string | null;

  if (!name) throw new Error("Name is required");

  await prisma.category.create({
    data: {
      name,
      description,
      icon,
      color,
    },
  });

  revalidatePath("/categories");
}

export async function updateCategory(id: number, formData: FormData) {
  await prisma.category.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string | null,
      icon: formData.get("icon") as string | null,
      color: formData.get("color") as string | null,
    },
  });

  revalidatePath("/categories");
}

export async function deleteCategory(id: number) {
  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/categories");
}
