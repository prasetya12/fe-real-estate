"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BedDouble, Bath, SquareIcon as SquareFoot } from "lucide-react"
import { useMobile } from "@/components/hooks/use-mobile"
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation";
import { useGetProperty } from "@/hooks/property/useGetProperty"
import { IProperty } from "@/domain/interface/property"

export default function MapPage() {  

  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const { toast } = useToast()
  const [leafletReady, setLeafletReady] = useState(false)


  const {data:properties} = useGetProperty()


  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.L || !properties) return

    const mapElement = mapRef.current as HTMLElement & { _leaflet_id?: number }

    if (mapElement._leaflet_id) {
      return
    }

    const mapInstance = window.L.map(mapRef.current).setView([30.2672, -97.7431], 12)

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance)

    setMap(mapInstance)
    setMapLoaded(true)

    const createCustomIcon = (price: string) => {
      return window.L.divIcon({
        className: "custom-marker",
        html: `<div class="bg-primary text-white px-2 py-1 rounded-full text-sm font-bold shadow-md">${price}</div>`,
        iconSize: [80, 40],
        iconAnchor: [40, 20],
      })
    }

    const mapMarkers = properties.map((property:IProperty) => {
      const priceDisplay = `$${Math.round(property.price / 1000)}K`

      const marker = window.L.marker([property.latitude, property.longitude], {
        icon: createCustomIcon(priceDisplay),
      }).addTo(mapInstance)

      const popupContent = document.createElement("div")
      popupContent.className = "property-popup"
      popupContent.innerHTML = `
        <div class="w-64">
          <img src="${property.property_images && property.property_images.length>0?property.property_images[0].url : "/placeholder.svg"}" alt="${
            property.title
          }" class="w-full h-32 object-cover rounded-t-md">
          <div class="p-2 bg-white rounded-b-md">
            <h3 class="font-semibold text-sm">${property.title}</h3>
            <p class="text-xs text-gray-500">${property.address}}</p>
            <p class="font-bold text-primary">$${property.price.toLocaleString()}</p>
            <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span>${property.bedrooms} bd</span>
              <span>•</span>
              <span>${property.bathrooms} ba</span>
              <span>•</span>
              <span>${property.square_feet.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      `

      const popup = window.L.popup({
        closeButton: true,
        className: "property-popup",
        maxWidth: 300,
        minWidth: 260,
      }).setContent(popupContent)

      marker.bindPopup(popup)
      marker.on("mouseover", () => {
        marker.openPopup()
        setSelectedProperty(property.id)
      })

      marker.on("mouseout", () => {
        marker.closePopup()
      })

      return { marker, propertyId: property.id }
    })

    setMarkers(mapMarkers)

    const bounds = window.L.latLngBounds(properties.map((p:IProperty) => [p.latitude, p.longitude]))
    mapInstance.fitBounds(bounds, { padding: [50, 50] })

    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
      mapInstance.remove()
    }
  }, [properties])


  useEffect(() => {
    if (typeof window !== "undefined" && !window.L) {
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(linkElement)

      const scriptElement = document.createElement("script")
      scriptElement.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      scriptElement.onload = () => {
        setLeafletReady(true)
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
        document.head.removeChild(scriptElement)
      }
    } else if (window.L) {
      setLeafletReady(true)
    }
  }, [toast])

  useEffect(() => {
    if (leafletReady && properties) {
      initializeMap()
    }
  }, [leafletReady, properties, initializeMap])

  // Handle search input
  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length < 3) {
      setSearchResults([])
      return
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
      )
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error("Error searching for location:", error)
    }
  }

  const handleSearchResultSelect = (result: any) => {
    if (map) {
      map.setView([Number.parseFloat(result.lat), Number.parseFloat(result.lon)], 14)
      setSearchResults([])
      setSearchQuery(result.display_name)
    }
  }

  useEffect(() => {
    if (!map || !markers.length) return

    if (selectedProperty) {
      const property = properties.find((p:IProperty) => p.id === selectedProperty)
      if (!property) return

      const markerObj = markers.find((m) => m.propertyId === selectedProperty)
      if (!markerObj) return

      markerObj.marker.openPopup()

      map.setView([property.latitude, property.longitude], 14)
    }
  }, [selectedProperty, map, markers])

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
        {/* Property List */}
        <div className={`w-full ${isMobile ? "h-1/2" : "h-full"} md:w-1/3 lg:w-1/4 overflow-auto border-r bg-white`}>
          <div className="sticky top-0 z-10 bg-white p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search locations..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={handleSearchInput}
              />
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                  <ul className="max-h-60 overflow-auto py-1 text-sm">
                    {searchResults.map((result) => (
                      <li
                        key={result.place_id}
                        className="cursor-pointer px-4 py-2 hover:bg-muted"
                        onClick={() => handleSearchResultSelect(result)}
                      >
                        {result.display_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="divide-y">
            {properties&&properties.map((property:IProperty) => (
              <div
                key={property.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-muted ${
                  selectedProperty === property.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedProperty(property.id)}
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={property.property_images && property.property_images.length>0?property.property_images[0].url : "/placeholder.svg"}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">{property.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {property.address}
                    </p>
                    <p className="font-bold text-primary">${property.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <BedDouble className="h-3 w-3" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-3 w-3" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <SquareFoot className="h-3 w-3" />
                        <span>{property.square_feet.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`relative w-full ${isMobile ? "h-1/2" : "h-full"} md:w-2/3 lg:w-3/4`}>
          <div ref={mapRef} className="h-full w-full map-container z-10">
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p>Loading map...</p>
                </div>
              </div>
            )}
          </div>

          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
              <Card className="bg-white shadow-lg">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{properties.find((p:IProperty) => p.id === selectedProperty)?.title}</CardTitle>
                  <CardDescription>{properties.find((p:IProperty) => p.id === selectedProperty)?.address}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="aspect-video w-full overflow-hidden rounded-md">
                    <img
                      src={properties.find((p: IProperty) => p.id === selectedProperty)?.images?.length > 0
                        ? properties.find((p: IProperty) => p.id === selectedProperty)?.images[0]
                        : "/placeholder.svg"}
                      alt={properties.find((p:IProperty) => p.id === selectedProperty)?.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-lg text-primary">
                      ${properties.find((p:IProperty) => p.id === selectedProperty)?.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" />
                        <span>{properties.find((p:IProperty) => p.id === selectedProperty)?.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{properties.find((p:IProperty) => p.id === selectedProperty)?.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <SquareFoot className="h-4 w-4" />
                        <span>{properties.find((p:IProperty) => p.id === selectedProperty)?.square_feet.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4 w-full bg-primary hover:bg-primary/90">View Details</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

declare global {
  interface Window {
    L: any
  }
}
