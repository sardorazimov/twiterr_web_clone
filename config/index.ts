import { z } from "zod";

export const registerstep1schema = z.object({
  email: z.string().email(),
  name:z.string().min(4),
})


export const registerstep2schema = z.object({
    password: z.string().min(8),
    username: z.string().min(4),
});