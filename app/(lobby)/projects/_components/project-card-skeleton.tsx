import { CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PlaceholderImage } from "@/components/placeholder-image"

export function ProjectCardSkeleton() {
  return (
    <article className="space-y-4">
      <PlaceholderImage />
      <div className="space-y-2">
        <CardHeader className="space-y-2.5 p-0">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-3" />
        </CardHeader>
        <Skeleton className="w-1/4 h-3" />
      </div>
    </article>
  )
}