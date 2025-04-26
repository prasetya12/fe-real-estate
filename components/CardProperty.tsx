import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, BedDouble, Bath, SquareIcon as SquareFoot, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

interface CardPropertyProps{
    id:string,
    images:string,
    title:string,
    address:string,
    bedrooms:number,
    bathrooms:number,
    squareFeet:number,
    description:string,
    price:number


}

export default function CardProperty({
    id,
    images,
    title,
    address,
    bedrooms,
    bathrooms,
    squareFeet,
    description,
    price
}:CardPropertyProps){
    return(
        <>
        <Card key={id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={images || "/placeholder.svg"}
                  alt={title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {address}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-primary">${price.toLocaleString()}</span>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BedDouble className="h-4 w-4" />
                      <span>{bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SquareFoot className="h-4 w-4" />
                      <span>{squareFeet.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/properties/${id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <Link href={`/properties/${id}/edit`}>
                  <Button variant="ghost">Edit</Button>
                </Link>
              </CardFooter>
            </Card>
        </>
    )
}