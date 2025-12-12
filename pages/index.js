import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [presetRole, setPresetRole] = useState(null);

  const openSignup = (role = null) => {
    setPresetRole(role);
    setAuthMode("signup");
    setAuthOpen(true);
  };

  const openSignin = () => {
    setPresetRole(null);
    setAuthMode("signin");
    setAuthOpen(true);
  };

  return (
    <>
      <main>
        <button onClick={() => openSignup()}>Join</button>
        <button onClick={() => openSignup()}>Begin now</button>
        <button onClick={() => openSignup("creator")}>Join as creator</button>
        <button onClick={openSignin}>Sign in</button>
      </main>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
        presetRole={presetRole}
      />
    </>
  );
}
