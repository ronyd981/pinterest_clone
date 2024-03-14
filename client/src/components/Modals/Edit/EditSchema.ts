import { z } from "zod";

const EditSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characterers long"),
  description: z
    .string()
    .min(4, "Description must be at least 4 characters long")
    .max(500, "Description must be only 500 characters long"),
  url: z.union([z.string().url(), z.literal("")]),
});

export default EditSchema;
