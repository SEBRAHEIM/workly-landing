import { useRouter } from "next/router";

export default function AuthStart() {
  const router = useRouter();

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

        <div className="authStartButtons">
          <button type="button" className="authProviderBtn isDisabled" disabled aria-disabled="true">
            <span className="authProviderIcon">G</span>
            <span className="authProviderText">Continue with Google</span>
          </button>

          <button
            type="button"
            className="authProviderBtn isEmail"
            onClick={() => router.push("/auth")}
          >
            <span className="authProviderIcon">✉</span>
            <span className="authProviderText">Continue with email</span>
          </button>

          <div className="authOrRow">
            <div className="authOrLine" />
            <div className="authOrText">OR</div>
            <div className="authOrLine" />
          </div>

          <button type="button" className="authProviderBtn isDisabled" disabled aria-disabled="true">
            <span className="authProviderIcon"></span>
            <span className="authProviderText">Continue with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}
