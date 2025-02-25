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
            {artistId}
        </div>
    )
}