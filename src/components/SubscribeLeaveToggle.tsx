"use client"
import { FC, startTransition } from "react"
import { Button } from "./ui/Button"
import { useMutation } from "@tanstack/react-query"
import { SubscribeToSubBreadditPayload } from "@/lib/validators/subbreddit"
import axios, { AxiosError } from "axios"
import { toast } from "@/hooks/use-toast"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { useRouter } from "next/navigation"

interface SubscribeLeaveToggleProps {
  subredditId: string
  subredditName: string
  isSubscribed: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subredditId,
  subredditName,
  isSubscribed,
}) => {
  const { loginToast } = useCustomToast()
  const router = useRouter()
  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubBreadditPayload = {
        subredditId,
      }
      const { data } = await axios.post("/api/subreddit/subscribe", payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }
      toast({
        title: "There was an problem. ",
        description: "Something went wrong , please try again",
        variant: "destructive",
      })
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      return toast({
        title: "Subscribed 👍 ! ",
        description: `You are now subscribed to r/${subredditName} `,
      })
    },
  })
  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave community</Button>
  ) : (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
    >
      Join to post
    </Button>
  )
}

export default SubscribeLeaveToggle