"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/hooks/use-toast"

export default function CreatePropertyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [address, setAddress] = useState("")
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([])
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" })

  // Handle address search with Nominatim (free OpenStreetMap geocoding)
  const handleAddressSearch = async (query: string) => {
    setAddress(query)

    if (query.length < 3) {
      setAddressSuggestions([])
      return
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
      )
      const data = await response.json()
      setAddressSuggestions(data)
    } catch (error) {
      console.error("Error searching for address:", error)
    }
  }

  // Handle address selection
  const handleAddressSelect = (result: any) => {
    setAddress(result.display_name)
    setCoordinates({
      lat: result.lat,
      lng: result.lon,
    })
    setAddressSuggestions([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would submit the form data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Property created",
        description: "Your property has been created successfully.",
      })

      router.push("/properties")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your property.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Property</h1>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="features">Features & Amenities</TabsTrigger>
              <TabsTrigger value="media">Media & Location</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>Enter the basic information about the property.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input id="title" placeholder="e.g. Modern Downtown Apartment" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe the property..." className="min-h-32" required />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" placeholder="e.g. 350000" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select defaultValue="single-family">
                        <SelectTrigger id="property-type">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single-family">Single Family</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue="for-sale">
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="for-sale">For Sale</SelectItem>
                          <SelectItem value="for-rent">For Rent</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year-built">Year Built</Label>
                      <Input id="year-built" type="number" placeholder="e.g. 2010" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input id="bedrooms" type="number" placeholder="e.g. 3" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input id="bathrooms" type="number" step="0.5" placeholder="e.g. 2.5" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="square-feet">Square Feet</Label>
                      <Input id="square-feet" type="number" placeholder="e.g. 2000" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={() => document.getElementById("features-tab")?.click()}>
                    Next: Features
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="features" id="features-tab">
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                  <CardDescription>Add features and amenities that make this property special.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Address Information</Label>
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          placeholder="Search address..."
                          value={address}
                          onChange={(e) => handleAddressSearch(e.target.value)}
                          required
                        />
                        {addressSuggestions.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                            <ul className="max-h-60 overflow-auto py-1 text-sm">
                              {addressSuggestions.map((result) => (
                                <li
                                  key={result.place_id}
                                  className="cursor-pointer px-4 py-2 hover:bg-muted"
                                  onClick={() => handleAddressSelect(result)}
                                >
                                  {result.display_name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Input placeholder="City" required />
                        <Input placeholder="State" required />
                        <Input placeholder="Zip Code" required />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Property Features</Label>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {[
                        "Air Conditioning",
                        "Balcony",
                        "Fireplace",
                        "Garden",
                        "Garage",
                        "Gym",
                        "Hardwood Floors",
                        "Pool",
                        "Security System",
                        "Washer/Dryer",
                        "Waterfront",
                        "Pet Friendly",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <input type="checkbox" id={feature.toLowerCase().replace(/\s+/g, "-")} />
                          <Label htmlFor={feature.toLowerCase().replace(/\s+/g, "-")}>{feature}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => document.getElementById("details-tab")?.click()}
                  >
                    Previous: Details
                  </Button>
                  <Button type="button" onClick={() => document.getElementById("media-tab")?.click()}>
                    Next: Media
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="media" id="media-tab">
              <Card>
                <CardHeader>
                  <CardTitle>Media & Location</CardTitle>
                  <CardDescription>Add photos and set the property location.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Property Images</Label>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 text-center hover:bg-muted"
                        >
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="rounded-full bg-muted p-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                              >
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                                <line x1="16" x2="22" y1="5" y2="5" />
                                <line x1="19" x2="19" y1="2" y2="8" />
                                <circle cx="9" cy="9" r="2" />
                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium">Upload Image {i}</span>
                            <span className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</span>
                          </div>
                          <input type="file" className="hidden" accept="image/*" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Property Location</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          placeholder="e.g. 30.2672"
                          value={coordinates.lat}
                          onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          placeholder="e.g. -97.7431"
                          value={coordinates.lng}
                          onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="h-60 w-full rounded-md bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">Map Preview (Click to set location)</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => document.getElementById("features-tab")?.click()}
                  >
                    Previous: Features
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                    {isSubmitting ? "Creating..." : "Create Property"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </DashboardLayout>
  )
}
