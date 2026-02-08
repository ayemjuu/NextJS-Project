"use client";

import { useState } from "react";
import { Category } from "@/app/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import { CustomModal } from "@/components/CustomModal";
import { usePermission } from "@/app/(auth)/AuthProvider";
import NoPermission from "../no-permission";
import CategoryTable from "./components/categoryTable";
import CategoryForm from "./components/categoryForm";
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(50),
  description: z.string().optional(),
  icon: z.string().max(5).optional(),
  color: z
    .string()
    // .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid hex color")
    .optional(),
});
export type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CategoryClient({
  categories,
}: {
  categories: Category[];
}) {
  const { can, permissions } = usePermission();

  console.log("User permissions:", permissions);
  console.log(
    "User permissions:",
    can("category:read"),
    can("category:create"),
    can("category:update"),
    can("category:delete"),
  );

  if (!can("category:read")) return <NoPermission />;

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const openCreate = () => {
    if (!can("category:create")) return;
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (category: Category) => {
    if (!can("category:update")) return;
    setEditing(category);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setEditing(null), 200);
  };

  return (
    <div className="p-6 space-y-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>

        {can("category:create") && (
          <Button onClick={openCreate}>Add Category</Button>
        )}
      </div>

      <CategoryTable categories={categories} onEdit={openEdit} />

      <CustomModal
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Edit Category" : "Add Category"}
      >
        <CategoryForm
          key={editing?.id ?? "new"}
          category={editing}
          onSuccess={closeModal}
        />
      </CustomModal>
    </div>
  );
}
