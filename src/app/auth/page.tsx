import { cookies } from "next/headers"
import Link from "next/link"

export default async function AuthPage() {
	

	return (
		<Link
			href="/api/auth/spotify-redirect"
			
		>login</Link>
	)
}