import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Terminal,
  Code2,
  Database,
  Cloud,
  Cpu,
  Layers,
  Globe,
} from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { getGithubActivity } from "@/lib/github";
import { GithubActivity } from "@/components/github/github-activity";
import { InteractiveCli } from "@/components/terminal/interactive-cli";
import { siteConfig } from "@/config/site";

// Metadata enrichment map for project architecture tags
const PROJECT_META: Record<
  string,
  { category: string; stack: string[]; metric: string }
> = {
  "ux4g-ui": {
    category: "DESIGN SYSTEM · ACCESSIBILITY",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "WCAG 2.1 AA"],
    metric: "Citizen-Scale UI Library",
  },
  "edi-monitor-lite": {
    category: "PIPELINE TELEMETRY · EDI",
    stack: ["Next.js", "Node.js", "shadcn/ui", "EDI 850/810/856"],
    metric: "Real-Time Queue Monitor",
  },
  "resume-ai": {
    category: "APPLIED AI · SAAS WORKFLOW",
    stack: ["Next.js 15", "Gemini AI", "PostgreSQL", "dnd-kit", "Stripe"],
    metric: "90% Auto-Fill Accuracy",
  },
  synch: {
    category: "REAL-TIME EVENT MONITORING",
    stack: ["Next.js", "WebSockets", "PostgreSQL", "TypeScript", "Clerk"],
    metric: "<2s Event Latency",
  },
  "minimal-cv": {
    category: "PRINT & WEB ARCHITECTURE",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Print CSS"],
    metric: "Zero-Bloat Template",
  },
  keylab: {
    category: "COMMERCE ENGINE · FULL-STACK",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sass"],
    metric: "End-to-End Checkout",
  },
};

