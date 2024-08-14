import { notFound } from "next/navigation"
import { allAuthors, allProjects } from "contentlayer/generated"

import { Mdx } from "@/components/mdx/mdx-components"

import "@/styles/mdx.css"

import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MdxPager } from "@/components/pagers/mdx-pager"
import { Shell } from "@/components/shells/shell"

interface ProjectPageProps {
  params: {
    slug: string[]
  }
}

async function getProjectFromParams(params: ProjectPageProps["params"]) {
  const slug = params?.slug?.join("/")
  const project = allProjects.find((project) => project.slugAsParams === slug)

  if (!project) {
    return null
  }

  return project
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params)

  if (!project) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("title", project.title)
  ogUrl.searchParams.set("type", "projects")
  ogUrl.searchParams.set("mode", "dark")

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
  }
}

export async function generateStaticParams(): Promise<
ProjectPageProps["params"][]
> {
  return allProjects.map((project) => ({
    slug: project.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: ProjectPageProps) {
  const project = await getProjectFromParams(params)

  if (!project) {
    notFound()
  }

  const authors = project.authors.map((author) =>
    allAuthors.find((a) => a.title === author?.replace(/\r$/, ""))
  )

  return (
    <Shell as="article" variant="markdown">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
        See all projects
      </Link>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {project.date && (
            <time dateTime={project.date}>{formatDate(project.date)}</time>
          )}
          {project.date ? <div>•</div> : null}
          <div>{project.readingTime}min</div>
        </div>
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {project.title}
        </h1>
        {authors?.length ? (
          <div className="flex items-center pt-4 space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={40}
                    height={40}
                    className="bg-white rounded-full"
                  />
                  <div className="flex-1 leading-tight text-left">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      {project.image && (
        <AspectRatio ratio={16 / 9}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="border rounded-md bg-muted"
            priority
          />
        </AspectRatio>
      )}
      <Mdx code={project.body.code} />
      <Separator className="my-4" />
      <MdxPager currentItem={project} allItems={allProjects} />
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost", className: "mx-auto mt-4 w-fit" })
        )}
      >
        <ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
        See all Projects
        <span className="sr-only">See all Projects</span>
      </Link>
    </Shell>
  )
}