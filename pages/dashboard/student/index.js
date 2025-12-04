import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

function StudentShell({ children, active }) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.replace("/login");
        return;
      }
      setUserEmail(data.user.email || "");
    }
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const go = (path) => {
    router.push(path);
  };

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="app-brand">
          <span className="app-brand-logo">W</span>
          <span className="app-brand-text">Workly · Student</span>
        </div>
        <div className="app-topbar-right">
          <span className="app-user-email">{userEmail}</span>
          <button className="app-logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <div className="app-body">
        <aside className="app-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Overview</div>
            <button
              className={
                "sidebar-link" + (active === "home" ? " is-active" : "")
              }
              onClick={() => go("/dashboard/student")}
            >
              Home
            </button>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Work</div>
            <button
              className={
                "sidebar-link" + (active === "browse" ? " is-active" : "")
              }
              onClick={() => go("/dashboard/student/browse")}
            >
              Browse creators
            </button>
            <button className="sidebar-link">My projects</button>
            <button className="sidebar-link">Messages</button>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Account</div>
            <button className="sidebar-link">Wallet</button>
            <button className="sidebar-link">Settings</button>
          </div>
        </aside>

        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}

export default function StudentDashboardHome() {
  const metrics = [
    { label: "Active projects", value: "0" },
    { label: "In review / delivered", value: "0" },
    { label: "Completed", value: "0" },
    { label: "Total spent (AED)", value: "0" },
  ];

  const projects = [];

  return (
    <StudentShell active="home">
      <section className="dash-section">
        <h1 className="dash-section-title">Overview</h1>
        <p className="dash-section-sub">
          Track your projects, approvals and spending on Workly.
        </p>
        <div className="dash-metrics-row">
          {metrics.map((m) => (
            <div key={m.label} className="dash-metric-card">
              <div className="dash-metric-label">{m.label}</div>
              <div className="dash-metric-value">{m.value}</div>
              <div className="dash-metric-caption">This semester</div>
            </div>
          ))}
        </div>
      </section>

      <div className="dash-main-grid">
        <section className="dash-column-left">
          <div className="dash-card">
            <div className="dash-card-head">
              <div>
                <h2 className="dash-card-title">My projects</h2>
                <p className="dash-card-sub">
                  All projects you submit will appear here.
                </p>
              </div>
              <button className="dash-primary-btn">Upload new project</button>
            </div>

            <div className="dash-table">
              <div className="dash-table-header">
                <span>Project</span>
                <span>Status</span>
                <span>Deadline</span>
              </div>
              {projects.length === 0 ? (
                <div className="dash-table-empty">
                  <p>You have no projects yet.</p>
                  <p className="dash-table-empty-sub">
                    Start by uploading a rubric or assessment so a creator can
                    work on it for you.
                  </p>
                </div>
              ) : (
                projects.map((p) => (
                  <div className="dash-table-row" key={p.id}>
                    <span>{p.title}</span>
                    <span>
                      <span className={"status-pill status-" + p.status}>
                        {p.statusLabel}
                      </span>
                    </span>
                    <span>{p.deadline}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="dash-column-right">
          <div className="dash-card">
            <h2 className="dash-card-title">Wallet & payments</h2>
            <p className="dash-card-sub">
              A quick view of what you spent on Workly.
            </p>
            <div className="wallet-main-amount">AED 0.00</div>
            <p className="wallet-caption">Total spent on finished projects</p>

            <div className="wallet-list">
              <div className="wallet-row-header">
                <span>Recent payments</span>
                <span className="wallet-badge">Coming soon</span>
              </div>
              <p className="wallet-empty">
                When you approve a project, payments will appear here.
              </p>
            </div>
          </div>

          <div className="dash-card">
            <h2 className="dash-card-title">Activity</h2>
            <p className="dash-card-sub">
              Important events for your projects will show up here.
            </p>
            <div className="activity-empty">
              <p>No activity yet.</p>
              <p className="activity-empty-sub">
                As soon as you upload your first project and a creator starts
                working on it, you will see updates in this feed.
              </p>
            </div>
          </div>
        </section>
      </div>
    </StudentShell>
  );
}
