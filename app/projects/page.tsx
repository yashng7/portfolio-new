import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/env.mjs";
import { allProjects } from "contentlayer/generated";
import dayjs from "dayjs";
import { formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells/shell";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Projects",
  description: "Explore the latest projects and open-source contributions in web-space.",
};

export default function ProjectPage() {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());

  return (
    <Shell className="md:pb-10">
      <PageHeader id="projects-header" aria-labelledby="projects-header-heading">
        <PageHeaderHeading>Projects</PageHeaderHeading>
        <PageHeaderDescription>
          Explore the latest projects and open-source contributions in
          web-space.
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <section
        id="project"
        aria-labelledby="projects-heading"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {projects.map((project, i) => (
          <Link key={project.slug} href={project.slug}>
            <article className="flex flex-col space-y-2.5">
              <AspectRatio ratio={16 / 9}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
                    className="object-cover transition-all duration-500 rounded-lg hover:scale-110"
                    priority={i <= 1}
                  />
                ) : (
                  <div
                    aria-label="Placeholder"
                    role="img"
                    aria-roledescription="placeholder"
                    className="flex items-center justify-center w-full h-full rounded-lg bg-secondary"
                  >
                    <Icons.placeholder
                      className="h-9 w-9 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </AspectRatio>
              <h2 className="text-xl font-semibold line-clamp-1">
                {project.title}
              </h2>
              <p className="line-clamp-2 text-muted-foreground">
                {project.description}
              </p>
              {project.date ? (
                <p className="text-sm text-muted-foreground">
                  {formatDate(project.date)}
                </p>
              ) : null}
            </article>
          </Link>
        ))}
      </section>
    </Shell>
  );
}
