"use client";

import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaBootstrap,
  FaSass,
  FaAngular,
  FaJsSquare,
} from "react-icons/fa";
import {
  SiTypescript,
  SiGraphql,
  SiExpress,
  SiLess,
  SiVite,
  SiWebpack,
} from "react-icons/si";
import { motion } from "framer-motion";

const techIcons = [
  { icon: <FaReact />, name: "React" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <FaVuejs />, name: "Vue" },
  { icon: <SiGraphql />, name: "GraphQL" },
  { icon: <SiExpress />, name: "Express.js" },
  { icon: <FaJsSquare />, name: "JavaScript" },
  { icon: <FaAngular />, name: "Angular" },
  { icon: <FaBootstrap />, name: "Bootstrap" },
  { icon: <SiLess />, name: "LESS" },
  { icon: <FaSass />, name: "SASS" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <SiVite />, name: "Vite" },
  { icon: <SiWebpack />, name: "Webpack" },
];

const TechnologyStack = () => {
  return (
    <div className="w-full overflow-hidden py-10 bg-transparent masked-image">
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 90,
          ease: "linear",
        }}
      >
        {[...techIcons, ...techIcons].map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-black dark:bg-white/10 rounded-2xl text-white dark:text-white text-xl sm:text-2xl md:text-3xl hover:scale-110 transition-transform"

            title={tech.name}
          >
            {tech.icon}
            <span className="mt-2 text-xs text-white/70 dark:text-white/60">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechnologyStack;
