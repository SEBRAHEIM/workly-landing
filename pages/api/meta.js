export default function handler(req, res) {
  res.status(200).json({
    now: new Date().toISOString(),
    vercel_env: process.env.VERCEL_ENV || null,
    vercel_url: process.env.VERCEL_URL || null,
    vercel_git_commit_sha: process.env.VERCEL_GIT_COMMIT_SHA || null,
    vercel_git_commit_ref: process.env.VERCEL_GIT_COMMIT_REF || null
  });
}
