import { signIn } from "@/entities/user/model/signIn"
import { Button } from "@heroui/button"

export default async function AuthPage() {
	return (
		<form
			className="flex items-center justify-center h-dvh"
			action={signIn}
		>
			<Button
				type="submit"
			>
				Sign In
			</Button>
		</form>
	)
}