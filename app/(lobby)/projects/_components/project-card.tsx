import Image from "next/image"
import Link from "next/link"
import { type Projects } from "contentlayer/generated"

import { formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceholderImage } from "@/components/placeholder-image"

interface ProjectCardProps {
  project: Projects
  i: number
}

export function ProjectCard({ project, i }: ProjectCardProps) {
  return (
    <Link key={project.slug} href={project.slug} className="p-2 border rounded-md shadow-md">
      <span className="sr-only">{project.title}</span>
      <article className="space-y-4">
        <AspectRatio ratio={16 / 9}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
              className="object-cover rounded-lg"
              priority={i <= 1}
            />
          ) : (
            <PlaceholderImage asChild />
          )}
        </AspectRatio>
        <div className="space-y-2">
          <CardHeader className="space-y-2.5 p-0">
            <CardTitle className="line-clamp-1">{project.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardDescription>{formatDate(project.date)}</CardDescription>
        </div>
      </article>
    </Link>
  )
}