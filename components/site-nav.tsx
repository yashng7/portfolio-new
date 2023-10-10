import Link from "next/link";
import React from "react";

type Props = {};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/posts" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = (props: Props) => {
  return (
    <nav className="py-8 animate-fade-in">
      <ul className="flex items-center justify-center gap-4">
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
    </nav>
  );
};

export default Navbar;
