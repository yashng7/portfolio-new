"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { MenuIcon, ChevronRight, type LucideIcon } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
}

interface MobileNavigationProps {
  navigation: NavigationItem[]
}

export function MobileNavigation({ navigation }: MobileNavigationProps) {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <MenuIcon className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[300px] p-0 flex flex-col">
        <SheetHeader className="flex items-start px-6 py-4 border-b">
          <SheetTitle className="text-xl font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow">
          <nav className="p-4">
            {navigation.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between py-3 px-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                    pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <div className="flex items-center gap-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </SheetClose>
            ))}
          </nav>
        </ScrollArea>
        <SheetFooter className="flex-row items-center justify-between p-4 border-t">
          <p className="text-sm text-muted-foreground">© 2025 yashng7 </p>
          <ThemeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

