import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  first_name: z.string().min(2, "Firstname must be at least 2 characters long"),
  last_name: z.string().min(2, "Lastname must be at least 2 characters long"),
});

export default RegisterSchema;
