"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  type LucideIcon,
  Home,
  FolderKanban,
  User,
  Mail,
  Terminal,
} from "lucide-react";
import { MobileNavigation } from "./mobile-nav";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationItem {
  index: string;
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavigationItem[] = [
  { index: "01", name: "Index", href: "/", icon: Home },
  { index: "02", name: "Systems", href: "/projects", icon: FolderKanban },
  { index: "03", name: "About", href: "/about", icon: User },
  { index: "04", name: "Contact", href: "/contact", icon: Mail },
];

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const pathname = usePathname();
  const [istTime, setIstTime] = useState<string>("--:--:-- IST");

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setIstTime(`${formatter.format(now)} IST`);
      } catch {
        setIstTime("GOA · IST");
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md",
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Monogram & Telemetry Path */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            prefetch={true}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 font-mono text-xs font-bold tracking-tighter group-hover:border-orange-500 dark:group-hover:border-emerald-400 transition-colors">
              YG
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold tracking-tight text-neutral-950 dark:text-neutral-100 group-hover:text-orange-600 dark:group-hover:text-emerald-400 transition-colors">
                ~/yashng7
              </span>
              <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 hidden sm:inline-block leading-none">
                v2.6 · monolith
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 dark:bg-emerald-500 animate-pulse" />
            <span>SYS: ONLINE</span>
          </div>
        </div>

        {/* Center: Swiss Numbered Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={cn(
                  "relative px-3 py-1.5 rounded-md font-mono text-xs transition-all flex items-center gap-1.5",
                  isActive
                    ? "text-neutral-950 dark:text-neutral-50 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100 hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60"
                )}
              >
                <span
                  className={cn(
                    "text-[10px]",
                    isActive
                      ? "text-orange-600 dark:text-emerald-400 font-semibold"
                      : "text-neutral-400 dark:text-neutral-500"
                  )}
                >
                  {item.index}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Goa Live Clock + Theme Switch + Mobile Menu */}
        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center gap-2 px-2.5 h-8 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 text-[11px] font-mono text-neutral-600 dark:text-neutral-300"
            title="Goa, India (15.4909° N, 73.8278° E)"
          >
            <Terminal className="w-3 h-3 text-orange-500 dark:text-emerald-500 shrink-0" />
            <span className="hidden lg:inline text-neutral-500 dark:text-neutral-400">
              15.49°N
            </span>
            <span className="text-neutral-800 dark:text-neutral-200 tabular-nums">
              {istTime}
            </span>
          </div>

          <ThemeToggle />

          <MobileNavigation navigation={navigation} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
