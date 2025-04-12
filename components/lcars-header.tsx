"use client"

import { useEffect, useState } from "react"
import { useAudio } from "@/components/audio-provider"
import { Button } from "@/components/ui/button"
import { AlertCircle, HelpCircle, Volume2, VolumeX } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function LcarsHeader() {
  const [stardate, setStardate] = useState("")
  const [showHelp, setShowHelp] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const { isMuted, toggleMute } = useAudio()

  // Calculate a Star Trek style stardate
  useEffect(() => {
    const calculateStardate = () => {
      const now = new Date()
      // TNG-era stardates typically started with the number 4 or 5
      const base = 50000.0
      const year = now.getFullYear() - 2000 // Offset from year 2000
      const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
      const stardate = base + year * 1000 + dayOfYear
      return stardate.toFixed(1)
    }

    setStardate(calculateStardate())
    const interval = setInterval(() => {
      setStardate(calculateStardate())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-black relative">
      <div className="flex h-16">
        {/* Left elbow */}
        <div className="w-16 h-16 bg-lcars-elbow"></div>

        {/* Top bar */}
        <div className="flex-1 bg-lcars-frame h-8"></div>

        {/* Right elbow */}
        <div className="w-16 h-16 bg-lcars-elbow"></div>
      </div>

      {/* Header content */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-center px-20">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-black font-bold">LCARS</span>
            <span className="text-black font-bold">STARFLEET DATABASE</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-black font-bold">STARDATE {stardate}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-black hover:bg-lcars-accent1/50 hover:text-black"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowHelp(true)}
              className="text-black hover:bg-lcars-accent1/50 hover:text-black"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAbout(true)}
              className="text-black hover:bg-lcars-accent1/50 hover:text-black"
            >
              <AlertCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Help Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="bg-black border-lcars-frame">
          <DialogHeader>
            <DialogTitle className="text-lcars-accent1">LCARS Help</DialogTitle>
            <DialogDescription>Welcome to the Federation Starship Database.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-lcars-text mt-4">
            <h3 className="text-lcars-accent2 font-bold">Navigation</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the sidebar to browse and search for starships</li>
              <li>Click on a ship to view its detailed specifications</li>
              <li>Toggle favorites by clicking the star icon</li>
              <li>Use the filter and sort options to organize the ship list</li>
              <li>Compare ships by selecting multiple vessels</li>
            </ul>
            <h3 className="text-lcars-accent2 font-bold">Voice Commands</h3>
            <div>Click the microphone icon and try these commands:</div>
            <ul className="list-disc pl-5 space-y-2">
              <li>"Computer, show me the Enterprise"</li>
              <li>"Computer, filter by Federation ships"</li>
              <li>"Computer, sort by class"</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      {/* About Dialog */}
      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="bg-black border-lcars-frame">
          <DialogHeader>
            <DialogTitle className="text-lcars-accent1">About LCARS</DialogTitle>
            <DialogDescription>Library Computer Access and Retrieval System</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-lcars-text mt-4">
            <div>
              LCARS (Library Computer Access and Retrieval System) is the computer operating system used by the
              Federation and Starfleet in the 24th century.
            </div>
            <div>
              This database contains technical specifications and historical data on various starships from across the
              Alpha and Beta Quadrants.
            </div>
            <div className="text-lcars-accent3">Starfleet Command Authorization: 47-Alpha-Tango</div>
            <div className="text-xs text-lcars-text/60 mt-6">
              LCARS Starship Database v2.0 - Starfleet Corps of Engineers
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}
