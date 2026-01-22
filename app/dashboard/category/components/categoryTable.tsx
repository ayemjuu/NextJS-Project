"use client";

import { DataTable, Column } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "../actions";

type Category = {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
};

function CategoryActions({ id }: { id: number }) {
  return (
    <form action={deleteCategory.bind(null, id)}>
      <Button size="sm" variant="destructive">
        Delete
      </Button>
    </form>
  );
}

const columns: Column<Category>[] = [
  {
    key: "icon",
    header: "",
    cell: (row) => <span>{row.icon}</span>,
  },
  {
    key: "name",
    header: "Name",
  },
  {
    key: "description",
    header: "Description",
    className: "text-muted-foreground",
  },
  {
    key: "actions",
    header: "",
    cell: (row) => <CategoryActions id={row.id} />,
  },
];

export default function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  return <DataTable data={categories} keyField="id" columns={columns} />;
}
