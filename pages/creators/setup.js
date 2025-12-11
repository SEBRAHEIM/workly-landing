import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

export default function CreatorSetupPage() {
  const router = useRouter();
  const returnTo = typeof router.query.returnTo === "string" ? router.query.returnTo : "/";

  return (
    <>
      <Head>
        <title>Creator setup · Workly</title>
        <meta
          name="description"
          content="Complete a short onboarding flow so we can match you with the right student projects."
        />
      </Head>

      <div className="creator-setup-page">
        <Navbar />

        <main className="creator-setup-main">
          <h1>Welcome, creator</h1>
          <p>
            Tell us about your skills, study focus, and the categories you want to help with. We will save your
            progress and get you live as soon as your profile is complete.
          </p>

          <ol className="creator-setup-steps">
            <li>Share your academic focus and past experience.</li>
            <li>Pick the categories where you can contribute.</li>
            <li>Verify your identity and set payout details.</li>
          </ol>

          <button type="button" className="creator-setup-btn">
            Start creator setup
          </button>

          <Link href={returnTo} className="creator-setup-link">
            Return to {returnTo}
          </Link>
        </main>
      </div>
    </>
  );
}
