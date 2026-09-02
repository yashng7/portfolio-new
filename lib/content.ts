import fs from "fs/promises";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

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

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const numberOfWords = content.trim().split(/\s+/).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
}

async function getMdxFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")))
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const projectsDir = path.join(CONTENT_DIR, "projects");
  const files = await getMdxFiles(projectsDir);

  const projects = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(projectsDir, filename);
      const rawContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);
      const slugAsParams = filename.replace(/\.mdx?$/, "");

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
        authors: Array.isArray(data.authors) ? data.authors : data.authors ? [data.authors] : [],
        readingTime: calculateReadingTime(content),
        content,
      } as Project;
    })
  );

  return projects.sort((a, b) => (b.date && a.date ? b.date.localeCompare(a.date) : 0));
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const projects = await getAllProjects();
  return projects.find((project) => project.slugAsParams === slug) ?? null;
});

export const getAllAuthors = cache(async (): Promise<Author[]> => {
  const authorsDir = path.join(CONTENT_DIR, "authors");
  const files = await getMdxFiles(authorsDir);

  const authors = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(authorsDir, filename);
      const rawContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);
      const id = filename.replace(/\.mdx?$/, "");

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

  return authors;
});

export const getAuthorByTitle = cache(async (title: string): Promise<Author | null> => {
  const authors = await getAllAuthors();
  const cleanTitle = title.trim().toLowerCase();
  return authors.find((author) => author.title.toLowerCase() === cleanTitle) ?? null;
});

export const getAllPages = cache(async (): Promise<Page[]> => {
  const pagesDir = path.join(CONTENT_DIR, "pages");
  const files = await getMdxFiles(pagesDir);

  const pages = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(pagesDir, filename);
      const rawContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(rawContent);
      const slugAsParams = filename.replace(/\.mdx?$/, "");

      return {
        slug: `/pages/${slugAsParams}`,
        slugAsParams,
        title: data.title ?? "",
        description: data.description,
        content,
      } as Page;
    })
  );

  return pages;
});

export const getPageBySlug = cache(async (slug: string): Promise<Page | null> => {
  const pages = await getAllPages();
  return pages.find((page) => page.slugAsParams === slug) ?? null;
});
