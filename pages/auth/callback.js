import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const intent = typeof router.query.intent === "string" ? router.query.intent : "student";
      const returnTo = typeof router.query.returnTo === "string" ? router.query.returnTo : "/";

      if (!supabase) {
        router.replace(returnTo);
        return;
      }

      const { data } = await supabase.auth.getSession();
      const hasSession = !!data?.session;

      if (!hasSession) {
        router.replace(returnTo);
        return;
      }

      if (intent === "creator") {
        router.replace({
          pathname: "/creators/setup",
          query: { returnTo },
        });
      } else {
        router.replace(returnTo);
      }
    };

    if (!router.isReady) return;
    run();
  }, [router.isReady, router.query.intent, router.query.returnTo]);

  return (
    <>
      <Head>
        <title>Signing you in… · Workly</title>
      </Head>
      <main className="auth-flow-page">
        <div className="auth-flow-card">
          <h1 className="auth-flow-title">Signing you in…</h1>
          <p className="auth-flow-subtitle">Please wait.</p>
        </div>
      </main>
    </>
  );
}
