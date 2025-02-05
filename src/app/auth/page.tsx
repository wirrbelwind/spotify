import { signIn } from "@/entities/user/model/signIn"
import { Button } from "@heroui/button"

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