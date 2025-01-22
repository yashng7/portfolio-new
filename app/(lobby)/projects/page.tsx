import * as React from "react"
import type { Metadata } from "next"
import { env } from "@/env.mjs"
import { allProjects } from "contentlayer/generated"

import { Separator } from "@/components/ui/separator"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

import { ProjectCard } from "./_components/project-card"
import { ProjectCardSkeleton } from "./_components/project-card-skeleton"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Projects",
  description: "Explore the latest news and updates from the community",
}

export default function ProjectsPage() {
  const projects = allProjects.filter((project) => project.published).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Shell className="md:pb-10">
      <PageHeader>
        <PageHeaderHeading className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Projects</PageHeaderHeading>
        <PageHeaderDescription className="text-sm sm:text-base md:text-lg">
          Explore the Projects That Demonstrate My Skills and Experience.
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-6" />
      <section className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <React.Suspense fallback={Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)}>
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} i={i} />
          ))}
        </React.Suspense>
      </section>
    </Shell>
  )
}

