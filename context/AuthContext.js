import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(uid) {
    if (!uid) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("user_id,email,username,role")
      .eq("user_id", uid)
      .maybeSingle();
    if (error) return null;
    return data || null;
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!alive) return;
      const s = data?.session || null;
      setSession(s);
      setUser(s?.user || null);
      const p = await fetchProfile(s?.user?.id || null);
      if (!alive) return;
      setProfile(p);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, s) => {
      setSession(s || null);
      setUser(s?.user || null);
      const p = await fetchProfile(s?.user?.id || null);
      setProfile(p);
      setLoading(false);
    });

    return () => {
      alive = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const apiCheckEmailExists = async (email) => {
  const res = await fetch("/api/auth/check-email", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email })
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    return null;
  }

  if (json && typeof json.exists === "boolean") return json.exists;
  return null;
};

  const signInWithPassword = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signUpWithPassword = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

const signInWithOtp = async ({ email }) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true }
  });
  if (error) throw error;
  return data;
};

const verifyEmailOtp = async ({ email, token }) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email"
  });
  if (error) throw error;
  return data;
};

  const saveOnboarding = async ({ role, username }) => {
    const uid = user?.id;
    const email = user?.email || null;
    if (!uid) throw new Error("Not signed in");

    const payload = { user_id: uid, email, role, username };

    const { error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "user_id" });

    if (error) throw error;

    const p = await fetchProfile(uid);
    setProfile(p);
    return p;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      apiCheckEmailExists,
      signInWithPassword,
      signUpWithPassword,
signInWithOtp,
verifyEmailOtp,
saveOnboarding,
signInWithOtp,
verifyEmailOtp,
signOut
}),
    [session, user, profile, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
