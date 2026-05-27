import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Database,
  FileText,
  HandCoins,
  Home,
  LogOut,
  Menu,
  PiggyBank,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { navigate, type Route } from "../../navigation";
import { Logo } from "../common/Logo";
import profileImage from "../../assets/image 4.png";
import "./Shell.scss";

// Shell component provides the application layout around the main content.
// It includes the sidebar menu, top bar, and logout actions.
export function Shell({
  children,
  route,
  onLogout,
}: {
  children: React.ReactNode;
  route: Route["name"];
  onLogout: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <div className="top-search">
          <input placeholder="Search for anything" />
          <button aria-label="Search" type="button">
            <Search size={16} strokeWidth={2.8} />
          </button>
        </div>
        <div className="topbar-actions">
          <a href="https://docs.lendsqr.com/" target="_blank" rel="noreferrer">
            Docs
          </a>
          <button
            className="plain-icon"
            aria-label="Notifications"
            type="button"
          >
            <Bell size={20} />
          </button>
          <img className="avatar" src={profileImage} alt="" />
          <button className="user-menu" type="button">
            Adedeji <ChevronDown size={16} />
          </button>
        </div>
      </header>
      <aside className={`sidebar ${isMobileMenuOpen ? "menu-open" : ""}`}>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          type="button"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={18} />
          Menu
          <ChevronDown size={15} />
        </button>
        <button className="switch-org" type="button">
          <BriefcaseBusiness size={17} />
          Switch Organization
          <ChevronDown size={15} />
        </button>
        <NavItem
          active={route === "dashboard"}
          icon={<Home size={17} />}
          label="Dashboard"
          path="/dashboard"
          onNavigate={() => setIsMobileMenuOpen(false)}
        />
        <nav>
          <SidebarGroup title="Customers" />
          <NavItem
            active={route === "users" || route === "userDetail"}
            icon={<Users size={17} />}
            label="Users"
            path="/users"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<UsersRound size={17} />}
            label="Guarantors"
            path="/users"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<HandCoins size={17} />}
            label="Loans"
            path="/users"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<SlidersHorizontal size={17} />}
            label="Decision Models"
            path="/users"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<PiggyBank size={17} />}
            label="Savings"
            path="/users"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<FileText size={17} />}
            label="Loan Requests"
            path="/users"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<ShieldCheck size={17} />}
            label="Whitelist"
            path="/users"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<Database size={17} />}
            label="Karma"
            path="/users"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <SidebarGroup title="Businesses" />
          <NavItem
            icon={<BriefcaseBusiness size={17} />}
            label="Organization"
            path="/dashboard"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<HandCoins size={17} />}
            label="Loan Products"
            path="/dashboard"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            icon={<PiggyBank size={17} />}
            label="Savings Products"
            path="/dashboard"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
          <SidebarGroup title="Settings" />
          <NavItem
            icon={<SlidersHorizontal size={17} />}
            label="Preferences"
            path="/dashboard"
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
        </nav>
        <button
          className="nav-item logout desktop-logout"
          onClick={onLogout}
          type="button"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </aside>
      <div className="main-area">{children}</div>
      <footer className="mobile-footer">
        <button
          className="nav-item logout mobile-logout"
          onClick={onLogout}
          type="button"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </footer>
    </div>
  );
}

function SidebarGroup({ title }: { title: string }) {
  return <p className="sidebar-group">{title}</p>;
}

function NavItem({
  active = false,
  icon,
  label,
  path,
  onNavigate,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  path: string;
  onNavigate?: () => void;
}) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={() => {
        navigate(path);
        onNavigate?.();
      }}
      type="button"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
