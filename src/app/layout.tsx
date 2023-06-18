import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import { Jost } from "next/font/google"
export const metadata = {
  title: "Breaddit",
  description: "A Reddit clone built with Next.js and TypeScript.",
}
const jost = Jost({ subsets: ["latin"] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn()}>
      <body>{children}</body>
    </html>
  )
}
