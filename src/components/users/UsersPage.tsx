import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { getUsers } from "../../data/mockApi";
import type { User, UserFilters } from "../../types";
import { LoadingState } from "../common/State";
import { StatsGrid } from "../dashboard/StatsGrid";
import { UserRow } from "./UserRow";
import { organizations } from "./userListHelpers";
import "../common/Page.scss";
import "./UsersPage.scss";

// Users page with filtering, pagination, and list rendering.
// This component fetches user records and allows the user to refine results.
export function UsersPage() {
  const initialPageSize = getInitialPageSize();
  const [filters, setFilters] = useState<UserFilters>({
    query: "",
    organization: "All",
    date: "",
    status: "All",
    page: 1,
    pageSize: initialPageSize,
  });
  const [draftFilters, setDraftFilters] = useState({
    query: "",
    organization: "All",
    date: "",
    status: "All" as UserFilters["status"],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));

  useEffect(() => {
    setLoading(true);
    getUsers(filters).then((response) => {
      setUsers(response.users);
      setTotal(response.total);
      setLoading(false);
    });
  }, [filters]);

  function applyFilters(event: React.FormEvent) {
    event.preventDefault();
    setFilters((current) => ({
      ...current,
      query: draftFilters.query,
      organization: draftFilters.organization,
      date: draftFilters.date,
      status: draftFilters.status,
      page: 1,
    }));
    setIsFilterOpen(false);
  }

  function resetFilters() {
    const reset = {
      query: "",
      organization: "All",
      date: "",
      status: "All" as const,
    };
    setDraftFilters(reset);
    setFilters((current) => ({
      ...current,
      ...reset,
      page: 1,
    }));
    setIsFilterOpen(false);
  }

  return (
    <main className="content-grid users-page">
      <h1 className="page-title">Users</h1>
      <StatsGrid />
      <section className="panel users-panel">
        {loading ? (
          <LoadingState label="Loading users" />
        ) : (
          <>
            <div className="users-table">
              <button
                className="mobile-filter-button"
                onClick={() => setIsFilterOpen((open) => !open)}
                type="button"
              >
                <Filter size={14} />
                Filter users
              </button>
              <div className="table-head">
                {[
                  "Organization",
                  "Username",
                  "Email",
                  "Phone Number",
                  "Date Joined",
                  "Status",
                ].map((heading) => (
                  <span key={heading}>
                    {heading}{" "}
                    <button
                      aria-label={`Filter by ${heading}`}
                      className="filter-trigger"
                      onClick={() => setIsFilterOpen((open) => !open)}
                      type="button"
                    >
                      <Filter size={13} />
                    </button>
                  </span>
                ))}
                <span />
              </div>
              {isFilterOpen && (
                <form className="filter-popover" onSubmit={applyFilters}>
                  <label>
                    Organization
                    <select
                      value={draftFilters.organization}
                      onChange={(event) =>
                        setDraftFilters((current) => ({
                          ...current,
                          organization: event.target.value,
                        }))
                      }
                    >
                      <option>All</option>
                      {organizations.map((organization) => (
                        <option key={organization}>{organization}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Username
                    <input
                      placeholder="Search username"
                      value={draftFilters.query}
                      onChange={(event) =>
                        setDraftFilters((current) => ({
                          ...current,
                          query: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Email
                    <input
                      placeholder="Search email"
                      value={draftFilters.query}
                      onChange={(event) =>
                        setDraftFilters((current) => ({
                          ...current,
                          query: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Date
                    <input
                      type="date"
                      value={draftFilters.date}
                      onChange={(event) =>
                        setDraftFilters((current) => ({
                          ...current,
                          date: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label>
                    Status
                    <select
                      value={draftFilters.status}
                      onChange={(event) =>
                        setDraftFilters((current) => ({
                          ...current,
                          status: event.target.value as UserFilters["status"],
                        }))
                      }
                    >
                      <option>All</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Blocked</option>
                    </select>
                  </label>
                  <div className="filter-actions">
                    <button
                      className="filter-reset"
                      onClick={resetFilters}
                      type="button"
                    >
                      Reset
                    </button>
                    <button className="filter-apply" type="submit">
                      Filter
                    </button>
                  </div>
                </form>
              )}
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </div>
            <div className="pagination">
              <span>
                Showing{" "}
                <strong className="page-size-pill">
                  {filters.pageSize} <ChevronDown size={14} />
                </strong>{" "}
                out of {total.toLocaleString()}
              </span>
              <div>
                <button
                  className="page-button"
                  disabled={filters.page <= 1}
                  onClick={() =>
                    setFilters((current) => ({
                      ...current,
                      page: current.page - 1,
                    }))
                  }
                  type="button"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>
                <strong>
                  {filters.page} / {totalPages}
                </strong>
                <button
                  className="page-button"
                  disabled={filters.page >= totalPages}
                  onClick={() =>
                    setFilters((current) => ({
                      ...current,
                      page: current.page + 1,
                    }))
                  }
                  type="button"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function getInitialPageSize() {
  return window.matchMedia("(max-width: 760px)").matches ? 6 : 10;
}
