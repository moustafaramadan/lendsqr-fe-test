import type { User, UserFilters, UserListResponse, UserStatus } from "../types";

// A lightweight mock API with in-memory generated users.
// This file simulates network latency and returns predictable test data.
const firstNames = [
  "Olivia",
  "Liam",
  "Emma",
  "Noah",
  "Ava",
  "Ethan",
  "Mia",
  "Lucas",
  "Sophia",
  "Mason",
  "Amelia",
  "Logan",
];

const lastNames = [
  "Carter",
  "Morgan",
  "Bennett",
  "Reed",
  "Foster",
  "Parker",
  "Brooks",
  "Hayes",
  "Sullivan",
  "Gray",
];

const companies = [
  "Northstar Labs",
  "Vertex Systems",
  "BrightPath",
  "Orbit Finance",
  "Cloudbridge",
  "Nexa Retail",
  "Atlas Health",
  "PulseWorks",
];

const organizations = [
  "Lendsqr",
  "Irorun",
  "Lendstar",
  "Renmoney",
  "Carbon",
  "Migo",
  "QuickCheck",
];

const roles = [
  "Admin",
  "Manager",
  "Designer",
  "Developer",
  "Analyst",
  "Support",
];
const cities = [
  "New York",
  "Austin",
  "Seattle",
  "Chicago",
  "Boston",
  "Denver",
  "San Diego",
  "Miami",
];
const statuses: UserStatus[] = ["Active", "Pending", "Blocked"];

const day = 24 * 60 * 60 * 1000;
let usersCache: User[] | null = null;

const wait = (ms = 260) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

function generateUsers(): User[] {
  if (usersCache) return usersCache;

  usersCache = Array.from({ length: 500 }, (_, index) => {
    const id = index + 1;
    const first = firstNames[index % firstNames.length];
    const last = lastNames[(index * 7) % lastNames.length];
    const joined = new Date(Date.now() - (index + 12) * day);
    const lastActive = new Date(Date.now() - (index % 18) * day);
    const status = statuses[index % statuses.length];

    return {
      id,
      name: `${first} ${last}`,
      email: `${first}.${last}${id}@example.com`.toLowerCase(),
      phone: `+1 (555) ${String(100 + (index % 800)).padStart(3, "0")}-${String(1000 + index).slice(-4)}`,
      company: companies[index % companies.length],
      role: roles[index % roles.length],
      city: cities[index % cities.length],
      country: "United States",
      status,
      joinedAt: joined.toISOString(),
      lastActiveAt: lastActive.toISOString(),
      revenue: 1200 + ((index * 173) % 19000),
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(`${first} ${last}`)}&backgroundColor=2563eb,14b8a6,f59e0b`,
      notes:
        status === "Active"
          ? "High engagement account with recent activity."
          : status === "Pending"
            ? "Awaiting onboarding completion and document review."
            : "Restricted account pending support review.",
    };
  });

  return usersCache;
}

export async function getUsers(
  filters: UserFilters,
): Promise<UserListResponse> {
  await wait();
  const source = generateUsers();
  const query = filters.query.trim().toLowerCase();

  const filtered = source.filter((user) => {
    const organization =
      organizations[user.id % organizations.length].toLowerCase();
    const matchesStatus =
      filters.status === "All" || user.status === filters.status;
    const matchesOrganization =
      !filters.organization ||
      filters.organization === "All" ||
      organization === filters.organization.toLowerCase();
    const matchesDate =
      !filters.date || user.joinedAt.slice(0, 10) === filters.date;
    const matchesQuery =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.company.toLowerCase().includes(query);

    return matchesStatus && matchesOrganization && matchesDate && matchesQuery;
  });

  const start = (filters.page - 1) * filters.pageSize;
  return {
    users: filtered.slice(start, start + filters.pageSize),
    total: filtered.length,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export async function getUserById(id: number): Promise<User | undefined> {
  await wait(180);
  return generateUsers().find((user) => user.id === id);
}

export async function getDashboardStats() {
  await wait(200);
  const users = generateUsers();
  const active = users.filter((user) => user.status === "Active").length;
  const pending = users.filter((user) => user.status === "Pending").length;
  const revenue = users.reduce((sum, user) => sum + user.revenue, 0);
  const recentUsers = [...users]
    .sort(
      (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
    )
    .slice(0, 6);

  return { total: users.length, active, pending, revenue, recentUsers };
}
