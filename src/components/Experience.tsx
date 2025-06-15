// import ExperienceAccordion, { ExperienceItem } from "@/components/ExperienceAccordion";
import ExperienceAccordion from "@/components/ExperienceAccordion";
import { ExperienceItem } from "@/types/types";

const myExperience: ExperienceItem[] = [
  {
    title: "Sn Front-End Engineer",
    company: "NTT Data Americas",
    date: "Feb 2021 – Present",
    responsibilities: [
      "Optimized a Vue 3 micro-frontend architecture refactored Webpack configs (Module Federation, dynamic imports, tree-shaking, Brotli compression) to shrink client bundle size by 60 % and cut first paint and TTI times nearly in half.",
      "Profiled and eliminated resource leaks using Chrome DevTools and Vue DevTools, rewrote memory-heavy components to drop peak heap usage by 50 % and lower CPU time on critical interactions.",
      "Solved high-priority production bugs across MFEs, tracing issues from UI down to API contracts and deploying hot-fixes that met same-day SLAs.",
      "Delivered new customer-facing features with Composition API, Vue Router, and shared design-system components while maintaining strict accessibility and responsive-layout standards and Tailwind CSS.",
      "Produced in-depth performance reports before/after Lighthouse scores, Web Vitals, memory/CPU charts."
    ],
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
          <div className="unbounded-headline-title flex justify-center">Professional Experience</div>
          <ExperienceAccordion experiences={myExperience} />
        </div>
      </div>
    </section>

  );
}
