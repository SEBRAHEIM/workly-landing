import { useEffect } from "react"
import { useRouter } from "next/router"
export default function OnboardingRole() {
  const r = useRouter()
  useEffect(() => { r.replace("/auth/role") }, [r])
  return null
}
