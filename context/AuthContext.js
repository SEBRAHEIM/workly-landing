import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthCtx = createContext(null);

function pickProfileFromUser(user) {
  const meta = user?.user_metadata || {};
  const role = typeof meta.role === "string" ? meta.role : "";
  const username = typeof meta.username === "string" ? meta.username : "";
  const email = user?.email || null;
  const user_id = user?.id || null;
  return { user_id, email, role, username };
}

function normalizeProfile(p, user) {
  const base = pickProfileFromUser(user);
  const role = String(p?.role || base.role || "");
  const username = String(p?.username || base.username || "");
  return {
    user_id: p?.user_id || base.user_id || null,
    email: p?.email || base.email || null,
    role,
    username
  };
}

function isComplete(p) {
  const role = String(p?.role || "");
  const username = String(p?.username || "");
  return (role === "student" || role === "creator") && username.trim().length >= 3;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfileFromDB(uid) {
    if (!uid) return null;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id,email,username,role")
        .eq("user_id", uid)
        .maybeSingle();
      if (error) return null;
      return data || null;
    } catch {
      return null;
    }
  }

  async function refreshAll(s) {
    const nextSession = s || null;
    const nextUser = nextSession?.user || null;

    setSession(nextSession);
    setUser(nextUser);

    const metaProfile = normalizeProfile(null, nextUser);
    let dbProfile = null;

    if (nextUser?.id) {
      dbProfile = await fetchProfileFromDB(nextUser.id);
    }

    const merged = normalizeProfile(dbProfile, nextUser);
    setProfile(isComplete(merged) ? merged : merged);
    setLoading(false);
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!alive) return;
      await refreshAll(data?.session || null);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, s) => {
      await refreshAll(s || null);
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
    if (!res.ok) return null;
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

  const updateUserPassword = async ({ password }) => {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return data;
  };

  const saveOnboarding = async ({ role, username }) => {
    const { data: u1 } = await supabase.auth.getUser();
    const u = u1?.user || user;

    const uid = u?.id || null;
    const email = u?.email || null;
    if (!uid) throw new Error("Not signed in");

    const cleanRole = String(role || "");
    const cleanUsername = String(username || "").trim().toLowerCase();

    const { error: metaErr } = await supabase.auth.updateUser({
      data: { role: cleanRole, username: cleanUsername }
    });
    if (metaErr) throw metaErr;

    const optimistic = { user_id: uid, email, role: cleanRole, username: cleanUsername };
    setProfile(optimistic);

    try {
      await supabase.from("profiles").upsert(optimistic, { onConflict: "user_id" });
    } catch {}

    return optimistic;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    setLoading(false);
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
      updateUserPassword,
      saveOnboarding,
      signOut
    }),
    [session, user, profile, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) return { user: null, session: null, loading: true }
  return ctx;
}
