import { getCurrentUser } from "@/entities/user"

export default async function JsonPage() {
	const user = await getCurrentUser()

	return (
		<p>{JSON.stringify(user)}</p>
	)
}