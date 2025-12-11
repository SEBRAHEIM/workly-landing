import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function PresentationsPptPage() {
  return (
    <>
      <Head>
        <title>Presentations & PPT | Workly</title>
      </Head>

      <div className="category-page">
        <Navbar />

        <main className="category-main">
          <section className="category-hero">
            <div className="category-card">
              <div className="category-pill">Category</div>
              <h1>Presentations &amp; PPT</h1>
              <p>
                Clean, clear, and well-designed slides for your classes, group
                presentations, and project defenses.
              </p>
            </div>
          </section>

          <section className="category-detail-body">
            <h2>Connect with your favorite creator</h2>
            <p>
              Later, this section will help you connect with your favorite
              creator for this type of task – especially for slides, pitch
              decks, and clear visual explanations of your ideas.
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
