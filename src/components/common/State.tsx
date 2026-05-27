import { navigate } from "../../navigation";
import "./State.scss";
import "./Buttons.scss";

// Reusable loading and empty states used across multiple pages.
export function LoadingState({ label }: { label: string }) {
  return <div className="state-box">{label}...</div>;
}

export function EmptyState() {
  return (
    <main className="content-grid">
      <section className="state-box">
        <strong>User not found</strong>
        <button
          className="secondary-button"
          onClick={() => navigate("/users")}
          type="button"
        >
          Return to users
        </button>
      </section>
    </main>
  );
}
