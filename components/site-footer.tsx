"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 dark:bg-emerald-500" />
            <span className="text-neutral-900 dark:text-neutral-100 font-semibold">
              YASHWANT GAWANDE
            </span>
          </div>
          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">
            {"//"}
          </span>
          <span>ENGINEERED IN GOA, INDIA · 15.4909° N, 73.8278° E</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-950 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/yashwant-gawande-01012b271/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-950 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-950 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <Twitter className="w-3.5 h-3.5" />
            <span>X</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          <a
            href="mailto:contact@yashwantgawande.com"
            className="hover:text-orange-600 dark:hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
