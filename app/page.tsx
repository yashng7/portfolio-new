import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin, Mail, FileText, Terminal, Code2 } from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { getGithubActivity } from "@/lib/github";
import { GithubActivity } from "@/components/github/github-activity";
import { siteConfig } from "@/config/site";

export default async function HomePage() {
  const [allProjects, githubData] = await Promise.all([
    getAllProjects(),
    getGithubActivity(),
  ]);
  const featuredProjects = allProjects.filter((p) => p.published).slice(0, 4);

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto sm:py-20 md:py-24">
      {/* Hero Section */}
      <section className="space-y-6 pb-12 border-b border-neutral-200 dark:border-neutral-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-wide text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for opportunities</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-neutral-950 dark:text-neutral-50">
            Yashwant Gawande
          </h1>
          <p className="text-lg sm:text-xl font-medium text-neutral-600 dark:text-neutral-400">
            Software Engineer & Full Stack Developer
          </p>
        </div>

        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          I design and build high-performance web applications, scalable backend systems, and clean user interfaces.
          Focused on technical craftsmanship, simplicity, and building products that solve real problems.
        </p>

        {/* Quick Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* <Link
            href="/projects"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            View Projects
          </Link> */}
          {/* <Link
            href="/resume"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
          >
            <FileText className="w-4 h-4 mr-2" />
            Resume
          </Link> */}
          <div className="flex items-center gap-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/yashwant-gawande-01012b271/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X Profile"
              className="p-2 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <a
              href="mailto:contact@yashwantgawande.com"
              aria-label="Send Email"
              className="p-2 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="py-12 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mb-8">
          <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-2xl">
            Selected Projects
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Production web applications and developer tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className="group relative flex flex-col justify-between p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 hover:bg-neutral-100/70 dark:hover:bg-neutral-900/80 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white">
                    <Link href={project.slug} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {project.title}
                    </Link>
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span>{project.readingTime} min read</span>
                <span className="truncate max-w-[150px]">{project.link.replace(/^https?:\/\//, "")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GitHub Activity & Engineering Velocity Section */}
      <section className="py-12 border-b border-neutral-200 dark:border-neutral-800">
        <GithubActivity initialData={githubData} />
      </section>

      {/* Experience Section */}
      <section className="py-12 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-2xl mb-6">
          Experience
        </h2>

        <div className="space-y-8">
          {/* Mograsys Technologies */}
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Junior Software Developer
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Mograsys Technologies · Full-time
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                Jun 2026 – Present · 4 mos
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Marmagao, Goa, India · On-site
            </p>
          </div>

          {/* Tangentia */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Tangentia
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Full-time · 7 mos · Hybrid
                </p>
              </div>
            </div>

            {/* Nested Roles at Tangentia with Timeline */}
            <div className="relative ml-1 border-l border-neutral-200 dark:border-neutral-800 space-y-6 pt-1">
              {/* Junior Software Developer */}
              <div className="relative pl-5">
                <span className="absolute -left-1 top-1.5 h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600 ring-4 ring-white dark:ring-neutral-950" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Junior Software Developer
                  </h4>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    Aug 2025 – Jan 2026 · 6 mos
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                  Panaji, Goa, India
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                    REST APIs
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                    SQL
                  </span>
                </div>
              </div>

              {/* Technical Support Associate */}
              <div className="relative pl-5">
                <span className="absolute -left-1 top-1.5 h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600 ring-4 ring-white dark:ring-neutral-950" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Technical Support Associate
                  </h4>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    Jul 2025 – Aug 2025 · 2 mos
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  North Goa, Goa, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technical Stack */}
      <section className="py-12 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-2xl mb-6">
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              <Code2 className="w-4 h-4" />
              Frontend
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li>React.js / Next.js (App Router)</li>
              <li>TypeScript / JavaScript</li>
              <li>Tailwind CSS / UI Systems</li>
              <li>HTML5 / Web Components</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              <Terminal className="w-4 h-4" />
              Backend & Systems
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li>Node.js / Express.js</li>
              <li>Python / Django</li>
              <li>PostgreSQL / MySQL / MongoDB</li>
              <li>RESTful APIs & Auth</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-3">
              <span className="w-4 h-4 inline-flex items-center justify-center font-bold">☁</span>
              DevOps & Tools
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li>AWS (EC2, S3, Lambda)</li>
              <li>Docker / Containerization</li>
              <li>Git / GitHub / CI/CD</li>
              <li>Linux / Shell</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="space-y-1">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              Let&apos;s build something together
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Feel free to reach out for collaborations, questions, or opportunities.
            </p>
          </div>
          <a
            href="mailto:contact@yashwantgawande.com"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 shrink-0"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}