"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Starship } from "@/types/starship"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, RotateCcw } from "lucide-react"
import { useAudio } from "@/components/audio-provider"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ShipModelProps {
  ship: Starship
}

export function ShipModel({ ship }: ShipModelProps) {
  const [expanded, setExpanded] = useState(false)
  const [rotating, setRotating] = useState(true)
  const [showFullImage, setShowFullImage] = useState(false)
  const { playSound } = useAudio()

  const toggleExpanded = () => {
    playSound("select")
    setExpanded(!expanded)
  }

  const toggleRotating = () => {
    playSound("beep")
    setRotating(!rotating)
  }

  const openFullImage = () => {
    if (ship.imageUrl) {
      playSound("select")
      setShowFullImage(true)
    }
  }

  // Warp effect when ship changes
  useEffect(() => {
    playSound("warp")
  }, [ship.id, playSound])

  return (
    <div className={`relative ${expanded ? "h-[500px]" : "h-[250px]"} transition-all duration-300`}>
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleRotating}
          className="bg-black/60 border-lcars-accent2/50 text-lcars-accent2 hover:bg-black/80 hover:border-lcars-accent2"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleExpanded}
          className="bg-black/60 border-lcars-accent2/50 text-lcars-accent2 hover:bg-black/80 hover:border-lcars-accent2"
        >
          {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>

      <motion.div
        className="w-full h-full bg-black/40 rounded-md border border-lcars-frame/30 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full flex items-center justify-center cursor-pointer" onClick={openFullImage}>
          {ship.imageUrl ? (
            <motion.img
              src={ship.imageUrl}
              alt={`${ship.name} - ${ship.class} class starship`}
              className="object-contain h-full w-full p-2"
              animate={rotating ? { rotateY: 360 } : {}}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center ${ship.placeholder_style || "placeholder-default"}`}
            >
              <span className="text-lcars-text/50 bg-black/60 px-3 py-1 rounded">{ship.class} Class Visual</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Full image dialog */}
      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="bg-black border-lcars-frame max-w-4xl w-[90vw]">
          <div className="h-[80vh] flex items-center justify-center">
            <img
              src={ship.imageUrl || "/placeholder.svg"}
              alt={`${ship.name} - ${ship.class} class starship`}
              className="object-contain max-h-full max-w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
