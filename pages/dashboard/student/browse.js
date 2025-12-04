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
    <StudentShell active="browse">
      <section className="dash-section">
        <h1 className="dash-section-title">Browse creators</h1>
        <p className="dash-section-sub">
          Find trusted creators who can complete your projects privately.
        </p>

        <div className="browse-grid">
          {mockCreators.map((c) => (
            <article key={c.id} className="creator-card">
              <div className="creator-avatar">{c.name.charAt(0)}</div>
              <div className="creator-main">
                <h2 className="creator-name">{c.name}</h2>
                <p className="creator-subjects">
                  {c.subjects.join(" · ")} · {c.university}
                </p>
                <p className="creator-bio">{c.bio}</p>
              </div>
              <div className="creator-meta">
                <div className="creator-price">{c.price}</div>
                <button className="dash-primary-btn creator-btn">
                  View profile
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </StudentShell>
  );
}
