import Navbar from "@/components/Navbar"
import Provider from "@/components/Provider"
import { Toaster } from "@/components/ui/Toaster"
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
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        jost.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Provider>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}
          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
