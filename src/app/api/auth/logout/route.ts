import { signOut } from "@/entities/user/model/signOut"
import { redirect } from "next/navigation"

export const GET = async (request: Request) => {
	await signOut()
	redirect('/auth')
}
