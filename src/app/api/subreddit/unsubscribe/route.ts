import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SubBredditSubscriptionValidator } from "@/lib/validators/subbreddit"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    const body = await req.json()
    const { subredditId } = SubBredditSubscriptionValidator.parse(body)

    const subBreadditExist = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    })

    if (!subBreadditExist) {
      return new Response("You're not subscribed to this subreddit", {
        status: 400,
      })
    }

    await db.subscription.delete({
      where: {
        id: subBreadditExist.id,
      },
    })

    return new Response(subredditId)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 })
    }

    return new Response("Could not subscribe , please try again later", {
      status: 500,
    })
  }
}
