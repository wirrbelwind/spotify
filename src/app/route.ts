import { routeUrl } from "@/shared/lib/route-url"
import { redirect } from "next/navigation"

export const GET = async () => {
    redirect(
        routeUrl.dashboard()
    )
}