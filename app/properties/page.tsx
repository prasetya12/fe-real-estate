import Link from "next/link"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, BedDouble, Bath, SquareIcon as SquareFoot, Plus } from "lucide-react"
import { getTokenFromCookie } from "@/lib/auth"
import { redirect } from 'next/navigation';
import PropertiesPageClient from "./client"

export default async function PropertiesPage() {
  const token = await getTokenFromCookie();
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
        <PropertiesPageClient/>
       
      </div>
    </DashboardLayout>
  )
}
