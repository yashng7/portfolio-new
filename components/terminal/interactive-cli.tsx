"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  CornerDownLeft,
  Sparkles,
  ArrowUpRight,
  Check,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, copyContactEmail } from "@/lib/email";

interface HistoryEntry {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const QUICK_COMMANDS = [
  { cmd: "whois", label: "whois" },
  { cmd: "projects", label: "projects" },
  { cmd: "stack", label: "stack" },
  { cmd: "experience", label: "experience" },
  { cmd: "hire", label: "hire" },
  { cmd: "theme", label: "theme" },
];

export function InteractiveCli({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getTimestamp = () => {
    try {
      return new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return "00:00:00";
    }
  };

  const copyEmailToClipboard = () => {
    void copyContactEmail(CONTACT_EMAIL).catch(() => {});
  };

  const buildInitialEntry = (): HistoryEntry => ({
    id: "init-0",
    command: "status --session",
    timestamp: "BOOT",
    output: (
      <div className="space-y-1.5 text-xs leading-relaxed">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-neutral-700 dark:text-neutral-300">
          <span className="text-orange-600 dark:text-emerald-400 font-semibold">
            ● TELEMETRY_SHELL_READY
          </span>
          <span className="text-neutral-400 dark:text-neutral-600">·</span>
          <span className="text-neutral-500 dark:text-neutral-400">
            v2.6.0 (Goa, IN)
          </span>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Type{" "}
          <span className="text-orange-600 dark:text-emerald-400 font-semibold">
            help
          </span>{" "}
          or select a command pill below to inspect architecture, stack, or contact channels.
        </p>
      </div>
    ),
  });

  const [entries, setEntries] = useState<HistoryEntry[]>([buildInitialEntry()]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [entries]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Support both "hire" and "/hire"
    const normalized = trimmed.replace(/^\/+/, "").toLowerCase();
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);

    if (normalized === "clear" || normalized === "cls") {
      setEntries([]);
      setInput("");
      return;
    }

    if (normalized === "reset") {
      setEntries([buildInitialEntry()]);
      setInput("");
      return;
    }

    let outputNode: React.ReactNode = null;

    if (normalized === "help" || normalized === "?") {
      outputNode = (
        <div className="space-y-1.5 text-xs">
          <div className="text-neutral-500 dark:text-neutral-400 mb-1">
            Available telemetry commands:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
            <div>
              <span className="text-orange-600 dark:text-emerald-400 font-semibold">
                whois
              </span>{" "}
              <span className="text-neutral-500 dark:text-neutral-400">— About me &amp; focus</span>
            </div>
            <div>
              <span className="text-orange-600 dark:text-emerald-400 font-semibold">
                projects
              </span>{" "}
              <span className="text-neutral-500 dark:text-neutral-400">— Shipped systems</span>
            </div>
            <div>
              <span className="text-orange-600 dark:text-emerald-400 font-semibold">
                stack
              </span>{" "}
              <span className="text-neutral-500 dark:text-neutral-400">— Tech architecture</span>
            </div>
            <div>
              <span className="text-orange-600 dark:text-emerald-400 font-semibold">
                experience
              </span>{" "}
              <span className="text-neutral-500 dark:text-neutral-400">— Career log &amp; roles</span>
            </div>
            <div>
              <span className="text-orange-600 dark:text-emerald-400 font-semibold">
                hire
              </span>{" "}
              <span className="text-neutral-500 dark:text-neutral-400">— Copy email &amp; links</span>
            </div>
            <div>
              <span className="text-orange-600 dark:text-emerald-400 font-semibold">
                theme
              </span>{" "}
              <span className="text-neutral-500 dark:text-neutral-400">— Switch theme</span>
            </div>
          </div>
        </div>
      );
    } else if (
      normalized === "whois" ||
      normalized === "whoami" ||
      normalized === "about"
    ) {
      outputNode = (
        <div className="space-y-1.5 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            <span className="text-orange-600 dark:text-emerald-400 font-semibold">
              Yashwant Gawande
            </span>{" "}
            — Junior Software Developer at{" "}
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Mograsys Technologies
            </span>{" "}
            (Goa, India).
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            Specializes in full-stack web applications, real-time telemetry dashboards (Synch, EDI Monitor Lite), accessible UI component libraries (UX4G), and AI product workflows (ResumeAI).
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-orange-600 dark:text-emerald-400">
            <span>[B.Sc. Computer Science · Univ. of Mumbai]</span>
            <span>[Open to Opportunities]</span>
          </div>
        </div>
      );
    } else if (
      normalized === "projects" ||
      normalized === "ls" ||
      normalized === "systems"
    ) {
      outputNode = (
        <div className="space-y-2 text-xs">
          <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">
            6 production systems indexed:
          </div>
          <div className="space-y-1.5">
            {[
              {
                idx: "01",
                name: "UX4G UI Library",
                tag: "WCAG 2.1 AA · Design System",
                slug: "/projects/ux4g-ui",
                live: "https://ui-ruby-seven.vercel.app/",
              },
              {
                idx: "02",
                name: "EDI Monitor Lite",
                tag: "850/810/856 Pipeline Telemetry",
                slug: "/projects/edi-monitor-lite",
                live: "https://edi-monitor-lite.vercel.app/",
              },
              {
                idx: "03",
                name: "ResumeAI",
                tag: "Next.js 15 · Gemini AI · Stripe",
                slug: "/projects/resume-ai",
                live: "https://resume-ai-smoky-eight.vercel.app",
              },
              {
                idx: "04",
                name: "Synch",
                tag: "WebSockets · Event Monitoring SaaS",
                slug: "/projects/synch",
                live: "https://synch-sass-xi.vercel.app/",
              },
            ].map((p) => (
              <div
                key={p.idx}
                className="flex items-center justify-between gap-2 px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-orange-600 dark:text-emerald-400 font-semibold">
                    {p.idx}
                  </span>
                  <Link
                    href={p.slug}
                    className="font-semibold text-neutral-900 dark:text-neutral-100 hover:underline truncate"
                  >
                    {p.name}
                  </Link>
                  <span className="hidden sm:inline text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    · {p.tag}
                  </span>
                </div>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-orange-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5 shrink-0"
                >
                  live
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (
      normalized === "stack" ||
      normalized === "skills" ||
      normalized === "tech"
    ) {
      outputNode = (
        <div className="space-y-1.5 text-[11px] leading-relaxed">
          <div>
            <span className="text-orange-600 dark:text-emerald-400 font-semibold">
              [FRONTEND]
            </span>{" "}
            <span className="text-neutral-700 dark:text-neutral-300">
              Next.js (App Router), React 18, TypeScript, Tailwind CSS, Shadcn/Radix, Redux, Framer Motion
            </span>
          </div>
          <div>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
              [BACKEND]
            </span>{" "}
            <span className="text-neutral-700 dark:text-neutral-300">
              Node.js, Express.js, Python, Django, REST &amp; GraphQL APIs, WebSockets, OAuth/JWT
            </span>
          </div>
          <div>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">
              [DATA/OPS]
            </span>{" "}
            <span className="text-neutral-700 dark:text-neutral-300">
              PostgreSQL, MySQL, MongoDB, Drizzle/Prisma, AWS (EC2/S3/Lambda), Docker, CI/CD
            </span>
          </div>
        </div>
      );
    } else if (
      normalized === "experience" ||
      normalized === "work" ||
      normalized === "career"
    ) {
      outputNode = (
        <div className="space-y-2 text-[11px]">
          <div className="border-l-2 border-orange-500 dark:border-emerald-500 pl-2.5 space-y-0.5">
            <div className="flex items-center justify-between text-neutral-900 dark:text-neutral-100 font-semibold">
              <span>Jr. Software Developer · Mograsys Technologies</span>
              <span className="text-orange-600 dark:text-emerald-400">
                Jun 2026 – Present
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Marmagao, Goa · Full-stack applications &amp; scalable backend services.
            </p>
          </div>
          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-2.5 space-y-0.5">
            <div className="flex items-center justify-between text-neutral-900 dark:text-neutral-100 font-semibold">
              <span>Jr. Software Developer · Tangentia</span>
              <span className="text-neutral-500 dark:text-neutral-400">
                Jul 2025 – Jan 2026
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Panaji, Goa · REST APIs, SQL databases, and enterprise EDI systems.
            </p>
          </div>
        </div>
      );
    } else if (
      normalized === "hire" ||
      normalized === "contact" ||
      normalized === "email" ||
      normalized === "sudo hire yashwant"
    ) {
      copyEmailToClipboard();
      outputNode = (
        <div className="space-y-2 text-xs">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-orange-500/10 dark:bg-emerald-500/10 border border-orange-500/30 dark:border-emerald-500/30 text-orange-600 dark:text-emerald-400 text-[11px]">
            <Check className="w-3.5 h-3.5" />
            <span>Copied contact@yashwantgawande.com to clipboard!</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] pt-0.5">
            <a
              href="mailto:contact@yashwantgawande.com"
              className="text-neutral-900 dark:text-white underline underline-offset-4 hover:text-orange-500 dark:hover:text-emerald-400"
            >
              mailto:contact@yashwantgawande.com
            </a>
            <a
              href="https://www.linkedin.com/in/yashwant-gawande-01012b271/"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/yashng7"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      );
    } else if (normalized === "theme" || normalized === "mode") {
      const nextMode = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(nextMode);
      outputNode = (
        <div className="text-xs text-orange-600 dark:text-emerald-400">
          ✓ Switched atmosphere to{" "}
          <span className="font-semibold uppercase">
            {nextMode === "dark" ? "Obsidian Dark" : "Architectural Daylight"}
          </span>{" "}
          mode.
        </div>
      );
    } else {
      outputNode = (
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          Command not recognized:{" "}
          <span className="text-rose-500 font-semibold">{trimmed}</span>. Type{" "}
          <button
            type="button"
            onClick={() => executeCommand("help")}
            className="text-orange-600 dark:text-emerald-400 underline underline-offset-2"
          >
            help
          </button>{" "}
          for valid telemetry commands.
        </div>
      );
    }

    setEntries((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        command: trimmed,
        output: outputNode,
        timestamp: getTimestamp(),
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm overflow-hidden font-mono",
        className
      )}
    >
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 dark:bg-emerald-500" />
          </div>
          <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 pl-1">
            yash@goa:~$
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 dark:bg-emerald-500/10 text-orange-600 dark:text-emerald-400 border border-orange-500/20 dark:border-emerald-500/20">
            REPL · INTERACTIVE
          </span>
          <button
            type="button"
            onClick={() => executeCommand("reset")}
            title="Reset terminal"
            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors p-0.5"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Scrollable Output Area */}
      <div
        ref={scrollContainerRef}
        onClick={() => inputRef.current?.focus()}
        className="p-3.5 space-y-3 h-[250px] sm:h-[265px] overflow-y-auto scrollbar-thin cursor-text bg-white dark:bg-neutral-950"
      >
        {entries.length === 0 ? (
          <div className="text-xs text-neutral-500 dark:text-neutral-400 italic">
            Buffer cleared. Type `help` or click a command below.
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-orange-600 dark:text-emerald-400 font-bold">
                    ➜
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-500">
                    ~
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">
                    {entry.command}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                  {entry.timestamp}
                </span>
              </div>
              <div className="pl-3.5 border-l border-neutral-200 dark:border-neutral-800">
                {entry.output}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Prompt Input + One-Tap Quick Command Bar */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 p-2.5 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            executeCommand(input);
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus-within:border-orange-500 dark:focus-within:border-emerald-500 transition-colors"
        >
          <span className="text-xs text-orange-600 dark:text-emerald-400 font-semibold select-none">
            yash@goa:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type command (whois, stack, hire)..."
            aria-label="Terminal command input"
            className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none min-w-0"
          />
          <button
            type="submit"
            aria-label="Run command"
            className="text-neutral-400 hover:text-orange-500 dark:hover:text-emerald-500 transition-colors p-0.5"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 mr-0.5 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-orange-500 dark:text-emerald-500" />
            RUN:
          </span>
          {QUICK_COMMANDS.map((item) => (
            <button
              key={item.cmd}
              type="button"
              onClick={() => executeCommand(item.cmd)}
              className="px-2 py-0.5 text-[11px] rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 hover:border-orange-500 hover:text-orange-600 dark:hover:border-emerald-500 dark:hover:text-emerald-400 transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
