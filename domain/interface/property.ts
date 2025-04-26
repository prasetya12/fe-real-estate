export interface IPropertyImage{
    id:string,
    property_id:string,
    url:string
}

export interface IProperty{
    address: string,
    bathrooms: number,
    bedrooms:number
    description:string
    id:string,
    latitude:number
    longitude:number
    price:number
    property_type:string,
    square_feet:number
    status:string,
    title:string,
    property_images:IPropertyImage[]
}