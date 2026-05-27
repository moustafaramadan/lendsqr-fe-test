import "./DetailSection.scss";

// Reusable detail section layout for user profile data.
// It groups multiple InfoCard items under a shared heading.
export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <div className="detail-grid">{children}</div>
    </section>
  );
}

export function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="info-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
