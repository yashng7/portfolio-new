import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <article className="max-w-5xl mx-auto border-x border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 min-h-[calc(100vh-7rem)]">
      {/* Top Blueprint Header Skeleton */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 font-mono text-[11px]">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
        <header className="space-y-5 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4 sm:w-2/3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3.5 w-20" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-36 rounded-md" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
        </header>

        <div className="rounded-lg overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80">
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="size-full" />
          </AspectRatio>
        </div>

        <div className="space-y-4 pt-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </article>
  );
}