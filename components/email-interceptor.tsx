"use client";

import { useEffect } from "react";
import {
  CONTACT_EMAIL,
  copyContactEmail,
  emailFromMailto,
} from "@/lib/email";

/**
 * Global mailto interceptor — JS-only behavior fix, zero markup/UI changes.
 *
 * Every existing `<a href="mailto:...">` keeps its classes, icons and text.
 * A plain left-click is intercepted: instead of navigating (which opens a
 * blank tab when no mail client is configured) the address is copied to the
 * clipboard and a small transient toast confirms it.
 *
 * Modifier/middle clicks are left alone so explicit "open in new tab"
 * intent still works.
 */
export function EmailInterceptor() {
  useEffect(() => {
    let toastEl: HTMLDivElement | null = null;
    let toastTimer: ReturnType<typeof setTimeout> | null = null;

    const showToast = (message: string) => {
      if (!toastEl) {
        toastEl = document.createElement("div");
        toastEl.setAttribute("role", "status");
        toastEl.setAttribute("aria-live", "polite");
        toastEl.className =
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-3.5 py-2 rounded-md border font-mono text-xs shadow-lg transition-opacity duration-200 bg-neutral-950 text-white border-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:border-neutral-200";
        toastEl.style.opacity = "0";
        toastEl.style.pointerEvents = "none";
        document.body.appendChild(toastEl);
      }
      toastEl.textContent = message;
      toastEl.style.opacity = "1";
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        if (toastEl) toastEl.style.opacity = "0";
      }, 1800);
    };

    const onClick = (e: MouseEvent) => {
      // Only hijack plain primary-button clicks.
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.(
        'a[href^="mailto:"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      e.preventDefault();

      const email = emailFromMailto(
        anchor.getAttribute("href") ?? `mailto:${CONTACT_EMAIL}`
      );
      void copyContactEmail(email).then((ok) => {
        showToast(
          ok ? `Copied ${email} to clipboard` : `Email: ${email}`
        );
      });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      if (toastTimer) clearTimeout(toastTimer);
      toastEl?.remove();
      toastEl = null;
    };
  }, []);

  return null;
}
