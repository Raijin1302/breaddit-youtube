import { User } from "next-auth"
import { FC } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback } from "./ui/Avatar"
import { AvatarProps } from "@radix-ui/react-avatar"
interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span>{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
