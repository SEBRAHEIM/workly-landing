import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import { getNextOnboardingPath, isOnboardingRoute } from "../lib/onboarding";
import AuthModal from "../components/AuthModal";

const AuthContext = createContext(({ __worklyAuth: true,
  isOpen: false,
  mode: null,
  open: function(){},
  close: function(){},
  setMode: function(){},
  setOpen: function(){},
  show: function(){},
  hide: function(){}
}));

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState("student"); // "student" | "creator"
  const [returnTo, setReturnTo] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session || null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession || null);
    });

    return () => {
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const openAuthModal = useCallback(
    (intent = "student", options = {}) => {
      setAuthIntent(intent);
      setReturnTo(options.returnTo || router.asPath);
      setIsModalOpen(true);
    },
    [router.asPath],
  );

  const closeAuthModal = useCallback(() => setIsModalOpen(false), []);

  const ensureOnboardingRedirect = useCallback(
    async (maybeUser = null) => {
      try {
        const pathname = router.pathname || "";
        if (isOnboardingRoute(pathname)) return;

        const user = maybeUser || session?.user;
        if (!user) return;

        const next = getNextOnboardingPath(user, router.asPath || "/");
        if (next && next !== (router.asPath || "/") && next.startsWith("/onboarding")) {
          router.replace(next);
        }
      } catch {}
    },
    [router, session],
  );

  useEffect(() => {
    if (!session?.user) return;
    ensureOnboardingRedirect(session.user);
  }, [session, ensureOnboardingRedirect]);


  const startOAuth = useCallback(
    async (provider) => {
      if (!supabase) return;

      const base = typeof window !== "undefined" ? window.location.origin : "";
      const callbackUrl = `${base}/auth/callback?intent=${encodeURIComponent(
        authIntent || "student",
      )}&returnTo=${encodeURIComponent(returnTo || router.asPath)}`;

      await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: callbackUrl },
      });
    },
    [authIntent, returnTo, router.asPath],
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const clickHandler = (event) => {
      const trigger = event.target.closest("[data-auth-modal-trigger]");
      if (!trigger) return;

      event.preventDefault();
      const intent = trigger.getAttribute("data-auth-modal-intent") || "student";
      openAuthModal(intent);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [openAuthModal]);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: !!session,
      authIntent,
      returnTo: returnTo || router.asPath,
      isModalOpen,
      openAuthModal,
      closeAuthModal,
      startOAuth,
    }),
    [session, authIntent, returnTo, router.asPath, isModalOpen, openAuthModal, closeAuthModal, startOAuth],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={isModalOpen}
        authIntent={authIntent}
        returnTo={returnTo || router.asPath}
        onClose={closeAuthModal}
      />
    </AuthContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthContext);
  if (!ctx) return ({ __worklyAuth: true,
  isOpen: false,
  mode: null,
  open: function(){},
  close: function(){},
  setMode: function(){},
  setOpen: function(){},
  show: function(){},
  hide: function(){}
});
  return ctx;
}
