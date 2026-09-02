import { notFound } from "next/navigation";
import { getAllPages, getPageBySlug } from "@/lib/content";

import "@/styles/mdx.css";

import { type Metadata } from "next";

import { absoluteUrl } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Mdx } from "@/components/mdx/mdx-components";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells/shell";
import { env } from "@/env.mjs";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/") ?? "";
  const page = await getPageBySlug(slug);
  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("title", page.title);
  ogUrl.searchParams.set("type", "about");
  ogUrl.searchParams.set("mode", "light");

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl(page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const pages = await getAllPages();
  return pages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <Shell as="article" variant="markdown">
      <PageHeader>
        <PageHeaderHeading>{page.title}</PageHeaderHeading>
        {page.description ? (
          <PageHeaderDescription>{page.description}</PageHeaderDescription>
        ) : null}
      </PageHeader>
      <Separator className="my-4" />
      <Mdx source={page.content} />
    </Shell>
  );
}
