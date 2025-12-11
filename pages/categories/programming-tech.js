import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ProgrammingTechPage() {
  return (
    <>
      <Head>
        <title>Programming & Tech | Workly</title>
      </Head>

      <div className="category-page">
        <Navbar />

        <main className="category-main">
          <section className="category-hero">
            <div className="category-card">
              <div className="category-pill">Category</div>
              <h1>Programming &amp; Tech</h1>
              <p>Basic coding tasks and small tech work.</p>
            </div>
          </section>

          <section className="category-detail-body">
            <h2>Connect with your favorite creator</h2>
            <p>
              Later, this section will help you connect with your favorite
              creator for intro-level coding tasks, debugging, and small
              scripts that match your assignment level.
            </p>

            <Link href="/" className="category-detail-back">
              ← Back to Workly home
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
