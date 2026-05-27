import { useEffect, useState } from "react";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { LoginPage } from "./components/login/LoginPage";
import { Shell } from "./components/layout/Shell";
import { UserDetailPage } from "./components/user-detail/UserDetailPage";
import { UsersPage } from "./components/users/UsersPage";
import { navigate, parseRoute, type Route } from "./navigation";

// Root application component that controls routing and authentication state.
// The app displays either the login page or the main shell with dashboard,
// users list, or user detail views based on the current location hash.
export function App() {
  const [route, setRoute] = useState<Route>(parseRoute);
  const [isAuthed, setIsAuthed] = useState(
    () => window.localStorage.getItem("frontend-task:session") === "true",
  );

  useEffect(() => {
    const onRoute = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onRoute);
    return () => window.removeEventListener("hashchange", onRoute);
  }, []);

  useEffect(() => {
    if (!isAuthed && route.name !== "login") navigate("/login");
    if (isAuthed && route.name === "login") navigate("/users");
  }, [isAuthed, route.name]);

  if (route.name === "login") {
    return <LoginPage onLogin={() => setIsAuthed(true)} />;
  }

  return (
    <Shell
      route={route.name}
      onLogout={() => {
        window.localStorage.removeItem("frontend-task:session");
        setIsAuthed(false);
      }}
    >
      {route.name === "dashboard" && <DashboardPage />}
      {route.name === "users" && <UsersPage />}
      {route.name === "userDetail" && <UserDetailPage id={route.id} />}
    </Shell>
  );
}
