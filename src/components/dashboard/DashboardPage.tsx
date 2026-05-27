import { useEffect, useState } from "react";
import { getDashboardStats } from "../../data/mockApi";
import { navigate } from "../../navigation";
import { LoadingState } from "../common/State";
import { StatsGrid } from "./StatsGrid";
import { UserRow } from "../users/UserRow";
import "../common/Buttons.scss";
import "../common/Page.scss";
import "./DashboardPage.scss";

// Dashboard view that loads statistics and shows recent users.
// This page is displayed inside the app shell when the dashboard route is active.
export function DashboardPage() {
  const [stats, setStats] = useState<Awaited<
    ReturnType<typeof getDashboardStats>
  > | null>(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <LoadingState label="Loading dashboard" />;

  return (
    <main className="content-grid">
      <h1 className="page-title">Users</h1>
      <StatsGrid total={stats.total} active={stats.active} />
      <section className="panel">
        <div className="panel-heading">
          <h2>Recent users</h2>
          <button
            className="secondary-button"
            onClick={() => navigate("/users")}
            type="button"
          >
            View all
          </button>
        </div>
        <div className="recent-list">
          {stats.recentUsers.map((user) => (
            <UserRow compact key={user.id} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
}
