export default async function handler(req, res) {
  try {
    const email = String(req.query.email || "").trim().toLowerCase()

    if (!email || !email.includes("@")) {
      return res.status(200).json({ ok: true, exists: false })
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !serviceKey) {
      return res.status(500).json({ ok: false, error: "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" })
    }

    const r = await fetch(`${url}/auth/v1/admin/users?email=${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey
      }
    })

    if (!r.ok) {
      const t = await r.text()
      return res.status(500).json({ ok: false, error: "Admin lookup failed", detail: t })
    }

    const data = await r.json()
    const exists = Array.isArray(data?.users) ? data.users.length > 0 : false

    return res.status(200).json({ ok: true, exists })
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Unexpected error" })
  }
}
