import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function CreatorDashboard() {
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
        <div className="dash-brand">WORKLY · CREATOR</div>
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
                  <p className="dash-metric-label">Open tasks</p>
                  <p className="dash-metric-value">0</p>
                  <p className="dash-metric-caption">
                    Tasks you are currently doing
                  </p>
                </div>
                <div className="dash-metric-card">
                  <p className="dash-metric-label">Delivered this month</p>
                  <p className="dash-metric-value">0</p>
                  <p className="dash-metric-caption">Awaiting approval</p>
                </div>
                <div className="dash-metric-card">
                  <p className="dash-metric-label">Completed all time</p>
                  <p className="dash-metric-value">0</p>
                  <p className="dash-metric-caption">Across all students</p>
                </div>
                <div className="dash-metric-card">
                  <p className="dash-metric-label">Total earned</p>
                  <p className="dash-metric-value">AED 0</p>
                  <p className="dash-metric-caption">Paid out to you</p>
                </div>
              </div>

              <section className="dash-section">
                <div className="dash-section-head">
                  <div>
                    <h2 className="dash-section-title">My tasks</h2>
                    <p className="dash-section-sub">
                      Every project assigned to you in one place.
                    </p>
                  </div>
                </div>

                <div className="dash-table-empty">
                  <h3>No tasks yet</h3>
                  <p>
                    Once Workly assigns projects to you, they will appear here
                    with deadline, price, and status.
                  </p>
                  <p className="dash-mini-note">
                    You will be able to open a task, chat, and upload drafts and
                    final files from this page.
                  </p>
                </div>

                {false && (
                  <div className="dash-table">
                    <div className="dash-table-header">
                      <span>Project</span>
                      <span>Status</span>
                      <span>Deadline</span>
                      <span>Price</span>
                      <span>Student</span>
                      <span></span>
                    </div>
                    <div className="dash-table-row">
                      <div className="dash-table-main">
                        <p className="dash-project-title">
                          Accounting assignment – Midterm
                        </p>
                        <p className="dash-project-meta">
                          Assigned 1 hour ago
                        </p>
                      </div>
                      <span className="dash-badge dash-badge-new">New</span>
                      <span className="dash-project-deadline">
                        10 Dec · in 3 days
                      </span>
                      <span className="dash-project-price">AED 380</span>
                      <span className="dash-project-creator">
                        Student – hidden
                      </span>
                      <button className="dash-link-btn">Open task</button>
                    </div>
                  </div>
                )}
              </section>
            </section>

            <aside className="dash-right">
              <section className="dash-card-pane">
                <h3 className="dash-pane-title">Earnings</h3>
                <p className="dash-pane-sub">
                  Overview of what you have earned on Workly.
                </p>
                <div className="dash-wallet-main">
                  <div>
                    <p className="dash-wallet-label">Total earned</p>
                    <p className="dash-wallet-value">AED 0</p>
                  </div>
                  <div>
                    <p className="dash-wallet-label">Available to withdraw</p>
                    <p className="dash-wallet-value-small">AED 0</p>
                  </div>
                </div>
                <div className="dash-divider" />
                <div className="dash-mini-list">
                  <p className="dash-mini-label">Locked in review</p>
                  <p className="dash-mini-empty">
                    Amounts from tasks that are still waiting for student
                    approval will appear here.
                  </p>
                </div>
              </section>

              <section className="dash-card-pane">
                <h3 className="dash-pane-title">Withdrawal history</h3>
                <p className="dash-pane-sub">
                  Every time Workly pays you, it will be listed here.
                </p>
                <ul className="dash-activity-list">
                  <li className="dash-activity-empty">
                    No withdrawals yet. After you complete tasks and get paid,
                    you will see dates, amounts, and methods here.
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
