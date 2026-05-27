import { describe, expect, it } from "vitest";
import type { User } from "../types";
import { readStoredUser, storeUser } from "./userStorage";

const user: User = {
  id: 42,
  name: "Olivia Carter",
  email: "olivia.carter42@example.com",
  phone: "+1 (555) 142-1042",
  company: "Northstar Labs",
  role: "Admin",
  city: "New York",
  country: "United States",
  status: "Active",
  joinedAt: "2026-01-01T00:00:00.000Z",
  lastActiveAt: "2026-01-02T00:00:00.000Z",
  revenue: 12000,
  avatar: "https://example.com/avatar.svg",
  notes: "High engagement account with recent activity.",
};

describe("userStorage", () => {
  it("stores and reads a user detail record from localStorage", () => {
    storeUser(user);

    expect(readStoredUser(user.id)).toEqual(user);
  });

  it("clears invalid stored JSON and returns null", () => {
    window.localStorage.setItem("frontend-task:user:42", "{bad-json");

    expect(readStoredUser(42)).toBeNull();
    expect(window.localStorage.getItem("frontend-task:user:42")).toBeNull();
  });
});
