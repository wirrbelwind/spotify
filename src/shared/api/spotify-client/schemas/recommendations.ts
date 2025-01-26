import { z } from "zod";
import { recommendationSeedSchema } from "./recommendationSeed";
import { trackSchema } from "./track";

export const recommendationsSchema = z.object({
	seeds: recommendationSeedSchema.array(),
	// tracks: trackSchema.array()
})