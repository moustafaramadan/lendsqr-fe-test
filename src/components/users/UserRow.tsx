import { MoreVertical } from "lucide-react";
import { formatDate } from "../../formatters";
import { navigate } from "../../navigation";
import type { User } from "../../types";
import { organizations } from "./userListHelpers";
import "./UserRow.scss";

// Single user row component that navigates to the detail view on click.
// The compact mode is used for recent items on the dashboard page.
export function UserRow({
  user,
  compact = false,
}: {
  user: User;
  compact?: boolean;
}) {
  const username = user.email.split("@")[0].replace(".", "");
  const organization =
    organizations[user.id % organizations.length].toLowerCase();

  if (compact) {
    return (
      <button
        className="recent-row"
        onClick={() => navigate(`/users/${user.id}`)}
        type="button"
      >
        <img src={user.avatar} alt="" />
        <span>{user.name}</span>
        <span>{user.email}</span>
        <span className={`status ${user.status.toLowerCase()}`}>
          {user.status}
        </span>
      </button>
    );
  }

  return (
    <button
      className="user-row"
      onClick={() => navigate(`/users/${user.id}`)}
      type="button"
    >
      <span className="user-row-org" data-label="Org">
        {organization}
      </span>
      <span className="user-row-name" data-label="User">
        {username}
      </span>
      <span className="user-row-email" data-label="Email">
        {user.email}
      </span>
      <span className="user-row-phone" data-label="Phone">
        {user.phone}
      </span>
      <span className="user-row-date" data-label="Joined">
        {formatDate.format(new Date(user.joinedAt))}
      </span>
      <span className={`status ${user.status.toLowerCase()}`}>
        {user.status}
      </span>
      <MoreVertical className="row-action" size={18} />
    </button>
  );
}
