"use client"
import { FC, useState } from "react"
import { Button } from "./ui/Button"
import { cn } from "@/lib/utils"
import { signIn } from "next-auth/react"
import { Icons } from "./Icons"
import { useToast } from "@/hooks/use-toast"
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was a error login Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGithub = async () => {
    setIsLoading(true)
    try {
      await signIn("github")
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was a error login Github",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div
      className={cn("flex flex-col justify-center gap-5", className)}
      {...props}
    >
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
      <Button
        onClick={loginWithGithub}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.github className=" h-4 w-4 mr-2" />}
        Github
      </Button>
    </div>
  )
}

export default UserAuthForm
