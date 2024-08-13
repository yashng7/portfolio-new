"use client";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

type Props = {};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = (props: Props) => {
  const pathname = usePathname();
  return (
    <nav className="p-8 animate-fade-in">
      <ul className="items-center justify-center hidden gap-4 md:flex">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80 text-medium",
              pathname === item.href ? "text-foreground" : "text-foreground/60"
            )}
          >
            {item.name}
          </Link>
        ))}
      </ul>

      <Sheet>
        <SheetTrigger className="block p-3 md:hidden">
          <span className="text-2xl">
            <MenuIcon />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="flex flex-col gap-2 p-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-medium"
                  >
                    <SheetClose>{item.name}</SheetClose>
                  </Link>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
