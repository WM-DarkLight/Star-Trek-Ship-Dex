"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Upload, Database, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAudio } from "@/components/audio-provider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { starships } from "@/data/starships"
import type { Starship } from "@/types/starship"

interface ImportExportMenuProps {
  onImportShips: (ships: Starship[]) => void
}

export function ImportExportMenu({ onImportShips }: ImportExportMenuProps) {
  const { toast } = useToast()
  const { playSound } = useAudio()
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)

  // Export ships to JSON file
  const handleExport = () => {
    playSound("beep")

    try {
      // Create a JSON string of the ships data
      const shipsData = JSON.stringify(starships, null, 2)

      // Create a blob with the data
      const blob = new Blob([shipsData], { type: "application/json" })

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)

      // Create a link element
      const link = document.createElement("a")
      link.href = url
      link.download = `starfleet_database_${new Date().toISOString().split("T")[0]}.json`

      // Append the link to the body
      document.body.appendChild(link)

      // Click the link to trigger the download
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Ship database has been exported to JSON",
      })
      playSound("success")
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting the ship database",
        variant: "destructive",
      })
      playSound("error")
    }
  }

  // Import ships from JSON file
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedShips = JSON.parse(content)

        // Validate the imported data
        if (!Array.isArray(importedShips)) {
          throw new Error("Imported data is not an array")
        }

        // Basic validation of ship objects
        const validShips = importedShips.filter((ship) => {
          return (
            ship &&
            typeof ship === "object" &&
            typeof ship.id === "string" &&
            typeof ship.name === "string" &&
            typeof ship.class === "string" &&
            typeof ship.affiliation === "string" &&
            typeof ship.era === "string" &&
            typeof ship.stats === "object"
          )
        })

        if (validShips.length === 0) {
          throw new Error("No valid ships found in the imported data")
        }

        if (validShips.length !== importedShips.length) {
          toast({
            title: "Partial Import",
            description: `Imported ${validShips.length} of ${importedShips.length} ships. Some ships were invalid.`,
            variant: "warning",
          })
        } else {
          toast({
            title: "Import Successful",
            description: `Imported ${validShips.length} ships to the database`,
          })
        }

        // Pass the valid ships to the parent component
        onImportShips(validShips)
        playSound("success")
        setShowImportDialog(false)
        setImportError(null)

        // Reset the file input
        event.target.value = ""
      } catch (error) {
        console.error("Import error:", error)
        setImportError(error instanceof Error ? error.message : "Unknown error during import")
        playSound("error")
      }
    }

    reader.onerror = () => {
      setImportError("Error reading the file")
      playSound("error")
    }

    reader.readAsText(file)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-lcars-frame text-black hover:bg-lcars-accent1 transition-all"
            onClick={() => playSound("beep")}
          >
            <Database className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black border-lcars-frame">
          <DropdownMenuItem
            className="text-lcars-accent2 hover:bg-lcars-accent2/20 cursor-pointer"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Ships
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-lcars-accent3 hover:bg-lcars-accent3/20 cursor-pointer"
            onClick={() => {
              setShowImportDialog(true)
              playSound("beep")
            }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Ships
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="bg-black border-lcars-frame">
          <DialogHeader>
            <DialogTitle className="text-lcars-accent1">Import Ships</DialogTitle>
            <DialogDescription>Upload a JSON file containing ship data to import into the database.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {importError && (
              <div className="bg-red-900/30 border border-red-500/50 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-red-200 text-sm">{importError}</div>
              </div>
            )}

            <div className="bg-black/40 border-2 border-dashed border-lcars-frame/40 rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-lcars-accent3" />
              <p className="text-lcars-text mb-4">Click to select a JSON file or drag and drop</p>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button
                variant="outline"
                className="bg-transparent border-lcars-accent3/50 text-lcars-accent3 hover:bg-lcars-accent3/20"
              >
                Select File
              </Button>
            </div>

            <div className="text-lcars-text/70 text-sm">
              <p>The imported ships will be added to your existing database.</p>
              <p>File must be a valid JSON array of ship objects.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
