"use client"

import { useEffect, useRef } from "react"
import { useToast } from "@/components/hooks/use-toast"

interface PropertyLocationMapProps {
  property: {
    id: string
    title: string
    latitude: number
    longitude: number
    address: string
    city: string
    state: string
  }
}

export default function PropertyLocationMap({ property }: PropertyLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!mapRef.current) return

    // Load Leaflet if not already loaded
    if (typeof window !== "undefined" && !window.L) {
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkElement.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkElement.crossOrigin = ""
      document.head.appendChild(linkElement)

      const scriptElement = document.createElement("script")
      scriptElement.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      scriptElement.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      scriptElement.crossOrigin = ""
      scriptElement.onload = () => {
        initializeMap()
      }
      scriptElement.onerror = () => {
        toast({
          title: "Error loading map",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        })
      }
      document.head.appendChild(scriptElement)

      return () => {
        document.head.removeChild(linkElement)
        if (document.head.contains(scriptElement)) {
          document.head.removeChild(scriptElement)
        }
      }
    } else if (window.L) {
      initializeMap()
    }

    // Initialize map
    function initializeMap() {
      if (!window.L) return

      // Create map instance
      const map = window.L.map(mapRef.current).setView([property.latitude, property.longitude], 15)

      // Add OpenStreetMap tile layer
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Create custom icon for marker
      const icon = window.L.divIcon({
        className: "custom-marker",
        html: `<div class="bg-primary text-white px-2 py-1 rounded-full text-sm font-bold shadow-md">$${Math.round(
          property.price / 1000,
        )}K</div>`,
        iconSize: [80, 40],
        iconAnchor: [40, 20],
      })

      // Add marker
      const marker = window.L.marker([property.latitude, property.longitude], {
        icon: icon,
      }).addTo(map)

      // Add popup
      marker.bindPopup(`<b>${property.title}</b><br>${property.address}, ${property.city}, ${property.state}`)

      return () => {
        map.remove()
      }
    }
  }, [property, toast])

  return <div ref={mapRef} className="h-full w-full" />
}

// Add TypeScript declaration for Leaflet
declare global {
  interface Window {
    L: any
  }
}
