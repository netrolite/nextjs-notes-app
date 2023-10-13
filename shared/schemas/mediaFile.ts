import { z } from "zod";
import timestamps from "../localUtils/timestamps";
import { noteSchemaBase } from "./note";

export const mediaFileSchemaBase = z.object({
  url: z.string(),
  blurUrl: z.string().nullable(),
  _id: z.string(),
});

export const mediaFileSchema = noteSchemaBase.extend({
  owner: z.string(),
  ...timestamps,
});

export type TMediaFileSchemaBase = z.infer<typeof mediaFileSchemaBase>;
export type TMediaFileSchema = z.infer<typeof mediaFileSchema>;