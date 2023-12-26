import { z } from "zod";

export const DeleteBoard = z.object({
  id: z.string(), // BY using Id we will know which board user want to delete
});
