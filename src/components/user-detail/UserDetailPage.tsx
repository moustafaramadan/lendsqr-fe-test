import { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { getUserById } from "../../data/mockApi";
import { readStoredUser, storeUser } from "../../data/userStorage";
import { formatCurrency } from "../../formatters";
import { navigate } from "../../navigation";
import type { User } from "../../types";
import { EmptyState, LoadingState } from "../common/State";
import { DetailSection, InfoCard } from "./DetailSection";
import "../common/Page.scss";
import "./UserDetailPage.scss";

// User detail page loads a single user and caches the data locally.
// If the user is already stored, it avoids another network request.
export function UserDetailPage({ id }: { id: number }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser(id));
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const stored = readStoredUser(id);
    if (stored) {
      setUser(stored);
      setLoading(false);
      return;
    }

    setLoading(true);
    getUserById(id).then((response) => {
      if (response) storeUser(response);
      setUser(response ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingState label="Loading user details" />;
  if (!user) return <EmptyState />;

  return (
    <main className="detail-layout">
      <button
        className="back-button"
        onClick={() => navigate("/users")}
        type="button"
      >
        <ArrowLeft size={18} /> Back to Users
      </button>
      <div className="detail-header">
        <h1 className="page-title">User Details</h1>
        <div className="detail-actions">
          <button className="danger-outline" type="button">
            Blacklist User
          </button>
          <button className="success-outline" type="button">
            Activate User
          </button>
        </div>
      </div>
      <section className="profile-card">
        <div className="profile-summary">
          <img src={user.avatar} alt="" />
          <div>
            <h2>{user.name}</h2>
            <p>LSQFf587g90</p>
          </div>
          <div className="tier-block">
            <span>User's Tier</span>
            <div className="stars">
              <Star size={14} fill="currentColor" />
              <Star size={14} />
              <Star size={14} />
            </div>
          </div>
          <div>
            <h3>{formatCurrency.format(user.revenue)}</h3>
            <p>9912345678/Providus Bank</p>
          </div>
        </div>
        <div className="profile-tabs">
          {[
            "General Details",
            "Documents",
            "Bank Details",
            "Loans",
            "Savings",
            "App and System",
          ].map((tab, index) => (
            <button
              className={index === 0 ? "active" : ""}
              key={tab}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </section>
      <section className="details-panel">
        <DetailSection title="Personal Information">
          <InfoCard label="Full Name" value={user.name} />
          <InfoCard label="Phone Number" value={user.phone} />
          <InfoCard label="Email Address" value={user.email} />
          <InfoCard label="Bvn" value="12345678901" />
          <InfoCard label="Gender" value={user.id % 2 ? "Female" : "Male"} />
          <InfoCard label="Marital Status" value="Single" />
          <InfoCard label="Children" value="None" />
          <InfoCard label="Type of Residence" value="Parent's Apartment" />
        </DetailSection>
        <DetailSection title="Education and Employment">
          <InfoCard label="Level of Education" value="B.Sc" />
          <InfoCard label="Employment Status" value="Employed" />
          <InfoCard label="Sector of Employment" value="FinTech" />
          <InfoCard label="Duration of Employment" value="2 years" />
          <InfoCard label="Office Email" value={`office.${user.email}`} />
          <InfoCard
            label="Monthly Income"
            value={`${formatCurrency.format(user.revenue / 12)} - ${formatCurrency.format(user.revenue / 7)}`}
          />
          <InfoCard
            label="Loan Repayment"
            value={formatCurrency.format(user.revenue / 18)}
          />
        </DetailSection>
        <DetailSection title="Socials">
          <InfoCard
            label="Twitter"
            value={`@${user.name.split(" ")[0].toLowerCase()}`}
          />
          <InfoCard label="Facebook" value={user.name} />
          <InfoCard
            label="Instagram"
            value={`@${user.name.replace(" ", "").toLowerCase()}`}
          />
        </DetailSection>
        <DetailSection title="Guarantor">
          <InfoCard label="Full Name" value="Grace Effiom" />
          <InfoCard label="Phone Number" value="+1 (555) 881-3381" />
          <InfoCard label="Email Address" value="grace.effiom@example.com" />
          <InfoCard label="Relationship" value="Sister" />
        </DetailSection>
      </section>
    </main>
  );
}
