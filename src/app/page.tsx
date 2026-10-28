import InternetSpace from "@/components/InternetSpace";
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/seo";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Senior Frontend Engineer",
  description:
    "Frontend engineer with 8 years building high-traffic e-commerce applications for Williams-Sonoma Inc. and Levi Strauss & Co.",
  worksFor: { "@type": "Organization", name: "Williams-Sonoma Inc." },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "Vue.js",
    "React",
    "Next.js",
    "Micro-frontend architecture",
    "Core Web Vitals",
    "Web accessibility",
  ],
  sameAs: SOCIAL_LINKS,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <InternetSpace />
    </>
  );
}
