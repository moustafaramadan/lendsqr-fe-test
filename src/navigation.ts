export type Route =
  | { name: "login" }
  | { name: "dashboard" }
  | { name: "users" }
  | { name: "userDetail"; id: number };

// Parse the current location hash into a Route object.
// This simple router supports login, dashboard, user list, and user detail pages.
export function parseRoute(): Route {
  const hash = window.location.hash.replace("#", "") || "/login";
  const detailMatch = hash.match(/^\/users\/(\d+)$/);
  if (detailMatch) return { name: "userDetail", id: Number(detailMatch[1]) };
  if (hash === "/dashboard") return { name: "dashboard" };
  if (hash === "/users") return { name: "users" };
  return { name: "login" };
}

// Navigate by updating the hash fragment in the browser address bar.
export function navigate(path: string) {
  window.location.hash = path;
}
