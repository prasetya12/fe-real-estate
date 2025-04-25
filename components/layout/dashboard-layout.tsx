"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname,useRouter } from "next/navigation"
import { Building, Home, Map, PlusCircle, Settings, LogOut, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const routes = [
  
    {
      name: "Properties",
      path: "/properties",
      icon: <Building className="h-5 w-5" />,
    },
    {
      name: "Map View",
      path: "/properties/map",
      icon: <Map className="h-5 w-5" />,
    },
    {
      name: "Add Property",
      path: "/properties/create",
      icon: <PlusCircle className="h-5 w-5" />,
    },
  ]

  function handleOnClick (path:string){
    window.location.href=path

  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex items-center gap-2 py-4">
                  <Building className="h-6 w-6" />
                  <span className="text-xl font-bold">RealEstate</span>
                </div>
                <nav className="flex flex-col gap-2 py-4">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={'#'}
                      onClick={()=>handleOnClick}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                        pathname === route.path ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      {route.icon}
                      {route.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Building className="h-6 w-6" />
              <span className="text-xl font-bold hidden md:inline-block">RealEstate</span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href="#"
                onClick={() => handleOnClick(route.path)} 
                className={`flex items-center gap-2 text-sm font-medium ${
                  pathname === route.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
