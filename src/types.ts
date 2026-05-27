// Shared domain types used throughout the application.
// These types define user data shapes and request filters.
export type UserStatus = "Active" | "Pending" | "Blocked";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  city: string;
  country: string;
  status: UserStatus;
  joinedAt: string;
  lastActiveAt: string;
  revenue: number;
  avatar: string;
  notes: string;
};

export type UserFilters = {
  query: string;
  organization?: string;
  date?: string;
  status: "All" | UserStatus;
  page: number;
  pageSize: number;
};

export type UserListResponse = {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
};
