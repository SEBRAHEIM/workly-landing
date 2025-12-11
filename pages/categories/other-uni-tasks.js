import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function OtherUniTasksPage() {
  return (
    <div className="category-page">
      <Head>
        <title>Other Tasks | Workly</title>
        <meta
          name="description"
          content="Flexible help for all the small or mixed university tasks that don’t fit a single category."
        />
      </Head>

      <Navbar />

      <main className="category-detail">
        <h1>Other Tasks</h1>
        <p>
          For all the small, mixed, or unusual tasks that don&apos;t fit a
          single category but still matter for your course.
        </p>

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
    </div>
  );
}
