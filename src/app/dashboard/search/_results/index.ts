
import { AlbumsResults } from "./AlbumsResults";
import { TracksResults } from "./TracksResults";
import { FC } from "react";
import { ResultsProps } from "./ResultsProps";
import { ArtistsResults } from "./ArtistsResults";
import { AudiobooksResults } from "./AudiobooksResults";
import { EpisodesResults } from "./EpisodesResults";
import { PlaylistsResults } from "./PlaylistsResults";


export const ResultsMap: Record<SearchType, FC<ResultsProps>> = {
    track: TracksResults,
    album: AlbumsResults,
    artist: ArtistsResults,
    audiobook: AudiobooksResults,
    episode: EpisodesResults,
    playlist: PlaylistsResults,
    show: AlbumsResults,
    all: AlbumsResults
}
