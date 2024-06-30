import { Toaster } from "../components/ui/toaster";
import AdminRootLayout from "../components/admin-layout";
export default function DashboardPage() {
  return (
    <div>
      <AdminRootLayout>
        <div className="container mx-auto my-4">
          <h1 className="text-3xl font-bold">Orders</h1>
        </div>
      </AdminRootLayout>
      <Toaster />
    </div>
  );
}
