// export default function Category() {
//   return <div>Category</div>;
// }

//server
import prisma from "@/lib/prisma";
import CategoryForm from "./components/form";
import CategoriesTable from "./components/categoryTable";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  console.log("categories:", categories);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Categories</h1>
      <CategoryForm />
      <CategoriesTable categories={categories} />
    </div>
  );
}
