"use client"

import type React from "react"

import { createContext, useContext, useEffect, useRef, useState } from "react"

type AudioType = "beep" | "select" | "alert" | "success" | "error" | "warp"

interface AudioContextType {
  playSound: (type: AudioType) => void
  isMuted: boolean
  toggleMute: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const audioRefs = useRef<Record<AudioType, HTMLAudioElement | null>>({
    beep: null,
    select: null,
    alert: null,
    success: null,
    error: null,
    warp: null,
  })

  useEffect(() => {
    // Initialize audio elements
    audioRefs.current = {
      beep: new Audio("/sounds/lcars-beep.mp3"),
      select: new Audio("/sounds/lcars-select.mp3"),
      alert: new Audio("/sounds/lcars-alert.mp3"),
      success: new Audio("/sounds/lcars-success.mp3"),
      error: new Audio("/sounds/lcars-error.mp3"),
      warp: new Audio("/sounds/lcars-warp.mp3"),
    }

    // Set volume for all audio elements
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = 0.5
      }
    })

    return () => {
      // Clean up audio elements
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause()
          audio.currentTime = 0
        }
      })
    }
  }, [])

  const playSound = (type: AudioType) => {
    if (isMuted) return

    const audio = audioRefs.current[type]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch((e) => console.log("Audio play prevented:", e))
    }
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  return <AudioContext.Provider value={{ playSound, isMuted, toggleMute }}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
