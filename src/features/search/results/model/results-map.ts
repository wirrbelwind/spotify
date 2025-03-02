import { AlbumsResults } from '../ui/AlbumsResults'
import { TracksResults } from '../ui/TracksResults'
import { FC } from 'react'
import { ResultsProps } from './ResultsProps'
import { ArtistsResults } from '../ui/ArtistsResults'
import { AudiobooksResults } from '../ui/AudiobooksResults'
import { EpisodesResults } from '../ui/EpisodesResults'
import { PlaylistsResults } from '../ui/PlaylistsResults'
import { SearchType } from '@/shared/api/spotify-client/sections/search'
import { AllResults } from '../ui/AllResults'

export const resultsMap: Record<SearchType, FC<ResultsProps>> = {
  track: TracksResults,
  album: AlbumsResults,
  artist: ArtistsResults,
  audiobook: AudiobooksResults,
  episode: EpisodesResults,
  playlist: PlaylistsResults,
  show: AlbumsResults,
  all: AllResults,
}
