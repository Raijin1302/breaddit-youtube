"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FC } from "react"

interface ProviderProps {
  children: React.ReactNode
}

const Provider: FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Provider
