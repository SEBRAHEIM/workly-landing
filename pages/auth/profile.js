import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function CreatorProfileSetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    displayName: "",
    title: "",
    country: "",
    about: "",
    skills: "",
    experience: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!supabase) {
      setErrorMessage("Supabase is not configured yet.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You need to be signed in first.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          display_name: form.displayName || null,
          title: form.title || null,
          country: form.country || null,
          about: form.about || null,
          skills: form.skills || null,
          experience: form.experience || null,
        },
        { onConflict: "id" },
      );

    if (error) {
      setErrorMessage(error.message || "Could not save your profile.");
      setSubmitting(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Edit your new profile · Workly</title>
      </Head>
      <main className="auth-flow-page">
        <div className="auth-flow-card auth-flow-card-scroll">
          <h1 className="auth-flow-title">Edit your new profile</h1>
          <p className="auth-flow-subtitle">
            Tell students who you are and what you can help with.
          </p>

          <form onSubmit={handleSubmit} className="auth-flow-form">
            <label className="auth-flow-label">
              Display name
              <input
                type="text"
                className="auth-flow-input"
                value={form.displayName}
                onChange={handleChange("displayName")}
                placeholder="Your name"
                required
              />
            </label>

            <label className="auth-flow-label">
              Title
              <input
                type="text"
                className="auth-flow-input"
                value={form.title}
                onChange={handleChange("title")}
                placeholder="Business student, CS graduate, etc."
              />
            </label>

            <label className="auth-flow-label">
              Country
              <input
                type="text"
                className="auth-flow-input"
                value={form.country}
                onChange={handleChange("country")}
                placeholder="United Arab Emirates"
              />
            </label>

            <label className="auth-flow-label">
              About
              <textarea
                className="auth-flow-textarea"
                value={form.about}
                onChange={handleChange("about")}
                rows={4}
                placeholder="Short bio about your academic background and strengths."
              />
            </label>

            <label className="auth-flow-label">
              Skills &amp; expertise
              <textarea
                className="auth-flow-textarea"
                value={form.skills}
                onChange={handleChange("skills")}
                rows={3}
                placeholder="Example: reports, PPT design, Excel dashboards, basic coding..."
              />
            </label>

            <label className="auth-flow-label">
              Work experience (optional)
              <textarea
                className="auth-flow-textarea"
                value={form.experience}
                onChange={handleChange("experience")}
                rows={3}
                placeholder="Any past tutoring, freelancing, or project work."
              />
            </label>

            {errorMessage && <p className="auth-flow-error">{errorMessage}</p>}

            <button
              type="submit"
              className="auth-flow-primary-btn"
              disabled={submitting}
            >
              {submitting ? "Saving profile..." : "Continue"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
