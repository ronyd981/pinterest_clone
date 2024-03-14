import { z } from "zod";

const PinSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 4 characterers long")
    .max(16, "Title must be only 500 characters long"),
  description: z
    .string()
    .min(4, "Description must be at least 4 characters long")
    .max(500, "Description must be only 500 characters long"),
  url: z.union([z.string().url(), z.literal("")]),
});

export default PinSchema;
