'use client'
import { properties } from "@/lib/data"
import { useGetProperty } from "@/hooks/property/useGetProperty"
import CardProperty from "@/components/CardProperty"
import { IProperty } from "@/domain/interface/property"
export default function PropertiesPageClient(){
      const {data:properties,isPending} = useGetProperty()

      if(isPending){
        return(
            <>
                <div>
                    Loading....
                </div>
            </>
        )
      }
    
    return (
        <>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property:IProperty,key:number) => (
            <CardProperty
                id={property.id}
                address={property.address}
                bathrooms={property.bathrooms}
                bedrooms={property.bedrooms}
                description={property.description}
                images={property.property_images && property.property_images.length>0?property.property_images[0].url:"/placeholder.svg"}
                price={property.price}
                squareFeet={property.square_feet}
                title={property.title}
                key={key}
            />
          ))}
        </div>
        </>
    )
}