import StudentDashboardShell from "@/components/StudentDashboardShell";

export default function BrowseCreatorsPage() {
  const mockCreators = [
    {
      id: 1,
      name: "Alya · Business",
      subjects: ["HR", "Business", "Management"],
      university: "HBMSU",
      price: "From AED 250",
      bio: "Specialized in HR and management reports with clear structure and references.",
    },
    {
      id: 2,
      name: "Khalid · Engineering",
      subjects: ["Engineering", "Math"],
      university: "Ajman University",
      price: "From AED 300",
      bio: "Helps with technical assignments, calculations and clean documentation.",
    },
    {
      id: 3,
      name: "Mariam · Marketing",
      subjects: ["Marketing", "Presentations"],
      university: "Zayed University",
      price: "From AED 200",
      bio: "Slides, campaigns and case-study write ups that match university style.",
    },
    {
      id: 4,
      name: "Omar · IT",
      subjects: ["Programming", "IT", "Data"],
      university: "UAEU",
      price: "From AED 280",
      bio: "Projects in Python, dashboards and basic data analysis assignments.",
    },
  ];

  return (
    <StudentDashboardShell
      active="browse"
      title="Browse creators"
      subtitle="Handpicked profiles for business, PPT, coding, and more."
    >
      <section className="dash-section">
        <h2 className="dash-section-title">Featured creators</h2>
        <p className="dash-section-sub">
          Choose the style you need, then attach your rubric so we can brief
          them properly.
        </p>

        <div className="browse-grid">
          {mockCreators.map((c) => (
            <article key={c.id} className="creator-card">
              <div className="creator-avatar">{c.name.charAt(0)}</div>
              <div className="creator-main">
                <div className="creator-name-row">
                  <h3 className="creator-name">{c.name}</h3>
                  <span className="creator-price">{c.price}</span>
                </div>
                <p className="creator-subjects">
                  {c.subjects.join(" · ")} · {c.university}
                </p>
                <p className="creator-bio">{c.bio}</p>
              </div>
              <div className="creator-meta">
                <button type="button" className="dash-primary-btn creator-btn">
                  Request project
                </button>
                <span className="creator-note">Profile preview</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </StudentDashboardShell>
  );
}
