import { z } from "zod";

export const getParser = () => z.boolean().array()
