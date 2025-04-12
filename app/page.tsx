"use client"

import { useEffect } from "react"
import { StarshipDatabase } from "@/components/starship-database"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { LcarsHeader } from "@/components/lcars-header"
import { AudioProvider } from "@/components/audio-provider"
import { FullscreenPrompt } from "@/components/fullscreen-prompt"

export default function Home() {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: "LCARS System Online",
      description: "Welcome to the Federation Starship Database",
      duration: 3000,
    })
  }, [toast])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <AudioProvider>
        <div className="min-h-screen bg-black text-lcars-text flex flex-col">
          <LcarsHeader />
          <div className="flex-1 flex">
            <StarshipDatabase />
          </div>
          <Toaster />
          <FullscreenPrompt />
        </div>
      </AudioProvider>
    </ThemeProvider>
  )
}
