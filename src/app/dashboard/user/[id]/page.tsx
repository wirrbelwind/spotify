import { AnotherUserBanner } from "@/entities/user";
import { Divider } from "@heroui/divider";
import { UserPlaylists } from "./UserPlaylists";



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
            <Divider className="my-6"/>
            <UserPlaylists userId={id}/>
        </div>
    )
}