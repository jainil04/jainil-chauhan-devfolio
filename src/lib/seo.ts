import type { Metadata } from "next";

export const SITE_URL = "https://www.jainilchauhan.com";
export const SITE_NAME = "Jainil Chauhan";
export const SOCIAL_LINKS = [
  "https://github.com/jainil04",
  "https://www.linkedin.com/in/jainil04",
];

/** Per-route metadata: title, description, canonical URL, and Open Graph / Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
