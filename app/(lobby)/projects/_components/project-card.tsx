import Image from "next/image";
import Link from "next/link";
import type { Projects } from "contentlayer/generated";
import { Github, Globe } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/placeholder-image";
import { DotPattern } from "@/components/backgrounds/dot-pattern";

interface ProjectCardProps {
  project: Projects;
  i: number;
}

export function ProjectCard({ project, i }: ProjectCardProps) {
  return (
    <article className="relative flex flex-col overflow-hidden transition-all border rounded-lg group hover:shadow-lg">
      <Link href={project.slug} className="absolute inset-0 z-10">
        <span className="sr-only">{project.title}</span>
      </Link>
      <DotPattern
        cy={1}
        cr={1}
        cx={1}
        className={cn(
          "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          {project.image ? (
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={i <= 1}
            />
          ) : (
            <PlaceholderImage asChild />
          )}
        </AspectRatio>
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-3">
        <CardHeader className="space-y-2.5 p-0">
          <CardTitle className="text-base font-bold sm:text-lg md:text-xl line-clamp-1">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>

        <div className="flex items-center justify-between mt-auto">
          <CardDescription className="text-xs sm:text-sm">
            {formatDate(project.date)}
          </CardDescription>

          <div className="z-20 flex gap-2">
            {project.github && (
              <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
                <Link
                  href={project.github}
                  target="blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  <Github className="w-4 h-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            )}
            {project.link && (
              <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
                <Link
                  href={project.link}
                  target="blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  <Globe className="w-4 h-4" />
                  <span className="sr-only">Live Site</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
