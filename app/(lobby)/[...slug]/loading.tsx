import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoading() {
  return (
    <article className="max-w-5xl mx-auto border-x border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 min-h-[calc(100vh-7rem)]">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 font-mono text-[11px]">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
      </div>

      <div className="p-6 sm:p-10 max-w-3xl space-y-6">
        <header className="space-y-2 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-72" />
        </header>

        <div className="space-y-4">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-7 w-44 mt-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </article>
  );
}
