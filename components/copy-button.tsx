"use client"

import * as React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function CopyButton({ value, ...props }: ButtonProps) {
  const [isCopied, setIsCopied] = React.useState(false)

  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute z-20 w-6 h-6 px-0 right-5 top-4"
      onClick={() => {
        if (typeof window === "undefined") return
        setIsCopied(true)
        void window.navigator.clipboard.writeText(value?.toString() ?? "")
        setTimeout(() => setIsCopied(false), 2000)
      }}
      {...props}
    >
      {isCopied ? (
        <Icons.check className="w-3 h-3" aria-hidden="true" />
      ) : (
        <Icons.copy className="w-3 h-3" aria-hidden="true" />
      )}
      <span className="sr-only">
        {isCopied ? "Copied" : "Copy to clipboard"}
      </span>
    </Button>
  )
}
