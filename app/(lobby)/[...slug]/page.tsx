import { notFound } from "next/navigation";
import { getAllPages, getPageBySlug } from "@/lib/content";

import "@/styles/mdx.css";

import { type Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { Mdx } from "@/components/mdx/mdx-components";
import { env } from "@/env.mjs";

export const dynamic = "force-static";

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
  ogUrl.searchParams.set("mode", "dark");

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

  const isContact = page.slugAsParams.includes("contact");

  return (
    <article className="max-w-5xl mx-auto border-x border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 min-h-[calc(100vh-7rem)]">
      {/* Blueprint Section Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-orange-600 dark:text-emerald-400 font-semibold">
            {isContact ? "04" : "03"}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">{"//"}</span>
          <span className="uppercase tracking-widest font-semibold text-neutral-800 dark:text-neutral-200">
            {page.title}
          </span>
        </div>
        <span className="text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
          DOC_REF: /{page.slugAsParams}
        </span>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 dark:bg-emerald-400" />
              <span>
                {isContact
                  ? "DIRECT_COMMUNICATION_CHANNEL"
                  : "ENGINEER_SPECIFICATION_DOSSIER"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              {page.title}
            </h1>
            {page.description ? (
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
                {page.description}
              </p>
            ) : null}
          </div>

          <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-2 bg-neutral-50 dark:bg-neutral-900/60 self-start sm:self-end">
            <span className="block text-[10px] uppercase text-neutral-400 dark:text-neutral-500">
              STATUS
            </span>
            <span className="text-orange-600 dark:text-emerald-400 font-semibold">
              ● VERIFIED · GOA, IN
            </span>
          </div>
        </header>

        <Mdx source={page.content} />
      </div>
    </article>
  );
}