function Crosshair({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-mono text-xs leading-none text-neutral-300 dark:text-neutral-700 ${className ?? ""}`}
    >
      +
    </span>
  );
}

function SectionIndexHeader({
  index,
  title,
  meta,
}: {
  index: string;
  title: string;
  meta: string;
}) {
  return (
    <div className="relative flex items-center justify-between px-4 sm:px-8 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 font-mono text-[11px]">
      <Crosshair className="absolute -left-1 -bottom-1.5" />
      <Crosshair className="absolute -right-1 -bottom-1.5" />
      <div className="flex items-center gap-2">
        <span className="text-orange-600 dark:text-emerald-400 font-semibold">
          {index}
        </span>
        <span className="text-neutral-300 dark:text-neutral-700">{"//"}</span>
        <span className="uppercase tracking-widest font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </span>
      </div>
      <span className="hidden sm:inline-block text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
        {meta}
      </span>
    </div>
  );
}

export default async function HomePage() {
  const [allProjects, githubData] = await Promise.all([
    getAllProjects(),
    getGithubActivity(),
  ]);
  const publishedProjects = allProjects.filter((p) => p.published);

  return (
    <div className="max-w-5xl mx-auto border-x border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80">
      {/* =====================================================================
          01 // IDENTITY & INTERACTIVE TERMINAL (HERO)
      ===================================================================== */}
      <section className="relative border-b border-neutral-200 dark:border-neutral-800">
        <SectionIndexHeader
          index="01"
          title="IDENTITY & TERMINAL"
          meta="LOC: 15.4909° N, 73.8278° E · GOA, IN"
        />

        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Swiss Editorial Identity (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Availability Signal Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 dark:bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 dark:bg-emerald-500" />
                </span>
                <span>Available for Full-Stack &amp; Systems Engineering</span>
              </div>

              {/* Swiss Display Typography */}
              <div className="space-y-2.5">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 leading-[1.05]">
                  Yashwant Gawande
                </h1>
                <p className="font-mono text-sm sm:text-base text-orange-600 dark:text-emerald-400 font-medium tracking-tight">
                  Software Engineer {"//"} Full-Stack &amp; Real-Time Systems
                </p>
              </div>

              {/* Concise Engineering Narrative */}
              <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                I architect high-performance web applications, real-time telemetry pipelines, and accessible UI component systems. Focused on type-safe execution, clean architectural boundaries, and software that solves complex operational problems.
              </p>

              {/* Primary CTA & Social Signal Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/projects"
                  prefetch={true}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-md bg-neutral-950 text-white hover:bg-orange-600 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-emerald-400 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Systems</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/about"
                  prefetch={true}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-medium rounded-md border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-orange-500/50 dark:hover:border-emerald-500/50 transition-colors"
                >
                  <span>About Me</span>
                </Link>

                <div className="flex items-center gap-1 pl-1 sm:border-l border-neutral-200 dark:border-neutral-800">
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2 rounded-md text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/yashwant-gawande-01012b271/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2 rounded-md text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Link>
                  <Link
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter / X Profile"
                    className="p-2 rounded-md text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-900 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </Link>
                  <a
                    href="mailto:contact@yashwantgawande.com"
                    aria-label="Send Email"
                    className="p-2 rounded-md text-neutral-500 hover:text-orange-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-emerald-400 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Micro-Telemetry Specs Strip with Right-to-Left News Ticker */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden">
                <div className="bg-white dark:bg-neutral-950 p-3 overflow-hidden">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    CURRENT_ROLE
                  </span>
                  <div className="relative overflow-hidden ticker-mask mt-0.5">
                    <div className="animate-ticker-rtl font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                      <span className="pr-6">
                        Jr. Software Developer · Full-Stack &amp; Real-Time Systems ·
                      </span>
                      <span className="pr-6" aria-hidden="true">
                        Jr. Software Developer · Full-Stack &amp; Real-Time Systems ·
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-neutral-950 p-3 overflow-hidden">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    COMPANY
                  </span>
                  <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap block mt-0.5">
                    Mograsys Technologies
                  </span>
                </div>
                <div className="bg-white dark:bg-neutral-950 p-3 overflow-hidden">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    PRIMARY_STACK
                  </span>
                  <div className="relative overflow-hidden ticker-mask mt-0.5">
                    <div className="animate-ticker-rtl-slow font-mono text-xs font-semibold text-orange-600 dark:text-emerald-400 whitespace-nowrap">
                      <span className="pr-6">
                        Next.js 14 · TypeScript · React · Node.js · PostgreSQL · Prisma · Tailwind CSS ·
                      </span>
                      <span className="pr-6" aria-hidden="true">
                        Next.js 14 · TypeScript · React · Node.js · PostgreSQL · Prisma · Tailwind CSS ·
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Mini CLI (5 Cols) */}
            <div className="lg:col-span-5 w-full">
              <InteractiveCli />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02 // SELECTED SYSTEMS (ARCHITECTURAL PROJECT MATRIX)
      ===================================================================== */}
      <section className="relative border-b border-neutral-200 dark:border-neutral-800">
        <SectionIndexHeader
          index="02"
          title="SELECTED SYSTEMS & CASE STUDIES"
          meta={`INDEXED_BUILDS: 0${publishedProjects.length}`}
        />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                Production Systems
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Real-time monitoring dashboards, accessible component libraries, and AI SaaS workflows.
              </p>
            </div>
            <Link
              href="/projects"
              prefetch={true}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-orange-600 dark:text-emerald-400 hover:underline self-start sm:self-auto"
            >
              <span>View full archive ({publishedProjects.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 1px Hairline Bento Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
            {publishedProjects.map((project, idx) => {
              const meta = PROJECT_META[project.slugAsParams] ?? {
                category: "FULL-STACK SYSTEM",
                stack: ["Next.js", "TypeScript", "Tailwind CSS"],
                metric: `${project.readingTime} min read`,
              };

              return (
                <article
                  key={project.slug}
                  className="group relative flex flex-col justify-between p-6 bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900/80 transition-colors"
                >
                  <div>
                    {/* Top Telemetry Row */}
                    <div className="flex items-center justify-between gap-2 mb-3 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-orange-600 dark:text-emerald-400 font-semibold">
                          SYS_0{idx + 1}
                        </span>
                        <span className="text-neutral-500 dark:text-neutral-400 uppercase tracking-wider truncate">
                          {meta.category}
                        </span>
                      </div>
                      <span className="text-neutral-500 dark:text-neutral-400 shrink-0">
                        {meta.metric}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 group-hover:text-orange-600 dark:group-hover:text-emerald-400 transition-colors">
                        <Link href={project.slug} prefetch={true} className="focus:outline-none">
                          {project.title}
                        </Link>
                      </h3>
                      <Link
                        href={project.slug}
                        prefetch={true}
                        aria-label={`Read ${project.title} case study`}
                        className="p-1 rounded text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {meta.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Action Links */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-neutral-200 dark:border-neutral-800 font-mono text-xs">
                    <Link
                      href={project.slug}
                      prefetch={true}
                      className="text-neutral-700 dark:text-neutral-300 hover:text-orange-600 dark:hover:text-emerald-400 font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Case Study</span>
                      <span className="text-neutral-500">({project.readingTime}m)</span>
                    </Link>

                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-orange-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Live</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          03 // ENGINEERING VELOCITY (LIVE GITHUB SPECTROGRAM)
      ===================================================================== */}
      <section className="relative border-b border-neutral-200 dark:border-neutral-800">
        <SectionIndexHeader
          index="03"
          title="ENGINEERING VELOCITY & TELEMETRY"
          meta="SOURCE: GITHUB GRAPHQL API"
        />

        <div className="p-6 sm:p-8">
          <GithubActivity initialData={githubData} />
        </div>
      </section>

      {/* =====================================================================
          04 // CAREER TIMELINE (EXPERIENCE LOG)
      ===================================================================== */}
      <section className="relative border-b border-neutral-200 dark:border-neutral-800">
        <SectionIndexHeader
          index="04"
          title="CAREER LOG & EXPERIENCE"
          meta="CHRONOLOGICAL_RECORD"
        />

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                Engineering Experience
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Building production software, enterprise REST integrations, and relational database architectures across Goa&apos;s technology ecosystem.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {/* Role 01: Mograsys Technologies */}
              <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500 dark:bg-emerald-500" />
                    <h3 className="text-base font-bold text-neutral-950 dark:text-neutral-100">
                      Junior Software Developer
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-orange-600 dark:text-emerald-400 font-medium">
                    Jun 2026 – Present · Full-time
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="text-neutral-800 dark:text-neutral-200 font-semibold">
                    Mograsys Technologies
                  </span>
                  <span>Marmagao, Goa, India · On-site</span>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Developing full-stack web applications and scalable backend services, collaborating with cross-functional engineering teams to ship high-reliability features.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Full-Stack Development", "Backend Services", "System Architecture", "Clean Code"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Role 02: Tangentia */}
              <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-neutral-950 dark:text-neutral-100">
                      Tangentia
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      Panaji &amp; North Goa, India · Full-time · Hybrid
                    </p>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    Jul 2025 – Jan 2026 · 7 mos
                  </span>
                </div>

                {/* Nested Timeline */}
                <div className="relative ml-2 border-l border-neutral-200 dark:border-neutral-800 space-y-5">
                  <div className="relative pl-5">
                    <span className="absolute -left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-400 dark:bg-neutral-500 ring-4 ring-white dark:ring-neutral-950" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        Junior Software Developer
                      </h4>
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        Aug 2025 – Jan 2026 · 6 mos
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2.5">
                      Engineered backend services, integrated RESTful APIs, and managed relational SQL databases for high data integrity and performance.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["REST APIs", "SQL Databases", "Backend Engineering", "Enterprise Workflows"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="relative pl-5">
                    <span className="absolute -left-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 ring-4 ring-white dark:ring-neutral-950" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        Technical Support Associate
                      </h4>
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        Jul 2025 – Aug 2025 · 2 mos
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Diagnosed complex platform and EDI transmission issues, managing technical support operations and rapid incident resolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          05 // SYSTEM ARCHITECTURE & TECHNICAL STACK
      ===================================================================== */}
      <section className="relative border-b border-neutral-200 dark:border-neutral-800">
        <SectionIndexHeader
          index="05"
          title="SYSTEM ARCHITECTURE & STACK"
          meta="SPECIFICATION_MATRIX"
        />

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
            {/* Spec 01: Frontend */}
            <div className="bg-white dark:bg-neutral-950 p-5 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-orange-600 dark:text-emerald-400">
                <span className="font-semibold uppercase tracking-wider">
                  01 / FRONTEND
                </span>
                <Code2 className="w-4 h-4" />
              </div>
              <ul className="space-y-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center justify-between">
                  <span>Next.js (App Router)</span>
                  <span className="text-[10px] text-neutral-500">v13–15</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>React.js &amp; Redux</span>
                  <span className="text-[10px] text-neutral-500">SPA/SSR</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>TypeScript / ES6+</span>
                  <span className="text-[10px] text-neutral-500">Strict</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Tailwind &amp; shadcn/ui</span>
                  <span className="text-[10px] text-neutral-500">WCAG AA</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Web Components</span>
                  <span className="text-[10px] text-neutral-500">DOM</span>
                </li>
              </ul>
            </div>

            {/* Spec 02: Backend */}
            <div className="bg-white dark:bg-neutral-950 p-5 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-cyan-600 dark:text-cyan-400">
                <span className="font-semibold uppercase tracking-wider">
                  02 / BACKEND
                </span>
                <Terminal className="w-4 h-4" />
              </div>
              <ul className="space-y-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center justify-between">
                  <span>Node.js &amp; Express</span>
                  <span className="text-[10px] text-neutral-500">Runtime</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Python &amp; Django</span>
                  <span className="text-[10px] text-neutral-500">Services</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>REST &amp; GraphQL APIs</span>
                  <span className="text-[10px] text-neutral-500">Typed</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>WebSockets / Events</span>
                  <span className="text-[10px] text-neutral-500">Real-Time</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>OAuth / JWT / Clerk</span>
                  <span className="text-[10px] text-neutral-500">Security</span>
                </li>
              </ul>
            </div>

            {/* Spec 03: Data & Storage */}
            <div className="bg-white dark:bg-neutral-950 p-5 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-amber-600 dark:text-amber-400">
                <span className="font-semibold uppercase tracking-wider">
                  03 / DATA LAYER
                </span>
                <Database className="w-4 h-4" />
              </div>
              <ul className="space-y-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center justify-between">
                  <span>PostgreSQL</span>
                  <span className="text-[10px] text-neutral-500">Primary</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>MySQL / Relational</span>
                  <span className="text-[10px] text-neutral-500">ACID</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>MongoDB &amp; Firestore</span>
                  <span className="text-[10px] text-neutral-500">NoSQL</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Drizzle &amp; Prisma ORM</span>
                  <span className="text-[10px] text-neutral-500">Schema</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>ELK / Kibana Logs</span>
                  <span className="text-[10px] text-neutral-500">Telemetry</span>
                </li>
              </ul>
            </div>

            {/* Spec 04: Cloud & DevOps */}
            <div className="bg-white dark:bg-neutral-950 p-5 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-purple-600 dark:text-purple-400">
                <span className="font-semibold uppercase tracking-wider">
                  04 / INFRA &amp; OPS
                </span>
                <Cloud className="w-4 h-4" />
              </div>
              <ul className="space-y-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center justify-between">
                  <span>AWS (EC2, S3, Lambda)</span>
                  <span className="text-[10px] text-neutral-500">Cloud</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Docker &amp; Containers</span>
                  <span className="text-[10px] text-neutral-500">Runtime</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Git / GitHub CI/CD</span>
                  <span className="text-[10px] text-neutral-500">Pipelines</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Jest / Playwright</span>
                  <span className="text-[10px] text-neutral-500">TDD / QA</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Linux (Ubuntu) / Bash</span>
                  <span className="text-[10px] text-neutral-500">Shell</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          06 // CONTACT & COLLABORATION (CONTACT CTA)
      ===================================================================== */}
      <section className="relative">
        <SectionIndexHeader
          index="06"
          title="CONTACT & COLLABORATION"
          meta="CHANNEL: OPEN"
        />

        <div className="p-6 sm:p-10">
          <div className="relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 dark:text-emerald-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>READY FOR NEXT DEPLOYMENT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                Let&apos;s architect something enduring.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Open to full-stack engineering roles, systems architecture collaborations, and ambitious product builds. Reach out directly or type{" "}
                <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-900 font-mono text-xs text-orange-600 dark:text-emerald-400">
                  hire
                </code>{" "}
                in the terminal above.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="mailto:contact@yashwantgawande.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-md bg-neutral-950 text-white hover:bg-orange-600 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>contact@yashwantgawande.com</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-mono uppercase tracking-wider font-medium rounded-md border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-orange-500 dark:hover:border-emerald-500 transition-colors"
              >
                <span>Contact Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}