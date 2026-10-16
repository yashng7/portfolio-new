import fs from "fs/promises";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CACHE_TTL_MS =
  process.env.NODE_ENV === "production" ? Number.POSITIVE_INFINITY : 15_000;

export interface Project {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  published: boolean;
  image: string;
  link: string;
  github: string;
  authors: string[];
  readingTime: number;
  content: string;
}

export interface Author {
  _id: string;
  title: string;
  description?: string;
  avatar: string;
  twitter: string;
  content: string;
}

export interface Page {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  content: string;
}

interface GlobalContentStore {
  projects?: { data: Project[]; timestamp: number };
  authors?: { data: Author[]; timestamp: number };
  pages?: { data: Page[]; timestamp: number };
}

const globalForContent = globalThis as unknown as {
  __portfolioContentStore?: GlobalContentStore;
};

const contentStore: GlobalContentStore =
  globalForContent.__portfolioContentStore ??
  (globalForContent.__portfolioContentStore = {});

function isFresh(entry?: { timestamp: number }): boolean {
  if (!entry) return false;
  return Date.now() - entry.timestamp < CACHE_TTL_MS;
}

function calculateReadingTime(htmlOrText: string): number {
  const wordsPerMinute = 200;
  const plainText = htmlOrText.replace(/<[^>]*>/g, " ").trim();
  const numberOfWords = plainText ? plainText.split(/\s+/).length : 1;
  return Math.max(1, Math.ceil(numberOfWords / wordsPerMinute));
}

async function getContentFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter(
        (entry) =>
          entry.isFile() &&
          (entry.name.endsWith(".html") ||
            entry.name.endsWith(".mdx") ||
            entry.name.endsWith(".md"))
      )
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

async function loadProjectsFromDisk(): Promise<Project[]> {
  if (isFresh(contentStore.projects)) {
    return contentStore.projects!.data;
  }

  const projectsDir = path.join(CONTENT_DIR, "projects");
  const files = await getContentFiles(projectsDir);

  const projects = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(projectsDir, filename);
      const rawContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);
      const slugAsParams = filename.replace(/\.(html|mdx?)$/, "");

      return {
        slug: `/projects/${slugAsParams}`,
        slugAsParams,
        title: data.title ?? "",
        description: data.description,
        date: data.date ? String(data.date) : "",
        published: data.published ?? true,
        image: data.image ?? "",
        link: data.link ?? "",
        github: data.github ?? "",
        authors: Array.isArray(data.authors)
          ? data.authors
          : data.authors
            ? [data.authors]
            : [],
        readingTime: calculateReadingTime(content),
        content,
      } as Project;
    })
  );

  const sorted = projects.sort((a, b) =>
    b.date && a.date ? b.date.localeCompare(a.date) : 0
  );

  contentStore.projects = { data: sorted, timestamp: Date.now() };
  return sorted;
}

async function loadAuthorsFromDisk(): Promise<Author[]> {
  if (isFresh(contentStore.authors)) {
    return contentStore.authors!.data;
  }

  const authorsDir = path.join(CONTENT_DIR, "authors");
  const files = await getContentFiles(authorsDir);

  const authors = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(authorsDir, filename);
      const rawContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);
      const id = filename.replace(/\.(html|mdx?)$/, "");

      return {
        _id: id,
        title: data.title ?? id,
        description: data.description,
        avatar: data.avatar ?? "",
        twitter: data.twitter ?? "",
        content,
      } as Author;
    })
  );

  contentStore.authors = { data: authors, timestamp: Date.now() };
  return authors;
}

async function loadPagesFromDisk(): Promise<Page[]> {
  if (isFresh(contentStore.pages)) {
    return contentStore.pages!.data;
  }

  const pagesDir = path.join(CONTENT_DIR, "pages");
  const files = await getContentFiles(pagesDir);

  const pages = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(pagesDir, filename);
      const rawContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);
      const slugAsParams = filename.replace(/\.(html|mdx?)$/, "");

      return {
        slug: `/pages/${slugAsParams}`,
        slugAsParams,
        title: data.title ?? "",
        description: data.description,
        content,
      } as Page;
    })
  );

  contentStore.pages = { data: pages, timestamp: Date.now() };
  return pages;
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  return loadProjectsFromDisk();
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    const projects = await loadProjectsFromDisk();
    return projects.find((project) => project.slugAsParams === slug) ?? null;
  }
);

export const getAllAuthors = cache(async (): Promise<Author[]> => {
  return loadAuthorsFromDisk();
});

export const getAuthorByTitle = cache(
  async (title: string): Promise<Author | null> => {
    const authors = await loadAuthorsFromDisk();
    const cleanTitle = title.trim().toLowerCase();
    return (
      authors.find((author) => author.title.toLowerCase() === cleanTitle) ??
      null
    );
  }
);

export const getAllPages = cache(async (): Promise<Page[]> => {
  return loadPagesFromDisk();
});

export const getPageBySlug = cache(
  async (slug: string): Promise<Page | null> => {
    const pages = await loadPagesFromDisk();
    return pages.find((page) => page.slugAsParams === slug) ?? null;
  }
);


