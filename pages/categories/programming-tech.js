import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ProgrammingTechPage() {
  return (
    <>
      <Head>
        <title>Programming &amp; Tech · Workly</title>
        <meta
          name="description"
          content="Support with intro-level coding exercises and small university tech tasks."
        />
      </Head>
      <div className="category-page">
        <Navbar />
        <main className="category-main">
          <section className="category-hero">
            <div className="category-hero-card">
              <span className="category-pill">Category</span>
              <h1 className="category-hero-title">Programming &amp; Tech</h1>
              <p className="category-hero-subtitle">
                Get help understanding code, fixing small bugs, and finishing intro assignments.
              </p>
            </div>
          </section>

          <section className="category-creators">
            <h2 className="category-creators-heading">
              Connect with your favorite creator
            </h2>
            <p className="category-creators-note">
              Later, this section will help you connect with creators who are comfortable
              with student-level programming tasks and explanations.
            </p>
          </section>

          
        </main>
      </div>
    </>
  );
}
