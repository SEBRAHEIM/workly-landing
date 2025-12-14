import { useRouter } from "next/router";
import { useState } from "react";

export default function AuthStart() {
  const router = useRouter();
  const [notice, setNotice] = useState("");

  return (
    <div className="authStartPage">
      <div className="authStartCard">
        <div className="authStartTop">
          <div className="authStartHint">STAY ON /</div>
          <button
            type="button"
            className="authStartClose"
            aria-label="Close"
            onClick={() => router.back()}
          >
            ×
          </button>
        </div>

        <h1 className="authStartTitle">Sign in to Workly</h1>
        <p className="authStartSubtitle">
          Continue your request without losing your place. You&apos;ll stay on this page after signing in.
        </p>

        {notice ? <div className="authStartNotice">{notice}</div> : null}

        <div className="authStartButtons">
          <button
            type="button"
            className="authProviderBtn isProvider"
            onClick={() => setNotice("Google sign-in is coming soon. Use email for now.")}
          >
            <span className="authProviderIcon">G</span>
            <span className="authProviderText">Continue with Google</span>
          </button>

          <button
            type="button"
            className="authProviderBtn isEmail"
            onClick={() => router.push("/auth/login")}
          >
            <span className="authProviderIcon">✉</span>
            <span className="authProviderText">Continue with email</span>
          </button>

          <div className="authOrRow">
            <div className="authOrLine" />
            <div className="authOrText">OR</div>
            <div className="authOrLine" />
          </div>

          <button
            type="button"
            className="authProviderBtn isProvider"
            onClick={() => setNotice("Apple sign-in is coming soon. Use email for now.")}
          >
            <span className="authProviderIcon"></span>
            <span className="authProviderText">Continue with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}
