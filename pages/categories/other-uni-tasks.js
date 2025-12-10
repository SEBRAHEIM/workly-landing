import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function OtherUniTasksPage() {
  return (
    <>
      <Head>
        <title>Other uni tasks – Workly</title>
        <meta
          name="description"
          content="Help with any other university tasks that do not fit the main categories."
        />
      </Head>

      <main className="category-detail">
      <Navbar />
        <section className="category-detail-hero">
          <h1>Other uni tasks</h1>
          <p>
            For anything that doesn&apos;t fit perfectly in the other
            categories, but is still part of your university workload.
          </p>
        </section>

        <section className="category-detail-body">
          <h2>Examples of other tasks</h2>
          <ul>
            <li>Small forms or templates your professor gave you</li>
            <li>Checklists, tables, or mixed formats</li>
            <li>Light research and organization</li>
            <li>Preparing files before final submission</li>
          </ul>

          <p className="category-detail-note">
            Workly is designed to stay flexible, so students can get help with
            the real tasks they receive, not just perfect categories.
          </p>

          <Link href="/" className="category-detail-back">
            ← Back to Workly home
          </Link>
        </section>
      </main>
    </>
  );
}
