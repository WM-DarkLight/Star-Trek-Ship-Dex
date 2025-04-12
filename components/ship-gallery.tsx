"use client"

import { useState } from "react"
import type { Starship } from "@/types/starship"
import { motion } from "framer-motion"
import { ImageIcon, Info } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useAudio } from "@/components/audio-provider"

interface ShipGalleryProps {
  ship: Starship
}

export function ShipGallery({ ship }: ShipGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { playSound } = useAudio()

  // Generate gallery images if not provided
  const gallery = ship.gallery || generateGallery(ship)

  const openImage = (url: string) => {
    playSound("select")
    setSelectedImage(url)
  }

  return (
    <div className="space-y-6">
      <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
        <h2 className="text-lcars-accent1 text-xl font-medium mb-3 flex items-center">
          <ImageIcon className="h-5 w-5 mr-2" />
          Ship Gallery
        </h2>
        <p className="text-lcars-text">Visual records of the {ship.name} from Federation archives.</p>
      </div>

      {/* Main ship image */}
      {ship.imageUrl && (
        <div className="bg-black/40 border border-lcars-frame/30 p-4 rounded-md">
          <div
            className="h-[300px] flex items-center justify-center cursor-pointer"
            onClick={() => openImage(ship.imageUrl!)}
          >
            <img
              src={ship.imageUrl || "/placeholder.svg"}
              alt={`${ship.name} - ${ship.class} class starship`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="mt-3 text-center text-lcars-text/70">
            {ship.name} - {ship.class} class starship
          </div>
        </div>
      )}

      {/* Gallery grid */}
      {gallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-black/30 border border-lcars-accent2/30 rounded-md overflow-hidden cursor-pointer"
              onClick={() => openImage(item.url)}
            >
              <div className="h-48 flex items-center justify-center bg-black/60">
                <img
                  src={item.url || "/placeholder.svg"}
                  alt={item.caption}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-2 text-sm text-lcars-text/80">{item.caption}</div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-black/30 border border-lcars-accent2/30 p-6 rounded-md text-center">
          <Info className="h-8 w-8 text-lcars-accent2/50 mx-auto mb-2" />
          <p className="text-lcars-text/70">No additional images available in Federation archives.</p>
          <p className="text-lcars-text/50 text-sm mt-2">Request access clearance for more visual data.</p>
        </div>
      )}

      {/* Image viewer dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="bg-black border-lcars-frame max-w-4xl w-[90vw]">
          <div className="h-[80vh] flex items-center justify-center">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt={`${ship.name} - detailed view`}
              className="object-contain max-h-full max-w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper function to generate gallery images based on ship data
function generateGallery(ship: Starship) {
  const gallery: { url: string; caption: string }[] = []

  // For now, we'll use placeholder images
  // In a real application, these would be actual ship images

  // Add some generic views based on ship class
  if (ship.class.includes("Constitution")) {
    gallery.push(
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} dorsal view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} ventral view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} port profile`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} engineering section`,
      },
    )
  } else if (ship.class.includes("Galaxy")) {
    gallery.push(
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} dorsal view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} ventral view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} saucer separation sequence`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} main bridge`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} engineering section`,
      },
    )
  } else if (ship.class.includes("Defiant")) {
    gallery.push(
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} dorsal view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} ventral view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} main bridge`,
      },
    )
  } else if (ship.class.includes("Intrepid")) {
    gallery.push(
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} dorsal view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} ventral view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} with nacelles in landing configuration`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} main bridge`,
      },
    )
  } else if (ship.class.includes("NX")) {
    gallery.push(
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} dorsal view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} ventral view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} main bridge`,
      },
    )
  } else {
    // Generic views for other ships
    gallery.push(
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} dorsal view`,
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        caption: `${ship.name} ventral view`,
      },
    )
  }

  return gallery
}
