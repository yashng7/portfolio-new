"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Github,
  Flame,
  Trophy,
  Activity,
  Calendar,
  ArrowUpRight,
  GitCommit,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { type GithubActivityData, type ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

interface GithubActivityProps {
  initialData: GithubActivityData;
  className?: string;
}

type Timeframe = "3m" | "6m" | "1y";

export function GithubActivity({ initialData, className }: GithubActivityProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>("6m");
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Filter days based on selected timeframe
  const filteredDays = useMemo(() => {
    const totalDays = initialData.days;
    if (timeframe === "3m") return totalDays.slice(-90);
    if (timeframe === "6m") return totalDays.slice(-180);
    return totalDays;
  }, [initialData.days, timeframe]);

  // Compute metrics for the active timeframe
  const timeframeContributions = useMemo(() => {
    return filteredDays.reduce((acc, curr) => acc + curr.count, 0);
  }, [filteredDays]);

  const maxCountInView = useMemo(() => {
    return Math.max(...filteredDays.map((d) => d.count), 1);
  }, [filteredDays]);

  // Group filtered days into weeks (columns)
  const columns = useMemo(() => {
    const cols: ContributionDay[][] = [];
    let current: ContributionDay[] = [];

    filteredDays.forEach((day, index) => {
      current.push(day);
      if (current.length === 7 || index === filteredDays.length - 1) {
        cols.push(current);
        current = [];
      }
    });

    return cols;
  }, [filteredDays]);

  // Generate SVG curve points for the rolling 7-day average momentum line
  const momentumPoints = useMemo(() => {
    if (columns.length === 0) return "";
    const colTotals = columns.map((c) => c.reduce((acc, d) => acc + d.count, 0));
    const maxCol = Math.max(...colTotals, 1);
    const height = 48; // max svg height for the wave

    return colTotals
      .map((val, idx) => {
        const x = (idx / (columns.length - 1 || 1)) * 100;
        const normalized = Math.min(val / maxCol, 1);
        const y = height - normalized * (height - 12) - 6;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [columns]);

  // Compute month markers for timeline labels
  const monthMarkers = useMemo(() => {
    const markers: { label: string; index: number }[] = [];
    let lastMonth = "";

    filteredDays.forEach((day, index) => {
      const month = day.date.slice(0, 7);
      if (month !== lastMonth) {
        lastMonth = month;
        try {
          const d = new Date(day.date + "T00:00:00");
          const label = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
          markers.push({ label, index });
        } catch {}
      }
    });

    return markers;
  }, [filteredDays]);

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString + "T00:00:00");
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(d);
    } catch {
      return dateString;
    }
  };

  const formatRelativeTime = (isoString?: string) => {
    if (!isoString) return "";
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) return "today";
      if (diffDays === 1) return "yesterday";
      if (diffDays < 30) return `${diffDays}d ago`;
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths}mo ago`;
    } catch {
      return "";
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 p-6 md:p-8 space-y-8 backdrop-blur-sm",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <Link
              href={`https://github.com/${initialData.username}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              github.com/{initialData.username}
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
            Engineering Velocity
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Continuous rhythm of commits, architectural refactors, and open-source systems.
          </p>
        </div>

        {/* Timeframe Pill Filter */}
        <div className="inline-flex items-center p-1 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/60 border border-neutral-300/60 dark:border-neutral-700/60 self-start sm:self-center">
          {(["3m", "6m", "1y"] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-md transition-all",
                timeframe === tf
                  ? "bg-white text-neutral-950 dark:bg-neutral-900 dark:text-neutral-50 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
              )}
            >
              {tf === "3m" ? "Last 90 Days" : tf === "6m" ? "Last 6 Months" : "Full Year"}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Contributions */}
        <div className="p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/40 space-y-1">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span className="text-xs font-medium">Activity Total</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-950 dark:text-neutral-50">
            {timeframeContributions}
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {timeframe === "3m" ? "Last 3 months" : timeframe === "6m" ? "Last 6 months" : "Past 365 days"}
          </p>
        </div>

        {/* Current Streak */}
        <div className="p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/40 space-y-1">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span className="text-xs font-medium">Current Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-950 dark:text-neutral-50">
            {initialData.currentStreak} <span className="text-xs font-normal font-sans text-neutral-500">days</span>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Consecutive active days
          </p>
        </div>

        {/* Longest Streak */}
        <div className="p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/40 space-y-1">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span className="text-xs font-medium">Longest Run</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-950 dark:text-neutral-50">
            {initialData.longestStreak} <span className="text-xs font-normal font-sans text-neutral-500">days</span>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            All-time streak record
          </p>
        </div>

        {/* Active Days */}
        <div className="p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/40 space-y-1">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span className="text-xs font-medium">Active Rate</span>
            <Calendar className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-neutral-950 dark:text-neutral-50">
            {filteredDays.filter((d) => d.count > 0).length}{" "}
            <span className="text-xs font-normal font-sans text-neutral-500">/ {filteredDays.length}d</span>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {Math.round((filteredDays.filter((d) => d.count > 0).length / (filteredDays.length || 1)) * 100)}% active velocity
          </p>
        </div>
      </div>

      {/* The Activity Pulse Equalizer Chart */}
      <div className="space-y-6">
        {/* Momentum Horizon Waveform */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 px-0.5">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Rolling Weekly Momentum Wave
            </span>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
              7-day moving velocity
            </span>
          </div>

          <div className="relative w-full h-14 overflow-hidden rounded-lg bg-neutral-100/60 dark:bg-neutral-950/50 border border-neutral-200/60 dark:border-neutral-800/60 p-1 flex items-end">
            <svg
              viewBox="0 0 100 48"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {momentumPoints && (
                <>
                  <polygon
                    points={`0,48 ${momentumPoints} 100,48`}
                    fill="url(#waveGradient)"
                  />
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={momentumPoints}
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Pulse Bar Columns (Spectrogram Equalizer) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 px-0.5">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
              Daily Activity Spectrum
            </span>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
              {timeframeContributions} contributions in range
            </span>
          </div>

          <div className="relative rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100/40 dark:bg-neutral-950/30 p-3">
            <div className="overflow-x-auto pb-2 scrollbar-thin">
              <div className="flex items-end gap-[3px] sm:gap-1 min-w-[580px] h-28 px-1 py-1">
                {filteredDays.map((day) => {
                  const heightPercent =
                    day.count === 0
                      ? 6
                      : Math.max(16, Math.round((day.count / maxCountInView) * 100));

                  const isHovered = hoveredDay?.date === day.date;

                  return (
                    <div
                      key={day.date}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="group relative flex-1 flex flex-col justify-end h-full cursor-pointer py-1"
                    >
                      {/* The Equalizer Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={cn(
                          "w-full rounded-t-sm transition-all duration-200",
                          day.count === 0
                            ? "bg-neutral-200/80 dark:bg-neutral-800/80 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700"
                            : day.level === 1
                            ? "bg-emerald-500/50 dark:bg-emerald-400/50 group-hover:bg-emerald-500"
                            : day.level === 2
                            ? "bg-emerald-500/75 dark:bg-emerald-400/80 group-hover:bg-emerald-400"
                            : day.level === 3
                            ? "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.35)]"
                            : "bg-gradient-to-t from-emerald-500 to-cyan-400 dark:from-emerald-400 dark:to-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
                          isHovered && "ring-2 ring-emerald-400 dark:ring-emerald-300 scale-y-105 z-10"
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Month Timeline Labels */}
              {monthMarkers.length > 0 && (
                <div className="flex justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500 pt-2 px-1 border-t border-neutral-200/50 dark:border-neutral-800/50 min-w-[580px]">
                  {monthMarkers.map((marker) => (
                    <span key={marker.label + marker.index}>{marker.label}</span>
                  ))}
                </div>
              )}
            </div>

          {/* Interactive Dynamic Inspector Tooltip */}
          <div className="mt-2 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 px-1 border-t border-neutral-200/60 dark:border-neutral-800/60 pt-3">
            {hoveredDay ? (
              <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 animate-fade-in">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    hoveredDay.count > 0 ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
                  )}
                />
                <span className="font-semibold">
                  {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"}
                </span>
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>{formatDate(hoveredDay.date)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <span>Hover over the spectrum to inspect daily commits</span>
              </div>
            )}

            {/* Intensity Legend */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span>Zero</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-neutral-200 dark:bg-neutral-800 inline-block" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/50 dark:bg-emerald-400/50 inline-block" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80 dark:bg-emerald-400/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-emerald-500 to-cyan-400 inline-block" />
              <span>Max</span>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Active Repositories Stream */}
      {initialData.recentRepos && initialData.recentRepos.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
              Recently Active Repositories
            </span>
            <Link
              href={`https://github.com/${initialData.username}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              All repos
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {initialData.recentRepos.slice(0, 4).map((repo) => (
              <Link
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group p-3.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-950/20 hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60 transition-all flex flex-col justify-between gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    <GitCommit className="w-3.5 h-3.5 shrink-0 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </div>

                {repo.description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500 pt-1 border-t border-neutral-200/40 dark:border-neutral-800/40">
                  <span>Updated {formatRelativeTime(repo.pushedAt)}</span>
                  {repo.stargazerCount > 0 && (
                    <span>★ {repo.stargazerCount}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
