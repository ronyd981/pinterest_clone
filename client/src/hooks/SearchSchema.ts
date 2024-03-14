import { z } from "zod";

const SearchSchema = z.object({
  title: z.union([z.string(), z.literal("")]),
});

export default SearchSchema;
