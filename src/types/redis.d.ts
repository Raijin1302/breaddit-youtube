import { Vote, VoteType } from "@prisma/client"

export type CachedPost = {
  id: string
  title: string
  authorUsername: string
  content: string
  currrentVote: VoteType | null
  createdAt: Date
}
