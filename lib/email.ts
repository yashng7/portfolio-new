export const CONTACT_EMAIL = "contact@yashwantgawande.com";

/**
 * Copy the contact email to the clipboard.
 * Uses the async Clipboard API with a textarea/execCommand fallback
 * for non-secure contexts and older browsers.
 * Returns true when the copy succeeded.
 */
export async function copyContactEmail(
  email: string = CONTACT_EMAIL
): Promise<boolean> {
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard?.writeText
    ) {
      await navigator.clipboard.writeText(email);
      return true;
    }
  } catch {
    // fall through to legacy fallback below
  }

  try {
    if (typeof document === "undefined") return false;
    const textarea = document.createElement("textarea");
    textarea.value = email;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/** Extract the bare address from a `mailto:foo@bar?subject=..` href. */
export function emailFromMailto(href: string): string {
  const withoutScheme = href.replace(/^mailto:/i, "");
  const address = withoutScheme.split("?")[0].trim();
  return address || CONTACT_EMAIL;
}
