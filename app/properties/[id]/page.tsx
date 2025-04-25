import Link from "next/link"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, BedDouble, Bath, SquareIcon as SquareFoot, Calendar, Home, Edit, Trash2, Check } from "lucide-react"
import { properties } from "@/lib/data"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = properties.find((p) => p.id === params.id)

  if (!property) {
    return (
      <DashboardLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Property Not Found</h1>
          <p>The property you are looking for does not exist.</p>
          <Link href="/properties">
            <Button className="mt-4">Back to Properties</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {property.address}, {property.city}, {property.state} {property.zipCode}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/properties/${property.id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="p-4 border rounded-md mt-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{property.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Property Details</h3>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <BedDouble className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Bedrooms</p>
                            <p className="text-muted-foreground">{property.bedrooms}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Bathrooms</p>
                            <p className="text-muted-foreground">{property.bathrooms}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <SquareFoot className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Square Feet</p>
                            <p className="text-muted-foreground">{property.squareFeet.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Property Type</p>
                            <p className="text-muted-foreground">{property.propertyType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Year Built</p>
                            <p className="text-muted-foreground">{property.yearBuilt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="p-4 border rounded-md mt-2">
                  <h3 className="text-lg font-semibold mb-2">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {property.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="location" className="p-4 border rounded-md mt-2">
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <div id="property-map" className="h-60 w-full rounded-md overflow-hidden">
                    <PropertyLocationMap property={property} />
                  </div>
                  <div className="mt-4">
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      {property.address}, {property.city}, {property.state} {property.zipCode}
                    </p>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Latitude</p>
                      <p className="text-muted-foreground">{property.latitude}</p>
                    </div>
                    <div>
                      <p className="font-medium">Longitude</p>
                      <p className="text-muted-foreground">{property.longitude}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-4 sticky top-20">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">
                  {property.status}
                </Badge>
                <div className="text-3xl font-bold text-primary">${property.price.toLocaleString()}</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SquareFoot className="h-4 w-4" />
                    <span>{property.squareFeet.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-primary hover:bg-primary/90">Contact Agent</Button>
                <Button variant="outline" className="w-full">
                  Schedule Viewing
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-2">Property Details</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-muted-foreground">Property ID</div>
                  <div className="font-medium">{property.id}</div>
                  <div className="text-muted-foreground">Property Type</div>
                  <div className="font-medium">{property.propertyType}</div>
                  <div className="text-muted-foreground">Year Built</div>
                  <div className="font-medium">{property.yearBuilt}</div>
                  <div className="text-muted-foreground">Status</div>
                  <div className="font-medium">{property.status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// Property Location Map Component
function PropertyLocationMap({ property }: { property: any }) {
  return (
    <div className="h-full w-full bg-muted flex items-center justify-center">
      <p className="text-muted-foreground">Map Preview</p>
    </div>
  )
}
