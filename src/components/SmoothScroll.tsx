// 'use client';

// import { ReactNode, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollSmoother } from 'gsap/ScrollSmoother';

// // register once
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// interface SmoothScrollProps {
//   children: ReactNode;
// }

// export default function SmoothScroll({ children }: SmoothScrollProps) {
//   const wrapper = useRef<HTMLDivElement>(null);
//   const content = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//   if (!wrapper.current || !content.current) return;

//   const smoother = ScrollSmoother.create({
//     wrapper: wrapper.current,
//     content: content.current,
//     smooth: 0.8,         // lower → less inertia/lag (default is 1)
//     smoothTouch: 0.1,    // faster catch-up on touch devices
//     effects: true,
//     normalizeScroll: true // see next section
//   });

//   ScrollTrigger.refresh();

//   return () => {
//     smoother.kill();
//     ScrollTrigger.getAll().forEach(st => st.kill());
//   };
// }, []);


//   return (
//     <div ref={wrapper} className="fixed inset-28 overflow-hidden smooth-wrapper">
//       <div ref={content} className="relative w-full smooth-content">
//         {children}
//       </div>
//     </div>
//   );
// }

'use client';
import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// use the same import path everywhere
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current || !content.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current,
      content: content.current,
      smooth: 0.8,
      smoothTouch: 0.1,
      normalizeScroll: true,
      effects: true,
    });

    // optional—attach to window so you can inspect
    (window as Window & { _smoother?: typeof smoother })._smoother = smoother;

    ScrollTrigger.refresh();
    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={wrapper} className="smooth-wrapper fixed inset-0 overflow-y-scroll overflow-x-hidden z-0">
      <div ref={content} className="smooth-content min-h-full">
        {children}
      </div>
    </div>

  );
}
