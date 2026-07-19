import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components";
import { useAuth } from "@/auth/AuthContext";
import "./AppShell.css";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/projects", label: "Projects", end: false },
  { to: "/showcase", label: "Components", end: false },
];

export function AppShell() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <span className="app-shell__brand">Boilerplate</span>
        <nav className="app-shell__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                ["app-shell__nav-link", isActive && "app-shell__nav-link--active"]
                  .filter(Boolean)
                  .join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="app-shell__user">
          <span className="app-shell__user-name">{user?.name}</span>
          <Button variant="ghost" size="sm" onClick={() => void logout()}>
            Sign out
          </Button>
        </div>
      </header>
      <main className="app-shell__main">
        <Outlet />
      </main>
    </div>
  );
}
