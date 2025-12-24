import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  const out = {
    now: new Date().toISOString(),
    env: {
      has_url: !!url,
      has_anon: !!anon,
      has_service: !!service
    },
    supabase: {
      profiles_select_ok: false,
      profiles_select_error: null
    }
  };

  if (!url || !service) {
    return res.status(200).json(out);
  }

  try {
    const admin = createClient(url, service, { auth: { persistSession: false } });
    const { data, error } = await admin.from("profiles").select("id,username,role").limit(1);
    if (error) {
      out.supabase.profiles_select_error = error.message || String(error);
    } else {
      out.supabase.profiles_select_ok = true;
      out.supabase.sample = data || [];
    }
  } catch (e) {
    out.supabase.profiles_select_error = String(e?.message || e);
  }

  return res.status(200).json(out);
}
