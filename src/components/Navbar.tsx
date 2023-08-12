import Link from "next/link"
import { Icons } from "./Icons"
import { buttonVariants } from "./ui/Button"
import { getAuthSession } from "@/lib/auth"
import UserAccountNav from "./UserAccountNav"
import SearchBar from "./SearchBar"
import ThemeToggle from "./ThemeToggle"

const Navbar = async () => {
  const session = await getAuthSession()
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 dark:bg-slate-900/50 border-b border-zinc-300 z-[10] py-3">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 dark:text-zinc-50 text-sm font-medium md:block">
            Breaddit
          </p>
        </Link>
        {/* Search Bar */}
        <SearchBar />
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          {session ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
