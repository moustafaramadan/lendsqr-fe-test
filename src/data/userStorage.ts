import type { User } from "../types";

// Local storage helpers for caching user details in the browser.
const keyForUser = (id: number) => `frontend-task:user:${id}`;

export function readStoredUser(id: number): User | null {
  const value = window.localStorage.getItem(keyForUser(id));
  if (!value) return null;

  try {
    return JSON.parse(value) as User;
  } catch {
    window.localStorage.removeItem(keyForUser(id));
    return null;
  }
}

export function storeUser(user: User) {
  window.localStorage.setItem(keyForUser(user.id), JSON.stringify(user));
}
