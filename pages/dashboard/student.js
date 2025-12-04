import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function StudentDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.replace("/login");
        return;
      }
      setUserEmail(data.user.email || "");
    };
    run();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <div className="dash-full">
      <header className="dash-topbar">
        <div className="dash-brand">WORKLY · STUDENT</div>
        <div className="dash-user">
          <span className="dash-user-email">{userEmail}</span>
          <button className="dash-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-inner">
          <div className="dash-columns">
            <section className="dash-left">
              <div className="dash-metrics-row">
                <div className="dash-metric-card">
                  <p className="dash-metric-label">Active projects</p>
                  <p className="dash-metric-value">0</p>
                  <p className="dash-metric-caption">This semester</p>
                </div>
                <div className="dash-metric-card">
                  <p className="dash-metric-label">In review / delivered</p>
                  <p className="dash-metric-value">0</p>
                  <p className="dash-metric-caption">Waiting on creators</p>
                </div>
                <div className="dash-metric-card">
                  <p className="dash-metric-label">Completed</p>
                  <p className="dash-metric-value">0</p>
                  <p className="dash-metric-caption">All time</p>
                </div>
                <div className="dash-metric-card">
                  <p className="dash-metric-label">Total spent</p>
                  <p className="dash-metric-value">AED 0</p>
                  <p className="dash-metric-caption">Across all projects</p>
                </div>
              </div>

              <section className="dash-section">
                <div className="dash-section-head">
                  <div>
                    <h2 className="dash-section-title">My projects</h2>
                    <p className="dash-section-sub">
                      Track everything from upload to final delivery.
                    </p>
                  </div>
                  <div className="dash-section-actions">
                    <button className="dash-primary-btn">
                      Upload new project
                    </button>
                    <button className="dash-ghost-btn">
                      View completed projects
                    </button>
                  </div>
                </div>

                <div className="dash-table-empty">
                  <h3>No projects yet</h3>
                  <p>
                    When you upload your first rubric, it will appear here with
                    status, deadline, and creator details.
                  </p>
                  <button className="dash-primary-btn">
                    Upload your first project
                  </button>
                </div>

                {false && (
                  <div className="dash-table">
                    <div className="dash-table-header">
                      <span>Project</span>
                      <span>Status</span>
                      <span>Deadline</span>
                      <span>Price</span>
                      <span>Creator</span>
                      <span></span>
                    </div>
                    <div className="dash-table-row">
                      <div className="dash-table-main">
                        <p className="dash-project-title">
                          Marketing report – Week 6
                        </p>
                        <p className="dash-project-meta">
                          Uploaded 2 days ago
                        </p>
                      </div>
                      <span className="dash-badge dash-badge-pending">
                        Pending
                      </span>
                      <span className="dash-project-deadline">
                        12 Dec · in 5 days
                      </span>
                      <span className="dash-project-price">AED 450</span>
                      <span className="dash-project-creator">Creator —</span>
                      <button className="dash-link-btn">View project</button>
                    </div>
                  </div>
                )}
              </section>
            </section>

            <aside className="dash-right">
              <section className="dash-card-pane">
                <h3 className="dash-pane-title">Wallet</h3>
                <p className="dash-pane-sub">
                  Overview of your payments on Workly.
                </p>
                <div className="dash-wallet-main">
                  <div>
                    <p className="dash-wallet-label">Total spent</p>
                    <p className="dash-wallet-value">AED 0</p>
                  </div>
                  <div>
                    <p className="dash-wallet-label">Projects this month</p>
                    <p className="dash-wallet-value-small">0</p>
                  </div>
                </div>
                <div className="dash-divider" />
                <div className="dash-mini-list">
                  <p className="dash-mini-label">Recent payments</p>
                  <p className="dash-mini-empty">
                    You have no payments yet. Once a project is completed, it
                    will appear here.
                  </p>
                </div>
              </section>

              <section className="dash-card-pane">
                <h3 className="dash-pane-title">Activity</h3>
                <p className="dash-pane-sub">
                  Important events from your projects.
                </p>
                <ul className="dash-activity-list">
                  <li className="dash-activity-empty">
                    No activity yet. After you upload a rubric, you will see
                    creator updates and approvals here.
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
