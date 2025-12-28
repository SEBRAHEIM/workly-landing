import { envInfo, supabaseAdminFromEnv } from "./_sb"

function errShape(e) {
  const out = { message: String(e?.message || e || "error"), name: e?.name || null }
  const c = e?.cause
  if (c && typeof c === "object") {
    out.cause = {
      name: c.name || null,
      message: String(c.message || ""),
      code: c.code || null,
      errno: c.errno || null,
      syscall: c.syscall || null,
      hostname: c.hostname || null
    }
  } else if (c) out.cause = String(c)
  return out
}

async function healthWithKey(url, key) {
  const target = url.replace(/\/+$/,"") + "/auth/v1/health"
  const r = await fetch(target, { method: "GET", headers: { apikey: key, Authorization: "Bearer " + key } })
  const t = await r.text().catch(() => "")
  return { target, status: r.status, ok: r.ok, body: t.slice(0, 220) }
}

export default async function handler(req, res) {
  const info = envInfo()
  try {
    const anon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")
    const svc = (process.env.SUPABASE_SERVICE_ROLE_KEY || "")

    const anonKey = String(anon).match(/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/)?.[0] || ""
    const svcKey = String(svc).match(/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/)?.[0] || ""

    const probeAnon = info.url && anonKey ? await healthWithKey(info.url, anonKey) : null
    const probeService = info.url && svcKey ? await healthWithKey(info.url, svcKey) : null

    const sb = supabaseAdminFromEnv()
    const { data, error } = await sb.auth.admin.listUsers({ page: 1, perPage: 1 })

    if (error) {
      return res.status(200).json({
        ok: false,
        where: "admin_listUsers",
        info,
        probeAnon,
        probeService,
        error: String(error.message || error)
      })
    }

    return res.status(200).json({
      ok: true,
      where: "admin_listUsers",
      info,
      probeAnon,
      probeService,
      users: (data?.users?.length || 0)
    })
  } catch (e) {
    return res.status(200).json({ ok: false, where: "throw", info, error: errShape(e) })
  }
}
