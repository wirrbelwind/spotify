import { Divider } from "@heroui/divider"
import { ArtistActions } from "./ArtistActions"
import { ArtistHero } from "./ArtistHero"
import { ArtistTracks } from "./ArtistTracks"

interface ArtistPageProps {
    params: Promise<{
		id: string
	}>
}

export default async function ArtistPage(props: ArtistPageProps) {
    const params = await props.params
    const artistId = params.id

    return (
        <div>
            <ArtistHero artistId={artistId}/>
            <Divider className="my-4 opacity-0"/>
            <ArtistActions artistId={artistId}/>
            <Divider className="my-4 opacity-0"/>
            <ArtistTracks artistId={artistId}/>
        </div>
    )
}