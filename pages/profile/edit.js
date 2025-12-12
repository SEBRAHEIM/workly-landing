import Head from "next/head";

export default function ProfileEdit() {
  return (
    <>
      <Head><title>Edit profile</title></Head>
      <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ margin: "0 0 10px" }}>Edit your profile</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>
          This is a placeholder page. Next we’ll build: display name, title, country, languages, about, skills, etc.
        </p>
      </div>
    </>
  );
}
