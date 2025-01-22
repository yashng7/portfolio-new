"use client";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
          Built by{" "}
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            yashng
          </Link>
          . The source code is available on{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
