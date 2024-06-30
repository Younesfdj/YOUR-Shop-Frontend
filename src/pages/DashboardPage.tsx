import { useUser } from "../hooks/useUser";
import { Toaster } from "../components/ui/toaster";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div>
      DashboardPage
      <h1>Welcome, {user?.UserName}!</h1>
      <Toaster />
    </div>
  );
}
