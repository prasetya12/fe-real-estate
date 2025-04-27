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
import { useForm } from 'react-hook-form';
import { Controller } from "react-hook-form"
import 'leaflet/dist/leaflet.css';
import { useCreateProperty } from "@/hooks/property/useCreateProperty"
import dynamic from "next/dynamic"

const MapPreview = dynamic(() => import("./(components)/MapPreview"), {
  ssr: false,
})


const tabs = [
  { value: "details", label: "Property Details" },
  { value: "media", label: "Media & Location" }
];

type FormValues = {
  title: string;
  description: string;
  price: string;
  propertyType: string;
  status: string;
  bedrooms: string;
  bathrooms: string;
  squareFeet: string;
  address: string;
  latitude: string;
  longitude: string;
};

export default function CreatePropertyPage() {
  const [address, setAddress] = useState("")
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([])
  const { mutate, isPending } = useCreateProperty();

  const [tab, setTab] = useState("details");
  const [image, setImage] = useState<File | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 30.2672,
    lng: -97.7431,
  });

  const handleCoordinatesChange = (newCoordinates: { lat: number; lng: number }) => {
    setCoordinates(newCoordinates);
  };


  const { control,handleSubmit, formState: {  errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      propertyType: 'single-family',
      status: 'for-sale',
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      address: '',
      latitude: '',
      longitude: '',
    }
  });

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

  const handleAddressSelect = (result: any) => {
    setAddress(result.display_name)
    setCoordinates({
      lat: result.lat,
      lng: result.lon,
    })
    setAddressSuggestions([])
  }
  

 

  const handleImageUpload = (file: File | null): void => {
    setImage(file);
  };


  const onSubmitForm = (data:FormValues) => {
    try{
      if (!image) {
        alert("Please upload an image.");
        return; 
      }

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("image", image as Blob); 
      formData.append("price", data.price);
      formData.append("address", data.address);
      formData.append("property_type", data.propertyType);
      formData.append("status", data.status);
      formData.append("bedrooms", data.bedrooms);
      formData.append("bathrooms", data.bathrooms);
      formData.append("square_feet", data.squareFeet);
      formData.append("description", data.description);

      formData.append("latitude", String(coordinates.lat));
      formData.append("longitude", String(coordinates.lng));

      mutate(formData)
    }catch (error) {
      console.error("Error submitting the form", error);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Property</h1>

        <form onSubmit={handleSubmit(onSubmitForm)} >
          <Tabs value={tab} className="w-full" onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2">
              {tabs.map((tabItem) => (
                <TabsTrigger key={tabItem.value} value={tabItem.value}>
                  {tabItem.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>Enter the basic information about the property.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: 'Property title is required' }}
                      render={({ field }) => (
                        <Input
                          id="title"
                          placeholder="e.g. Modern Downtown Apartment"
                          {...field}
                          className={`w-full ${errors.title ? 'border-red-500' : ''}`}
                        />
                      )}
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: 'Property Description is required' }}
                      render={({ field }) => (
                        <Textarea id="description" placeholder="Describe the property..." className="min-h-32" {...field} required />
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Controller
                        name="price"
                        control={control}
                        rules={{ required: 'Property price is required' }}
                        render={({ field }) => (
                          <Input id="price" type="number" placeholder="e.g. 350000" {...field} required />

                        )}
                      />
                      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <Controller
                        name="propertyType"
                        control={control}
                        rules={{ required: 'Property Typ is required' }}
                        render={({ field, fieldState }) => (
                          <>
                            <Select  {...field} onValueChange={field.onChange}>
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
                            {fieldState?.error && <p>{fieldState?.error.message}</p>}
                          </>
                        )}
                      />

                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: 'Property Typ is required' }}
                        render={({ field, fieldState }) => (
                          <>
                            <Select  {...field} onValueChange={field.onChange}>
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
                            {fieldState?.error && <p>{fieldState?.error.message}</p>}
                          </>
                        )}
                      />


                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Controller
                        name="bedrooms"
                        control={control}
                        render={({ field }) => (
                          <Input id="bedrooms" type="number" placeholder="e.g. 3" {...field} />
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Controller
                        name="bathrooms"
                        control={control}
                        render={({ field }) => (
                          <Input id="bathrooms" type="number" step="0.5" placeholder="e.g. 2.5" {...field} required />

                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="square-feet">Square Feet</Label>
                      <Controller
                        name="squareFeet"
                        control={control}
                        render={({ field }) => (
                          <Input id="square-feet" type="number" {...field} placeholder="e.g. 2000" required />
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">

                  <Button type="button" onClick={() => setTab('media')}>
                    Next: Features
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
                    <div>
                      <ImageUpload onImageUpload={handleImageUpload} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Property Location</Label>
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

                      </div>
                    </div>
                    <div className=" grid gap-4 md:grid-cols-2" >
                      <div >
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input
                          id="latitude"
                          placeholder="e.g. 30.2672"
                          value={coordinates.lat}
                          onChange={(e) =>
                            setCoordinates({ ...coordinates, lat: parseFloat(e.target.value) })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input
                          id="longitude"
                          placeholder="e.g. -97.7431"
                          value={coordinates.lng}
                          onChange={(e) =>
                            setCoordinates({ ...coordinates, lng: parseFloat(e.target.value) })
                          }
                          required
                        />
                      </div>
                    </div>
                 
                    <div>
                      <MapPreview
                        onCoordinatesChange={handleCoordinatesChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setTab('details')}
                  >
                    Previous: Property Details
                  </Button>
                  <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90">
                    {isPending ? "Creating..." : "Create Property"}
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



interface ImageUploadProps {
  onImageUpload: (file: File | null) => void; 
}
function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      onImageUpload(file);  
    }
  };

  const handleReplaceImage = () => {
    setImage(null);
    setPreviewUrl('');
    onImageUpload(null); 
  };

  return (
    <div className="space-y-2">
      <div className="grid gap-4 md:grid-cols-3">


        {previewUrl ? (<>
          <div className="flex flex-col items-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-64 w-96 object-cover rounded-md"
            />
            <div className="flex justify-center items-center">

              <button
                type="button"
                className="ml-2 text-red-600 hover:text-red-800"
                onClick={handleReplaceImage}
              >
                Delete
              </button>
            </div>
          </div>
        </>) : (<>
          <div
            className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 text-center hover:bg-muted"
            onClick={() => (document.getElementById('file-input') as HTMLInputElement)?.click()}
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
              <span className="text-sm font-medium">Upload Image</span>
              <span className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB)</span>
            </div>
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </>)}


      </div>
    </div>
  );
}


