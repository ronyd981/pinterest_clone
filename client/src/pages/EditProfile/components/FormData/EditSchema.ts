import { z } from "zod";

const EditSchema = z.object({
  first_name: z
    .string()
    .min(2, "Name must be at least 4 characterers long")
    .max(16, "Name must be only 500 characters long"),
  last_name: z
    .string()
    .min(2, "Lastname must be at least 4 characters long")
    .max(16, "Lastname must be only 500 characters long"),
  old_password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(24, "Password must be only 24 characters long")
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(24, "Password must be only 24 characters long")
    .optional()
    .or(z.literal("")),
});

export default EditSchema;
