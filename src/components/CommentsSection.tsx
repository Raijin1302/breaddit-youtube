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
      postId: postId,
      //replyToId: null,
    },
    include: {
      author: true,
      votes: true,
      replies: {
        // first level replies
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
                  <PostComment
                    comment={topLvComment}
                    postId={postId}
                    currentVote={topLvCommentVote}
                    votesAmt={topLvCommentVotesAmt}
                  />
                </div>

                {/* rebder reply vote */}

                {topLvComment.replies
                  .sort((a, b) => b.votes.length - a.votes.length)
                  .map((reply) => {
                    const replyVotesAmt = reply.votes.reduce((acc, vote) => {
                      if (vote.type === "UP") return acc + 1
                      if (vote.type === "DOWN") return acc - 1
                      return acc
                    }, 0)

                    const replyVote = reply.votes.find(
                      (vote) => vote.userId === session?.user.id
                    )

                    return (
                      <div
                        key={reply.id}
                        className="ml-2 py-2 pl-4 border-l-2 border-zinc-200"
                      >
                        <PostComment
                          comment={reply}
                          postId={postId}
                          currentVote={replyVote}
                          votesAmt={replyVotesAmt}
                        />
                      </div>
                    )
                  })}
              </div>
            )
          })}
      </div>
      {/* Creat comment */}
      <CreateComment postId={postId} />
    </div>
  )
}

export default CommentsSection
