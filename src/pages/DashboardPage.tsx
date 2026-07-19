import { Card } from "@/components";
import { useAuth } from "@/auth/AuthContext";
import { useProjects } from "@/features/projects/queries";
import "./DashboardPage.css";

export function DashboardPage() {
  const { user } = useAuth();
  const { data } = useProjects({ page: 1, limit: 1 });

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Welcome, {user?.name}</h1>
      <p className="dashboard__subtitle">
        This is a generic starting point. Replace this dashboard with your own product overview.
      </p>

      <div className="dashboard__cards">
        <Card title="Projects">
          <span className="dashboard__big-number">{data?.pagination?.total ?? "—"}</span>
          <p className="dashboard__card-hint">Total records in the example resource</p>
        </Card>
        <Card title="Session">
          <span className="dashboard__big-number">{user?.roles.join(", ") || "none"}</span>
          <p className="dashboard__card-hint">Roles attached to your access token</p>
        </Card>
      </div>
    </div>
  );
}
