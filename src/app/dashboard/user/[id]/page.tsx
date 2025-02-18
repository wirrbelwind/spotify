import { AnotherUserProfile } from "@/entities/user";



interface UserPageProps {
params: Promise<{
    id: string
}>
}

export default async function UserPage({params}: UserPageProps) {
    const id = (await params).id

    return (
        <div>
            <AnotherUserProfile userId={id}/>
        </div>
    )
}