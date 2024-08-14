import "@/styles/mdx.css"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shells/shell"

export default function PostLoading() {
  return (
    <Shell as="article" variant="markdown">
      <Skeleton className="absolute left-[-200px] top-14 hidden h-9 w-28 xl:inline-block" />
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-10 h-4" />
        </div>
        <Skeleton className="w-full h-6" />
        <div className="flex items-center space-x-2">
          <Skeleton className="rounded-full size-10" />
          <div className="space-y-1">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-10 h-3" />
          </div>
        </div>
      </div>
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="size-full" />
      </AspectRatio>
      <Skeleton className="w-40 h-6" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-4" />
        ))}
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-28" />
      </div>
      <Skeleton className="h-6 mx-auto mt-4 w-28" />
    </Shell>
  )
}