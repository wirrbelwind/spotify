import { z } from "zod";

export const savedTracksSchema = z.boolean().array()

export type SavedTracks = z.output<typeof savedTracksSchema>
