import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import PostComment from "./PostComment"
import CreateComment from "./CreateComment"

interface CommentsSectionProps {
  postId: string
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
  const session = await getAuthSession()
  const comments = await db.comment.findMany({
    where: {
      postId,
      replyToId: null,
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })
  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px my-6" />
      {/* Creat comment */}
      <CreateComment />

      <div className="flex flex-col gap-y-6 mt-4">
        {comments
          .filter((comment) => !comment.replyToId)
          .map((topLvComment) => {
            const topLvCommentVotesAmt = topLvComment.votes.reduce(
              (acc, vote) => {
                if (vote.type === "UP") return acc + 1
                if (vote.type === "DOWN") return acc - 1
                return acc
              },
              0
            )

            const topLvCommentVote = topLvComment.votes.find(
              (vote) => vote.userId === session?.user.id
            )
            return (
              <div key={topLvComment.id} className="flex flex-col">
                <div className="mb-2">
                  <PostComment comment={topLvComment} />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CommentsSection
