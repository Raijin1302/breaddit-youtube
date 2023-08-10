"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FC } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
interface ProviderProps {
  children: React.ReactNode
}

const Provider: FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Provider
