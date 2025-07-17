"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { type LucideIcon, Home, FolderKanban, User, Mail, File } from "lucide-react";
import { MobileNavigation } from "./mobile-nav";
import Logo from "./logo";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Resume", href: "/resume", icon: File },
];

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const pathname = usePathname();

  return (
    <nav className={cn("py-4 animate-fade-in", className)}>
      <div className="container flex items-center justify-between ">
      <Logo src="/logo.png" alt="Company Logo"/>
        <ul className="items-center justify-center hidden gap-4 md:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 text-medium ",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <MobileNavigation navigation={navigation} />
      </div>
    </nav>
  );
};

export default Navbar;
