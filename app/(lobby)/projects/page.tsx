import * as React from "react";
import type { Metadata } from "next";
import { env } from "@/env.mjs";
import { getAllProjects } from "@/lib/content";
import { ProjectCard } from "./_components/project-card";
import { ProjectCardSkeleton } from "./_components/project-card-skeleton";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Systems & Projects",
  description:
    "Production web applications, real-time telemetry dashboards, and UI systems engineered by Yashwant Gawande.",
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();
  const projects = allProjects.filter((project) => project.published);

  return (
    <div className="max-w-5xl mx-auto border-x border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 min-h-[calc(100vh-7rem)]">
      {/* Blueprint Section Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-orange-600 dark:text-emerald-400 font-semibold">
            02
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">{"//"}</span>
          <span className="uppercase tracking-widest font-semibold text-neutral-800 dark:text-neutral-200">
            SYSTEMS ARCHIVE
          </span>
        </div>
        <span className="text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          TOTAL_INDEXED: 0{projects.length}
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
            Engineered Systems &amp; Projects
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A curated index of full-stack SaaS applications, real-time EDI &amp; WebSocket monitoring tools, and accessible component libraries.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <React.Suspense
            fallback={Array.from({ length: 4 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} i={i} />
            ))}
          </React.Suspense>
        </section>
      </div>
    </div>
  );
}
