import { signOut } from "@/entities/user/model/signOut"
import { redirect } from "next/navigation"

export const GET = async (request: Request) => {
	console.log(1)
	await signOut()
	redirect('/auth')
}
