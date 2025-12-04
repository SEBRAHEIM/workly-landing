import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

const creatorNav = [
  { key: "home", label: "Home" },
  { key: "tasks", label: "My tasks", disabled: true },
  { key: "earnings", label: "Earnings", disabled: true },
  { key: "profile", label: "Profile", disabled: true },
  { key: "settings", label: "Settings", disabled: true },
];

export default function CreatorDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.replace("/login");
        return;
      }
      setUserEmail(data.user.email || "");
      setLoadingUser(false);
    }
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const metrics = [
    { label: "Open tasks", value: "0" },
    { label: "Deliveries this week", value: "0" },
    { label: "Earnings this month (AED)", value: "0" },
  ];

  const tasks = [];

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
        <div className="dashboard-brand">WORKLY · CREATOR</div>
        <nav className="dashboard-nav">
          {creatorNav.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`dashboard-nav-link${
                item.key === "home" ? " is-active" : ""
              }`}
              disabled={item.disabled}
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
            <p className="dashboard-kicker">Creator workspace</p>
            <h1 className="dashboard-page-title">Creator dashboard</h1>
            <p className="dashboard-page-sub">
              Accept student projects, deliver on time, and watch your balance
              grow.
            </p>
          </div>
          <div className="dashboard-user">
            <span className="dashboard-email">{userEmail}</span>
            <button type="button" className="dashboard-logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dash-section">
            <h2 className="dash-section-title">Pipeline snapshot</h2>
            <p className="dash-section-sub">
              Metrics refresh as soon as a student approves or requests edits.
            </p>
            <div className="dash-metrics-row dash-metrics-row-3">
              {metrics.map((m) => (
                <div key={m.label} className="dash-metric-card">
                  <div className="dash-metric-label">{m.label}</div>
                  <div className="dash-metric-value">{m.value}</div>
                  <div className="dash-metric-caption">Live data</div>
                </div>
              ))}
            </div>
          </section>

          <div className="dash-main-grid">
            <section className="dash-column-left">
              <div className="dash-card">
                <div className="dash-card-head">
                  <div>
                    <h3 className="dash-card-title">Open tasks</h3>
                    <p className="dash-card-sub">
                      Assignments that require your attention right now.
                    </p>
                  </div>
                  <Link href="/dashboard/creator/pricing" className="dash-link-btn">
                    Update pricing
                  </Link>
                </div>
                <div className="dash-table">
                  <div className="dash-table-header">
                    <span>Project</span>
                    <span>Status</span>
                    <span>Deadline</span>
                  </div>
                  {tasks.length === 0 ? (
                    <div className="dash-table-empty">
                      <p>No tasks yet.</p>
                      <p className="dash-table-empty-sub">
                        Once your creator profile is approved, you will see
                        assigned reports, PPTs, or coding work here.
                      </p>
                    </div>
                  ) : (
                    tasks.map((t) => (
                      <div className="dash-table-row" key={t.id}>
                        <span>{t.title}</span>
                        <span>
                          <span className={`status-pill status-${t.status}`}>
                            {t.statusLabel}
                          </span>
                        </span>
                        <span>{t.deadline}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            <section className="dash-column-right">
              <div className="dash-card">
                <h3 className="dash-card-title">Earnings</h3>
                <p className="dash-card-sub">
                  Delivered tasks and approved revisions will appear as pending
                  payouts.
                </p>
                <div className="wallet-main-amount">AED 0.00</div>
                <p className="wallet-caption">Pending payout</p>
                <div className="wallet-list">
                  <div className="wallet-row-header">
                    <span>Withdrawal history</span>
                    <span className="wallet-badge">Coming soon</span>
                  </div>
                  <p className="wallet-empty">
                    We'll list every payout once the finance team processes it.
                  </p>
                </div>
              </div>

              <div className="dash-card">
                <h3 className="dash-card-title">Messages &amp; activity</h3>
                <p className="dash-card-sub">
                  Feedback from students shows up here so everything stays in
                  one place.
                </p>
                <div className="activity-empty">
                  <p>No updates yet.</p>
                  <p className="activity-empty-sub">
                    Finish onboarding and wait for your first project to be
                    assigned.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
