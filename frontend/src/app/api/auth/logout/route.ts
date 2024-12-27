import { cookies } from "next/headers"

export const GET = async (request: Request) => {
	const cookie = await cookies()

	cookie.delete('')
}