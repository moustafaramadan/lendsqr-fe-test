import { afterEach, describe, expect, it, vi } from "vitest";
import { getUserById, getUsers } from "./mockApi";

const defaultFilters = {
  query: "",
  status: "All" as const,
  page: 1,
  pageSize: 10,
};

describe("mockApi", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the first page from a 500 user mock dataset", async () => {
    vi.useFakeTimers();

    const request = getUsers(defaultFilters);
    await vi.advanceTimersByTimeAsync(260);
    const response = await request;

    expect(response.total).toBe(500);
    expect(response.users).toHaveLength(10);
    expect(response.users[0]).toMatchObject({
      id: 1,
      status: "Active",
    });
  });

  it("returns an empty page when no users match the query", async () => {
    vi.useFakeTimers();

    const request = getUsers({
      ...defaultFilters,
      query: "not-a-real-user-query",
    });
    await vi.advanceTimersByTimeAsync(260);
    const response = await request;

    expect(response.total).toBe(0);
    expect(response.users).toEqual([]);
  });

  it("returns undefined for a missing user detail record", async () => {
    vi.useFakeTimers();

    const request = getUserById(9999);
    await vi.advanceTimersByTimeAsync(180);
    const user = await request;

    expect(user).toBeUndefined();
  });
});
