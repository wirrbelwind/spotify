import { z } from "zod";
import { EAN, ISRC, UPC } from "../constants";

export const externalIdsSchema = z.object({
	isrc: z.string().optional(),
	ean: z.string().optional(),
	upc: z.string().optional()
})