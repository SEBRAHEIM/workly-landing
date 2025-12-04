import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

const studentNavItems = [
  { key: "home", label: "Home", href: "/dashboard/student" },
  {
    key: "browse",
    label: "Browse creators",
    href: "/dashboard/student/browse",
  },
  { key: "projects", label: "My projects", disabled: true },
  { key: "messages", label: "Messages", disabled: true },
  { key: "wallet", label: "Wallet", disabled: true },
  { key: "settings", label: "Settings", disabled: true },
];

export default function StudentDashboardShell({
  active,
  title,
  subtitle = "",
  children,
}) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.replace("/login");
        return;
      }
      setUserEmail(data.user.email || "");
      setLoadingUser(false);
    }

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const handleNavClick = (item) => {
    if (item.disabled || !item.href) return;
    router.push(item.href);
  };

  if (loadingUser) {
    return (
      <div className="dashboard-loading">
        <p>Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">WORKLY · STUDENT</div>
        <nav className="dashboard-nav">
          {studentNavItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`dashboard-nav-link${active === item.key ? " is-active" : ""}`}
              disabled={item.disabled}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
              {item.disabled && (
                <span className="dashboard-nav-note">Coming soon</span>
              )}
            </button>
          ))}
        </nav>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-kicker">Workly workspace</p>
            <h1 className="dashboard-page-title">{title}</h1>
            {subtitle && (
              <p className="dashboard-page-sub">{subtitle}</p>
            )}
          </div>
          <div className="dashboard-user">
            <span className="dashboard-email">{userEmail}</span>
            <button type="button" className="dashboard-logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </header>
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
