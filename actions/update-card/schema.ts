import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z
    .string({ error: "Description 必須是字串" })
    .trim()
    .min(3, { message: "Description is too short." })
    .optional(),
  title: z
    .string({ error: "Title 必須是字串" })
    .trim()
    .min(1, { message: "Title is required" })
    .min(3, { message: "Title is too short." }),
  id: z.string(),
});
