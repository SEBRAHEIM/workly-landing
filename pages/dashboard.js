import Head from "next/head";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard · Workly</title>
      </Head>
      <main className="auth-flow-page">
        <div className="auth-flow-card">
          <h1 className="auth-flow-title">Welcome to your dashboard</h1>
          <p className="auth-flow-subtitle">
            This is a placeholder dashboard. After wiring real data, students
            will see their requests and creators will see their projects here.
          </p>
        </div>
      </main>
    </>
  );
}
