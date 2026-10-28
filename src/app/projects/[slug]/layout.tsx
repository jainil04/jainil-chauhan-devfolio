import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { pageMetadata, SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    ...pageMetadata({
      title: project.title,
      description: project.description,
      path: `/projects/${project.slug}`,
    }),
    // /projects sets a plain-string title, which drops the root template, so spell it out.
    title: { absolute: `${project.title} — ${SITE_NAME}` },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  const jsonLd = project && {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    programmingLanguage: project.techStack,
    ...(project.githubUrl && { codeRepository: project.githubUrl }),
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL, sameAs: SOCIAL_LINKS },
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      {children}
    </>
  );
}
