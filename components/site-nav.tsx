import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/posts" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = (props: Props) => {
  return (
    <nav className="p-8 animate-fade-in">
      <ul className="items-center justify-center hidden gap-4 md:flex">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-medium duration-500 text-zinc-500 dark:hover:text-zinc-300 hover:text-zinc-900"
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
