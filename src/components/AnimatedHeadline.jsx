import React from 'react';

export default function AnimatedHeadline() {
  return (
    <div
      className="
        flex
        flex-col         /* Mobile: stack vertically */
        md:flex-row      /* ≥768px: lay out horizontally */
        items-start      /* Mobile: align items to top */
        md:items-center  /* ≥768px: center items vertically */
        justify-center
        gap-8            /* Gap between heading and paragraph */
        px-4 py-8        /* Padding around the entire section */
        h-full
      "
    >
      {/* ───────────────────────────────────────────────────────────────── */}
      {/* LEFT COLUMN: The Animated <h1> */}
      <h1
        className="
          w-full
          md:w-1/2        /* ≥768px: occupy half width */
          max-w-[90vw]    /* Never exceed 90% of viewport on very narrow screens */
          mx-auto         /* Center horizontally on mobile if narrower than parent */
          text-5xl
          sm:text-6xl
          md:text-7xl
          leading-snug
          text-center
          md:text-left    /* ≥768px: left-align, <768px: centered */
          mr-0
          ml-0
        "
      >
        <span className="cycle-span">I</span>
        <span> am </span>
        <br />
        <span className="cycle-span">F</span>
        ront
        <span>-</span>
        <span className="cycle-span">E</span>
        nd
        <span> </span>
        <span className="cycle-span">E</span>
        ngineer
      </h1>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* RIGHT COLUMN: The Paragraph / Span Block */}
      <div
        className="
          w-full
          md:w-1/2     /* ≥768px: occupy the other half of the width */
          prose         /* If you have Tailwind Typography plugin installed */
          max-w-lg     /* Limit line-length for readability */
          text-base
          mt-8         /* Mobile: spacing between <h1> and text */
          md:mt-0      /* ≥768px: no top margin, because side-by-side */
          px-2
          text-center
          self-center
          md:text-left  /* ≥768px: left-align text */
        "
      >
        <p className='my-4'>
          My name is Jainil Chauhan – Front-End Delepoer (a.k.a. “Developer”—yes, typos happen before the code even runs).
        </p>
        <p className='my-4'>
          As a Front-End Delepoer, I turn fancy mockups into blazing-fast, responsive web experiences—while battling rogue semicolons and caffeine shortages. I wield React, Vue, and modern JavaScript like a bug-slaying superhero, obsessing over performance, accessibility, and code that doesn’t break when the user sneezes.
        </p>
        <p>
          My daily quest? Optimizing load times so your grandma’s dial-up–evolved PC doesn’t cry, crafting interactive components that feel smoother than butter, and championing pixel-perfect layouts that survive even the most aggressive browser tantrums. In short: I slay bugs, sip coffee, and build interface magic—one commit at a time.
        </p>
      </div>
    </div>
  );
}
