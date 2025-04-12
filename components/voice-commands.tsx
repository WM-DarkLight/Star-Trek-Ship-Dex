"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAudio } from "@/components/audio-provider"
import type { Starship } from "@/types/starship"

interface VoiceCommandsProps {
  onShipSelect: (ship: Starship) => void
  setSearchQuery: (query: string) => void
  setCurrentSort: (sort: "name" | "era" | "class" | "affiliation") => void
  setAffiliationFilter: (affiliation: string | null) => void
  ships: Starship[]
}

export function VoiceCommands({
  onShipSelect,
  setSearchQuery,
  setCurrentSort,
  setAffiliationFilter,
  ships,
}: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const { toast } = useToast()
  const { playSound } = useAudio()

  // Check if browser supports speech recognition
  const browserSupportsSpeechRecognition =
    typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Start listening for voice commands
  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Voice commands not supported",
        description: "Your browser does not support voice recognition.",
        variant: "destructive",
      })
      return
    }

    playSound("beep")
    setIsListening(true)

    toast({
      title: "Computer listening",
      description: "Speak a command...",
    })

    // In a real implementation, we would use the Web Speech API here
    // For this demo, we'll simulate voice recognition with a timeout
    setTimeout(() => {
      stopListening()
    }, 5000)
  }

  // Stop listening for voice commands
  const stopListening = () => {
    setIsListening(false)
  }

  // Process voice commands
  useEffect(() => {
    if (!transcript) return

    // Convert to lowercase for easier matching
    const command = transcript.toLowerCase()

    // Process command
    if (command.includes("computer")) {
      playSound("success")

      // Ship selection commands
      if (command.includes("show me") || command.includes("display")) {
        const shipMatches = ships.filter(
          (ship) => command.includes(ship.name.toLowerCase()) || command.includes(ship.class.toLowerCase()),
        )

        if (shipMatches.length > 0) {
          onShipSelect(shipMatches[0])
          toast({
            title: "Command accepted",
            description: `Displaying ${shipMatches[0].name}`,
          })
          return
        }
      }

      // Search commands
      if (command.includes("search") || command.includes("find")) {
        const searchTerms = command.replace(/computer|search|find|for/g, "").trim()
        if (searchTerms) {
          setSearchQuery(searchTerms)
          toast({
            title: "Command accepted",
            description: `Searching for "${searchTerms}"`,
          })
          return
        }
      }

      // Sort commands
      if (command.includes("sort by")) {
        if (command.includes("name")) {
          setCurrentSort("name")
          toast({
            title: "Command accepted",
            description: "Sorting ships by name",
          })
          return
        } else if (command.includes("class")) {
          setCurrentSort("class")
          toast({
            title: "Command accepted",
            description: "Sorting ships by class",
          })
          return
        } else if (command.includes("era")) {
          setCurrentSort("era")
          toast({
            title: "Command accepted",
            description: "Sorting ships by era",
          })
          return
        } else if (command.includes("affiliation")) {
          setCurrentSort("affiliation")
          toast({
            title: "Command accepted",
            description: "Sorting ships by affiliation",
          })
          return
        }
      }

      // Filter commands
      if (command.includes("filter") || command.includes("show only")) {
        if (command.includes("federation")) {
          setAffiliationFilter("Federation Starfleet")
          toast({
            title: "Command accepted",
            description: "Filtering Federation ships",
          })
          return
        } else if (command.includes("klingon")) {
          setAffiliationFilter("Klingon Empire")
          toast({
            title: "Command accepted",
            description: "Filtering Klingon ships",
          })
          return
        } else if (command.includes("romulan")) {
          setAffiliationFilter("Romulan Star Empire")
          toast({
            title: "Command accepted",
            description: "Filtering Romulan ships",
          })
          return
        } else if (command.includes("all")) {
          setAffiliationFilter(null)
          toast({
            title: "Command accepted",
            description: "Showing all ships",
          })
          return
        }
      }

      // Command not recognized
      toast({
        title: "Command not recognized",
        description: "Please try again with a valid command",
        variant: "destructive",
      })
      playSound("error")
    }

    // Clear transcript after processing
    setTranscript("")
  }, [transcript, ships, onShipSelect, setSearchQuery, setCurrentSort, setAffiliationFilter, toast, playSound])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full w-12 h-12 ${
          isListening
            ? "bg-lcars-accent1 text-black border-lcars-accent1 animate-pulse"
            : "bg-black/60 border-lcars-accent2/50 text-lcars-accent2 hover:bg-black/80 hover:border-lcars-accent2"
        }`}
        onClick={toggleListening}
        disabled={!browserSupportsSpeechRecognition}
      >
        {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </Button>
    </div>
  )
}
