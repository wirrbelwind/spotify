import { AnotherUserBanner } from "@/entities/user";



interface UserPageProps {
params: Promise<{
    id: string
}>
}

export default async function UserPage({params}: UserPageProps) {
    const id = (await params).id

    return (
        <div>
            <AnotherUserBanner userId={id}/>
        </div>
    )
}