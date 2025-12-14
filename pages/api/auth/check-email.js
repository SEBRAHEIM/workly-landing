import { createClient } from "@supabase/supabase-js";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method" });

  const { email } = req.body || {};
  if (!isValidEmail(email)) return res.status(400).json({ error: "email" });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !service) return res.status(500).json({ error: "server_missing_keys" });

  try {
    const supabaseAdmin = createClient(url, service, { auth: { persistSession: false } });
    const { data, error } = await supabaseAdmin.auth.admin.getUserByEmail(email.toLowerCase());
    if (error) return res.status(200).json({ exists: false });
    return res.status(200).json({ exists: !!data?.user });
  } catch (_e) {
    return res.status(500).json({ error: "server_error" });
  }
}
