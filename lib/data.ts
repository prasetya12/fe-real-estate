export interface Property {
  id: string
  title: string
  description: string
  price: number
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  squareFeet: number
  yearBuilt: number
  propertyType: string
  status: "For Sale" | "For Rent" | "Sold" | "Pending"
  features: string[]
  images: string[]
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description:
      "Luxurious apartment in the heart of downtown with stunning city views. Features high-end finishes, open floor plan, and building amenities including a gym and rooftop pool.",
    price: 425000,
    address: "123 Main Street",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    yearBuilt: 2018,
    propertyType: "Apartment",
    status: "For Sale",
    features: ["Hardwood Floors", "Stainless Steel Appliances", "Balcony", "In-unit Laundry"],
    images: ["/placeholder.svg?height=400&width=600&text=Apartment%201"],
    latitude: 30.2672,
    longitude: -97.7431,
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-01-15T12:00:00Z",
  },
  {
    id: "2",
    title: "Spacious Family Home",
    description:
      "Beautiful family home in a quiet neighborhood with excellent schools. Features a large backyard, updated kitchen, and spacious bedrooms.",
    price: 550000,
    address: "456 Oak Avenue",
    city: "Austin",
    state: "TX",
    zipCode: "78704",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2500,
    yearBuilt: 2005,
    propertyType: "Single Family",
    status: "For Sale",
    features: ["Backyard", "Garage", "Updated Kitchen", "Fireplace"],
    images: ["/placeholder.svg?height=400&width=600&text=Family%20Home"],
    latitude: 30.2539,
    longitude: -97.766,
    createdAt: "2023-02-10T12:00:00Z",
    updatedAt: "2023-02-10T12:00:00Z",
  },
  {
    id: "3",
    title: "Charming Bungalow",
    description:
      "Charming historic bungalow with modern updates. Features original hardwood floors, updated kitchen and bathrooms, and a cozy front porch.",
    price: 375000,
    address: "789 Elm Street",
    city: "Austin",
    state: "TX",
    zipCode: "78702",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    yearBuilt: 1935,
    propertyType: "Single Family",
    status: "For Sale",
    features: ["Historic", "Front Porch", "Updated Kitchen", "Original Hardwood"],
    images: ["/placeholder.svg?height=400&width=600&text=Bungalow"],
    latitude: 30.2669,
    longitude: -97.7252,
    createdAt: "2023-03-05T12:00:00Z",
    updatedAt: "2023-03-05T12:00:00Z",
  },
  {
    id: "4",
    title: "Luxury Condo with Lake Views",
    description:
      "Stunning luxury condo with panoramic lake views. Features high-end finishes, floor-to-ceiling windows, and building amenities including a gym and infinity pool.",
    price: 750000,
    address: "101 Lakeshore Drive",
    city: "Austin",
    state: "TX",
    zipCode: "78730",
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 2200,
    yearBuilt: 2020,
    propertyType: "Condo",
    status: "For Sale",
    features: ["Lake View", "Balcony", "High-end Finishes", "Building Amenities"],
    images: ["/placeholder.svg?height=400&width=600&text=Luxury%20Condo"],
    latitude: 30.3428,
    longitude: -97.7927,
    createdAt: "2023-04-20T12:00:00Z",
    updatedAt: "2023-04-20T12:00:00Z",
  },
  {
    id: "5",
    title: "Modern Townhouse",
    description:
      "Contemporary townhouse in a vibrant neighborhood. Features an open floor plan, rooftop terrace, and attached garage.",
    price: 495000,
    address: "222 Pine Street",
    city: "Austin",
    state: "TX",
    zipCode: "78705",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1950,
    yearBuilt: 2017,
    propertyType: "Townhouse",
    status: "For Sale",
    features: ["Rooftop Terrace", "Garage", "Open Floor Plan", "Energy Efficient"],
    images: ["/placeholder.svg?height=400&width=600&text=Modern%20Townhouse"],
    latitude: 30.2982,
    longitude: -97.7419,
    createdAt: "2023-05-15T12:00:00Z",
    updatedAt: "2023-05-15T12:00:00Z",
  },
  {
    id: "6",
    title: "Ranch Style Home on Large Lot",
    description:
      "Spacious ranch style home on a large lot with mature trees. Features an updated kitchen, large bedrooms, and a covered patio.",
    price: 625000,
    address: "333 Maple Road",
    city: "Austin",
    state: "TX",
    zipCode: "78745",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    yearBuilt: 1985,
    propertyType: "Single Family",
    status: "For Sale",
    features: ["Large Lot", "Covered Patio", "Updated Kitchen", "Mature Trees"],
    images: ["/placeholder.svg?height=400&width=600&text=Ranch%20Home"],
    latitude: 30.217,
    longitude: -97.7954,
    createdAt: "2023-06-10T12:00:00Z",
    updatedAt: "2023-06-10T12:00:00Z",
  },
]
