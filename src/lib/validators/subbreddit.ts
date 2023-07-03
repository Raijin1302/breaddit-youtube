import { z } from "zod"
export const SubBreadditValidator = z.object({
  name: z.string().min(3).max(21),
})
export const SubBredditSubscriptionValidator = z.object({
  subredditId: z.string(),
})

export type CreateSubBreadditPayload = z.infer<typeof SubBreadditValidator>
export type SubscribeToSubBreadditPayload = z.infer<
  typeof SubBredditSubscriptionValidator
>
