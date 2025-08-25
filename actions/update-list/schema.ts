import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({ message: "Title must be a string" })
    .trim()
    .min(1, { message: "Title is required" })
    .min(3, { message: "Title is too short." }),
  id: z.string(),
  boardId: z.string(),
});
