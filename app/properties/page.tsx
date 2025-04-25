import Link from "next/link"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, BedDouble, Bath, SquareIcon as SquareFoot, Plus } from "lucide-react"
import { properties } from "@/lib/data"
import { getTokenFromCookie } from "@/lib/auth"
import { redirect } from 'next/navigation';
export default async function PropertiesPage() {

  const token = await getTokenFromCookie();
  console.log(token,'a')
  if (!token) {
    redirect('/')
  }
  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Properties</h1>
          <Link href="/properties/create">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {property.address}, {property.city}, {property.state}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-primary">${property.price.toLocaleString()}</span>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{property.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/properties/${property.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <Link href={`/properties/${property.id}/edit`}>
                  <Button variant="ghost">Edit</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
