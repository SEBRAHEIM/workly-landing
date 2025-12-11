import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function GroupProjectsPage() {
  return (
    <>
      <Head>
        <title>Group Projects · Workly</title>
        <meta
          name="description"
          content="Support for team assignments, case studies, and shared university projects."
        />
      </Head>
      <div className="category-page">
        <Navbar />
        <main className="category-main">
          <section className="category-hero">
            <div className="category-hero-card">
              <span className="category-pill">Category</span>
              <h1 className="category-hero-title">Group Projects</h1>
              <p className="category-hero-subtitle">
                Keep the group aligned and turn different parts into one clean final project.
              </p>
            </div>
          </section>

          
        </main>
      </div>
    </>
  );
}
