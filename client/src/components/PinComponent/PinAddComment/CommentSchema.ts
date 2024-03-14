import { z } from "zod";

const CommentSchema = z.object({
  message: z
    .string()
    .min(4, "Comment must be at least 4 characters long")
    .max(500, "Comment must be only 500 characters long"),
});

export default CommentSchema;
