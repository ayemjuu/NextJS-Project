import { NavigationMenuDemo } from "./components/NavigationRoute";

export default function AccessManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <NavigationMenuDemo />
      {children}
    </div>
  );
}
