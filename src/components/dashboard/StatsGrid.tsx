import statLoansIcon from "../../assets/icons/icon.png";
import statSavingsIcon from "../../assets/icons/icon (1).png";
import statUsersIcon from "../../assets/icons/np_users_1248631_000000 1.png";
import statActiveUsersIcon from "../../assets/icons/np_users_1977590_000000 1.png";
import "./StatsGrid.scss";

export function StatsGrid({
  total = 500,
  active = 167,
}: {
  total?: number;
  active?: number;
}) {
  return (
    <section className="stats-grid">
      <StatCard
        tone="purple"
        title="Users"
        value={total.toLocaleString()}
        icon={<img src={statUsersIcon} alt="" />}
      />
      <StatCard
        tone="blue"
        title="Active Users"
        value={active.toLocaleString()}
        icon={<img src={statActiveUsersIcon} alt="" />}
      />
      <StatCard
        tone="orange"
        title="Users With Loans"
        value="355"
        icon={<img src={statLoansIcon} alt="" />}
      />
      <StatCard
        tone="red"
        title="Users With Savings"
        value="402"
        icon={<img src={statSavingsIcon} alt="" />}
      />
    </section>
  );
}

function StatCard({
  title,
  value,
  icon,
  tone,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  tone: string;
}) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <p>{title}</p>
      <strong>{value}</strong>
    </article>
  );
}
