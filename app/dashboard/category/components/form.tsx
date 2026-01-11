"use client";

import { Button } from "@/components/ui/button";
import { createCategory } from "../actions";

export default function CategoryForm() {
  return (
    <form action={createCategory} className="flex gap-2 items-end">
      <input
        name="name"
        placeholder="Category name"
        className="border p-2 rounded"
        required
      />
      <input name="icon" placeholder="☕" className="border p-2 rounded w-20" />
      <input
        name="color"
        placeholder="#6F4E37"
        className="border p-2 rounded w-32"
      />

      {/* <button className="bg-black text-white px-4 py-2 rounded">Add</button> */}
      <Button type="submit">Add Category</Button>
    </form>
  );
}
