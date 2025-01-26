import { z } from "zod";
import { EAN, ISRC, UPC } from "../constants";

export const externalIdsSchema = z.object({
	isrc: z.string().regex(ISRC).optional(),
	ean: z.string().regex(EAN).optional(),
	upc: z.string().regex(UPC).optional()
})