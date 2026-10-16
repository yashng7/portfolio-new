import * as React from "react"

import { cn } from "@/lib/utils"

interface MdxProps {
  source?: string
  code?: string
  className?: string
}

/**
 * Zero-Library Native HTML Renderer
 * Renders pre-authored semantic .html content directly in the browser with zero AST/MDX runtime overhead.
 */
export function Mdx({ source, code, className }: MdxProps) {
  const html = source ?? code ?? ""

  return (
    <div
      className={cn(
        "prose mdx prose-neutral dark:prose-invert max-w-none",
        "prose-headings:scroll-m-20 prose-headings:tracking-tight prose-headings:font-semibold prose-headings:text-neutral-950 dark:prose-headings:text-neutral-50",
        "prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:font-bold",
        "prose-h2:mt-10 prose-h2:border-b prose-h2:border-neutral-200/80 dark:prose-h2:border-neutral-800/80 prose-h2:pb-2 prose-h2:text-2xl first:prose-h2:mt-0",
        "prose-h3:mt-8 prose-h3:text-xl",
        "prose-p:text-base prose-p:leading-7 prose-p:text-neutral-700 dark:prose-p:text-neutral-300",
        "prose-li:text-base prose-li:leading-7 prose-li:text-neutral-700 dark:prose-li:text-neutral-300",
        "prose-strong:text-neutral-950 dark:prose-strong:text-neutral-100 prose-strong:font-semibold",
        "prose-a:font-medium prose-a:text-orange-600 dark:prose-a:text-emerald-400 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-orange-500/40 dark:prose-a:decoration-emerald-500/40 hover:prose-a:decoration-orange-600 dark:hover:prose-a:decoration-emerald-400",
        "prose-hr:my-6 md:prose-hr:my-8 prose-hr:border-neutral-200/80 dark:prose-hr:border-neutral-800/80",
        "prose-blockquote:border-l-2 prose-blockquote:border-orange-500 dark:prose-blockquote:border-emerald-500 prose-blockquote:pl-6 prose-blockquote:italic",
        "prose-code:rounded prose-code:bg-neutral-100 dark:prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}


