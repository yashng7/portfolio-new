import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { ArrowUpRight, Github, Globe } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlaceholderImage } from "@/components/placeholder-image";

interface ProjectCardProps {
  project: Project;
  i: number;
}

export function ProjectCard({ project, i }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-orange-500/50 dark:hover:border-emerald-500/50 transition-all">
      {/* Top Telemetry Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 font-mono text-[11px]">
        <span className="text-orange-600 dark:text-emerald-400 font-semibold">
          SYS_0{i + 1}
        </span>
        <span className="text-neutral-400 dark:text-neutral-500">
          {project.readingTime}m read · {formatDate(project.date)}
        </span>
      </div>

      {/* Preview Image */}
      <div className="relative border-b border-neutral-200/70 dark:border-neutral-800/70 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Link href={project.slug} prefetch={true} className="block focus:outline-none">
          <AspectRatio ratio={16 / 9}>
            {project.image ? (
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                priority={i <= 1}
              />
            ) : (
              <PlaceholderImage asChild />
            )}
          </AspectRatio>
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold tracking-tight text-neutral-950 dark:text-neutral-100 group-hover:text-orange-600 dark:group-hover:text-emerald-400 transition-colors">
              <Link href={project.slug} prefetch={true}>{project.title}</Link>
            </h3>
            <Link
              href={project.slug}
              prefetch={true}
              aria-label={`View ${project.title}`}
              className="text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 font-mono text-xs">
          <Link
            href={project.slug}
            prefetch={true}
            className="text-neutral-700 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-emerald-400 font-medium transition-colors"
          >
            Read Specification →
          </Link>

          <div className="flex items-center gap-3">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </Link>
            )}
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
