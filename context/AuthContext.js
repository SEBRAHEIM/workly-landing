import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AuthModal from "../components/AuthModal";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authIntent, setAuthIntent] = useState("student");
  const [returnTo, setReturnTo] = useState(null);

  const openAuthModal = useCallback(
    (intent = "student", options = {}) => {
      setAuthIntent(intent);
      setReturnTo(options.returnTo || router.asPath);
      setIsModalOpen(true);
    },
    [router.asPath],
  );

  const closeAuthModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const completeAuth = useCallback(() => {
    setIsAuthenticated(true);
    setIsModalOpen(false);

    if (authIntent === "creator") {
      router.push({
        pathname: "/creators/setup",
        query: { returnTo: returnTo || router.asPath },
      });
    }
  }, [authIntent, returnTo, router]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

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
      authIntent,
      isAuthenticated,
      isModalOpen,
      openAuthModal,
      closeAuthModal,
      completeAuth,
      returnTo: returnTo || router.asPath,
    }),
    [authIntent, completeAuth, isAuthenticated, isModalOpen, openAuthModal, closeAuthModal, returnTo, router.asPath],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={isModalOpen}
        authIntent={authIntent}
        returnTo={returnTo || router.asPath}
        onClose={closeAuthModal}
        onSuccess={completeAuth}
      />
    </AuthContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthProvider");
  }
  return context;
}
