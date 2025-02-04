import { signIn } from "@/entities/user/model/signIn"
import { Button } from "@heroui/button"
import Link from "next/link"

export default async function AuthPage() {
	return (
		<form action={signIn}>
			<Button
				type="submit"
			>
				login
			</Button>
		</form>
	)
}