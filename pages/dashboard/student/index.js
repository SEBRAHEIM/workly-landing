import StudentDashboardShell from "@/components/StudentDashboardShell";

export default function StudentDashboardHome() {
  const metrics = [
    { label: "Active projects", value: "0" },
    { label: "In review / delivered", value: "0" },
    { label: "Completed", value: "0" },
    { label: "Total spent (AED)", value: "0" },
  ];

  const projects = [];

  return (
    <StudentDashboardShell
      active="home"
      title="Student dashboard"
      subtitle="Upload rubrics, track creator progress, and approve deliveries in one calm place."
    >
      <section className="dash-section">
        <h2 className="dash-section-title">This week at a glance</h2>
        <p className="dash-section-sub">
          Everything updates automatically once a creator accepts your project.
        </p>
        <div className="dash-metrics-row">
          {metrics.map((m) => (
            <div key={m.label} className="dash-metric-card">
              <div className="dash-metric-label">{m.label}</div>
              <div className="dash-metric-value">{m.value}</div>
              <div className="dash-metric-caption">Refreshed daily</div>
            </div>
          ))}
        </div>
      </section>

      <div className="dash-main-grid">
        <section className="dash-column-left">
          <div className="dash-card">
            <div className="dash-card-head">
              <div>
                <h3 className="dash-card-title">My projects</h3>
                <p className="dash-card-sub">
                  Upload your rubric to open a new request for a creator.
                </p>
              </div>
              <button type="button" className="dash-primary-btn">
                Upload rubric
              </button>
            </div>
            <div className="dash-table">
              <div className="dash-table-header">
                <span>Project</span>
                <span>Status</span>
                <span>Deadline</span>
              </div>
              {projects.length === 0 ? (
                <div className="dash-table-empty">
                  <p>No projects yet.</p>
                  <p className="dash-table-empty-sub">
                    Once you share your rubric, the Workly team will match you
                    with a trusted creator.
                  </p>
                </div>
              ) : (
                projects.map((p) => (
                  <div className="dash-table-row" key={p.id}>
                    <span>{p.title}</span>
                    <span>
                      <span className={`status-pill status-${p.status}`}>
                        {p.statusLabel}
                      </span>
                    </span>
                    <span>{p.deadline}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dash-card">
            <h3 className="dash-card-title">Next steps</h3>
            <p className="dash-card-sub">
              The process stays the same each time you submit a project.
            </p>
            <ul className="dashboard-steps-list">
              <li>
                1. Upload rubric and supporting docs (Word, PPT, Excel, or PDF).
              </li>
              <li>
                2. Workly pairs you with a creator based on subject and
                deadline.
              </li>
              <li>
                3. Review the delivery, request edits, and approve when ready.
              </li>
            </ul>
          </div>
        </section>

        <section className="dash-column-right">
          <div className="dash-card">
            <h3 className="dash-card-title">Wallet &amp; payments</h3>
            <p className="dash-card-sub">
              Keep track of how much you spend on each project.
            </p>
            <div className="wallet-main-amount">AED 0.00</div>
            <p className="wallet-caption">Available balance</p>
            <div className="wallet-list">
              <div className="wallet-row-header">
                <span>Recent payments</span>
                <span className="wallet-badge">Coming soon</span>
              </div>
              <p className="wallet-empty">
                When you approve a project, payment history will appear here.
              </p>
            </div>
          </div>

          <div className="dash-card">
            <h3 className="dash-card-title">Messages &amp; updates</h3>
            <p className="dash-card-sub">
              Creators will reply inside this inbox for every project.
            </p>
            <div className="activity-empty">
              <p>No messages yet.</p>
              <p className="activity-empty-sub">
                Once a creator starts, all feedback and file exchanges live in
                this thread.
              </p>
            </div>
          </div>
        </section>
      </div>
    </StudentDashboardShell>
  );
}
