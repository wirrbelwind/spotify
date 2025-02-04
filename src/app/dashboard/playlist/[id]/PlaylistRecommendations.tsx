
interface PlaylistRecommendationsProps {
    playlistId: string
}

export const PlaylistRecommendations = ({playlistId}: PlaylistRecommendationsProps) => {
    

    return (
        <div>
            <p>Recommendations</p>
            <p>Similar to tracks in this playlist</p>

        </div>
    )
}