import { notFound } from "next/navigation";
import { getAllAuthors, getAllProjects, getProjectBySlug } from "@/lib/content";
import { Mdx } from "@/components/mdx/mdx-components";
import "@/styles/mdx.css";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/env.mjs";
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react";

import { absoluteUrl, formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MdxPager } from "@/components/pagers/mdx-pager";

export const dynamic = "force-static";

interface ProjectPageProps {
  params: {
    slug: string[];
  };
}

async function getProjectFromParams(params: ProjectPageProps["params"]) {
  const slug = params?.slug?.join("/") ?? "";
  const project = await getProjectBySlug(slug);

  if (!project) {
    return null;
  }

  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("title", project.title);
  ogUrl.searchParams.set("type", "projects");
  ogUrl.searchParams.set("mode", "dark");

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: project.title,
    description: project.description,
    authors: project.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: absoluteUrl(project.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  ProjectPageProps["params"][]
> {
  const allProjects = await getAllProjects();
  return allProjects.map((project) => ({
    slug: project.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: ProjectPageProps) {
  const [project, allProjects, allAuthors] = await Promise.all([
    getProjectFromParams(params),
    getAllProjects(),
    getAllAuthors(),
  ]);

  if (!project) {
    notFound();
  }

  const authors = project.authors.map((author) =>
    allAuthors.find(
      (a) => a.title.toLowerCase() === author?.trim().toLowerCase()
    )
  );

  return (
    <article className="max-w-5xl mx-auto border-x border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 min-h-[calc(100vh-7rem)]">
      {/* Top Blueprint Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 font-mono text-[11px]">
        <Link
          href="/projects"
          prefetch={true}
          className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SYSTEMS ARCHIVE</span>
        </Link>
        <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
          {project.date && (
            <time dateTime={project.date}>{formatDate(project.date)}</time>
          )}
          <span>·</span>
          <span>{project.readingTime} MIN SPEC</span>
        </div>
      </div>

      <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
        {/* Title & Action Bar */}
        <header className="space-y-5 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {authors?.length ? (
              <div className="flex items-center gap-3">
                {authors.map((author) =>
                  author ? (
                    <Link
                      key={author._id}
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 text-xs font-mono"
                    >
                      <Image
                        src={author.avatar}
                        alt={author.title}
                        width={32}
                        height={32}
                        className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white"
                      />
                      <div className="leading-tight">
                        <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {author.title}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          @{author.twitter}
                        </p>
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            ) : <div />}

            <div className="flex items-center gap-3">
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-md bg-neutral-950 text-white hover:bg-orange-600 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-emerald-400 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Deployment</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider font-medium rounded-md border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-orange-500/50 dark:hover:border-emerald-500/50 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Preview Image */}
        {project.image && (
          <div className="rounded-lg overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </AspectRatio>
          </div>
        )}

        {/* MDX Case Study Body */}
        <div className="prose prose-neutral dark:prose-invert max-w-none pt-2">
          <Mdx source={project.content} />
        </div>

        {/* Footer Pager */}
        <div className="pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80">
          <MdxPager currentItem={project} allItems={allProjects} />
        </div>
      </div>
    </article>
  );
}
