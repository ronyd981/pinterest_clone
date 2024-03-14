import { z } from "zod";

const SearchSchema = z.object({
  title: z.string(),
});

export default SearchSchema;
