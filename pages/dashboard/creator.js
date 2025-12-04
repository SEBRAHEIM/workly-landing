import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function CreatorDashboard() {
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

  const metrics = [
    { label: "Open tasks", value: "0" },
    { label: "Delivered this month", value: "0" },
    { label: "Completed all time", value: "0" },
    { label: "Total earned (AED)", value: "0" },
  ];

  const tasks = [];

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="app-brand">
          <span className="app-brand-logo">W</span>
          <span className="app-brand-text">Workly · Creator</span>
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
            <button className="sidebar-link is-active">Home</button>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Work</div>
            <button className="sidebar-link">My tasks</button>
            <button className="sidebar-link">Messages</button>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-title">Account</div>
            <button className="sidebar-link">Earnings</button>
            <button className="sidebar-link">Profile</button>
          </div>
        </aside>

        <main className="app-main">
          <section className="dash-section">
            <h1 className="dash-section-title">Overview</h1>
            <p className="dash-section-sub">
              See your tasks, delivery status and earnings at a glance.
            </p>
            <div className="dash-metrics-row">
              {metrics.map((m) => (
                <div key={m.label} className="dash-metric-card">
                  <div className="dash-metric-label">{m.label}</div>
                  <div className="dash-metric-value">{m.value}</div>
                  <div className="dash-metric-caption">Updated daily</div>
                </div>
              ))}
            </div>
          </section>

          <div className="dash-main-grid">
            <section className="dash-column-left">
              <div className="dash-card">
                <div className="dash-card-head">
                  <div>
                    <h2 className="dash-card-title">My tasks</h2>
                    <p className="dash-card-sub">
                      Tasks assigned to you or accepted by you will appear here.
                    </p>
                  </div>
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
                        Once you are approved as a creator, the admin will start
                        assigning student projects to you.
                      </p>
                    </div>
                  ) : (
                    tasks.map((t) => (
                      <div className="dash-table-row" key={t.id}>
                        <span>{t.title}</span>
                        <span>
                          <span className={"status-pill status-" + t.status}>
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
                <h2 className="dash-card-title">Earnings</h2>
                <p className="dash-card-sub">
                  When you finish tasks and get paid, amounts will appear here.
                </p>
                <div className="wallet-main-amount">AED 0.00</div>
                <p className="wallet-caption">Total earned on Workly</p>

                <div className="wallet-list">
                  <div className="wallet-row-header">
                    <span>Withdrawal history</span>
                    <span className="wallet-badge">Soon</span>
                  </div>
                  <p className="wallet-empty">
                    Every time an admin pays you, the record will show up in
                    this list.
                  </p>
                </div>
              </div>

              <div className="dash-card">
                <h2 className="dash-card-title">Activity</h2>
                <p className="dash-card-sub">
                  When students approve, request changes, or send messages, you
                  will see it here.
                </p>
                <div className="activity-empty">
                  <p>No activity yet.</p>
                  <p className="activity-empty-sub">
                    Finish your profile and wait for the first project to be
                    assigned to you.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
