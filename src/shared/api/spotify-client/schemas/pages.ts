import { z } from "zod";
import { pageSchema, pageWith } from "./page";
import { trackSchema } from "./track";
import { playlistTrackSchema } from "./playlist-track";

const pageTracks = pageWith(trackSchema)
const pagePlayListTracks = pageWith(playlistTrackSchema)

export type PageTracks = z.output<typeof pageTracks>
export type PagePlaylistTracks = z.output<typeof pagePlayListTracks>

