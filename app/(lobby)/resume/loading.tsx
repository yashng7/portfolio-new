import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shell } from "@/components/shells/shell"

function ResumePageSkeleton() {
  return (
    <Shell className="md:pb-10">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container max-w-4xl px-4 py-8 mx-auto">
          {/* Header */}
          <div className="mb-8 text-center space-y-4">
            <Skeleton className="w-1/3 h-10 mx-auto" />
            <Skeleton className="w-1/4 h-5 mx-auto" />
            <Skeleton className="w-48 h-10 mx-auto rounded-md" />
          </div>

          {/* Resume Content */}
          <div className="grid gap-6">
            {/* Personal Info Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="w-48 h-6" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 rounded" />
                      <Skeleton className="w-40 h-4" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <Skeleton className="w-24 h-8 rounded-md" />
                  <Skeleton className="w-24 h-8 rounded-md" />
                </div>
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card>
              <CardHeader>
                <Skeleton className="w-28 h-6" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card>
              <CardHeader>
                <Skeleton className="w-40 h-6" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="w-24 h-4" />
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 4 + i }).map((_, j) => (
                        <Skeleton key={j} className="w-20 h-6 rounded-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience Card */}
            <Card>
              <CardHeader>
                <Skeleton className="w-32 h-6" />
              </CardHeader>
              <CardContent className="space-y-6">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Skeleton className="w-56 h-5" />
                        <Skeleton className="w-40 h-4" />
                      </div>
                      <Skeleton className="w-24 h-4" />
                    </div>
                    <div className="ml-4 space-y-1.5">
                      <Skeleton className="w-full h-3" />
                      <Skeleton className="w-full h-3" />
                      <Skeleton className="w-3/4 h-3" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projects Card */}
            <Card>
              <CardHeader>
                <Skeleton className="w-28 h-6" />
              </CardHeader>
              <CardContent className="space-y-6">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Skeleton className="w-40 h-5" />
                        <Skeleton className="w-60 h-4" />
                      </div>
                      <Skeleton className="w-32 h-4" />
                    </div>
                    <div className="ml-4 space-y-1.5">
                      <Skeleton className="w-full h-3" />
                      <Skeleton className="w-full h-3" />
                      <Skeleton className="w-full h-3" />
                      <Skeleton className="w-2/3 h-3" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education Card */}
            <Card>
              <CardHeader>
                <Skeleton className="w-32 h-6" />
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Skeleton className="w-56 h-5" />
                    <Skeleton className="w-40 h-4" />
                  </div>
                  <Skeleton className="w-16 h-4" />
                </div>
              </CardContent>
            </Card>

            {/* Certifications Card */}
            <Card>
              <CardHeader>
                <Skeleton className="w-36 h-6" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Skeleton className="w-64 h-5" />
                        <Skeleton className="w-28 h-4" />
                      </div>
                      <Skeleton className="w-16 h-4" />
                    </div>
                    <Skeleton className="w-full h-3 ml-4" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Download CTA Card */}
            <Card>
              <CardContent className="py-8 text-center space-y-4">
                <Skeleton className="w-52 h-6 mx-auto" />
                <Skeleton className="w-80 h-4 mx-auto" />
                <Skeleton className="w-52 h-10 mx-auto rounded-md" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  )
}

export default function ResumeLoading() {
  return <ResumePageSkeleton />
}
