// import ExperienceAccordion, { ExperienceItem } from "@/components/ExperienceAccordion";
import ExperienceAccordion from "@/components/ExperienceAccordion";
import { ExperienceItem } from "@/types/types";

const myExperience: ExperienceItem[] = [
  {
    title: "Sr Front-End Engineer",
    company: "NTT Data Americas",
    date: "Feb 2021 – Present",
    responsibilities: [
      "Optimize a Vue 3 micro-frontend architecture, refactor Webpack configs (Module Federation, dynamic imports, tree-shaking, Brotli compression) to shrink client bundle size by 60% and reduce first paint and TTI times significantly.",
      "Profile and eliminate resource leaks using Chrome DevTools and Vue DevTools; rewrite memory-heavy components to drop peak heap usage by 50% and lower CPU time on critical interactions.",
      "Solve high-priority production bugs across MFEs, trace issues from UI to API contracts, and deploy hot-fixes that meet same-day SLAs.",
      "Deliver new customer-facing features using the Composition API, Vue Router, and shared design-system components while maintaining accessibility, responsive layout standards, and Tailwind CSS.",
      "Produce in-depth performance reports comparing Lighthouse scores, Web Vitals, and memory/CPU metrics."
    ]
  },
  {
    title: "Front-End Engineer",
    company: "Info Way Solutions LLC",
    date: "July 2018 - Jan 2021",
    responsibilities: [
      "Built micro-frontends in Vue 2 using responsive UI components and state management Vuex for web app.",
      "Integrated GraphQL queries through Apollo Client to bridge front-end components with middleware services.",
      "Developed and executed 40 + A/B and multivariate experiments in Adobe Target, writing custom JavaScript/CSS for variant rendering and capturing results in Adobe Analytics.",
      "Wrote Jest unit tests ensuring the codebase sustained an average branch-coverage rate well above 90%."
    ],
  },
  {
    title: "Server Test Operator",
    company: "Staffmark LLC",
    date: "Dec 2016 - Jun 2018",
    responsibilities: [],
  },
];

export default function Experience() {
  return (
    // <div className="min-h-screen">
    //   <div className="unbounded-headline-title flex justify-center">Professional Experience</div>
    //   <ExperienceAccordion experiences={myExperience} />
    // </div>
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-6"> {/* 👈 Important! use px not p-10 here */}
          <div className="unbounded-headline-title flex justify-center">Work Experience</div>
          <ExperienceAccordion experiences={myExperience} />
        </div>
      </div>
    </section>

  );
}
