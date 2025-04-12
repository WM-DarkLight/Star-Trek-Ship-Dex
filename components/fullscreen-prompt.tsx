"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/components/audio-provider"
import { Maximize2 } from "lucide-react"

export function FullscreenPrompt() {
  const [open, setOpen] = useState(false)
  const { playSound } = useAudio()

  useEffect(() => {
    // Check if the prompt has been shown before in this session
    const hasShownPrompt = sessionStorage.getItem("lcars_fullscreen_prompt")

    // Only show the prompt if it hasn't been shown before
    if (!hasShownPrompt && !document.fullscreenElement) {
      // Delay the prompt slightly to allow the app to load first
      const timer = setTimeout(() => {
        setOpen(true)
        playSound("beep")
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [playSound])

  const handleEnterFullscreen = () => {
    playSound("success")

    // Try to enter fullscreen mode
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`)
    })

    // Mark that we've shown the prompt
    sessionStorage.setItem("lcars_fullscreen_prompt", "true")
    setOpen(false)
  }

  const handleDecline = () => {
    playSound("select")
    // Mark that we've shown the prompt
    sessionStorage.setItem("lcars_fullscreen_prompt", "true")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black border-lcars-frame max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lcars-accent1 text-xl">LCARS Interface Optimization Notice</DialogTitle>
          <DialogDescription className="text-lcars-text">
            Starfleet Command Advisory: Subspace Transmission 47-Alpha
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-lcars-text">
          <p>
            "Lieutenant, our sensors indicate that optimal viewing conditions for the LCARS interface have not been
            established."
          </p>
          <p>
            "To ensure proper display of all tactical and scientific data, the computer recommends engaging the full
            viewscreen mode."
          </p>
          <p className="text-lcars-text/70 text-sm">You may disengage this mode at any time by pressing the ESC key.</p>
        </div>

        <DialogFooter className="flex flex-row gap-2 justify-end">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="bg-transparent border-lcars-accent2/50 text-lcars-accent2 hover:bg-lcars-accent2/20"
          >
            Negative
          </Button>
          <Button
            onClick={handleEnterFullscreen}
            className="bg-lcars-accent1 text-black hover:bg-lcars-accent1/90 flex items-center gap-2"
          >
            <Maximize2 className="h-4 w-4" />
            Engage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
