"use client";

import { Project } from "../types/types";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  projects: Project[];
};

const ProjectShowcase = ({ projects }: Props) => {
  return (
    <div className="space-y-10 py-10">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-br from-[#0f1117]/30 to-[#1a1f2e]/30 rounded-3xl p-10 shadow-xl max-w-6xl mx-auto transition-all duration-300"
        >
          {/* Left side - text */}
          <div className="flex-1 space-y-4 text-left">
            <h2 className="text-2xl lg:text-3xl font-semibold text-white">
              {project.title}
            </h2>
            <p className="text-gray-300">{project.description}</p>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-white border border-white/30 px-4 py-2 rounded-lg transition"
            >
              <FaGithub />See it on GitHub
            </a>
          </div>

          {/* Right side - image + metrics */}
          <div className="flex-1 mt-10 lg:mt-0 lg:ml-10 w-full h-[180px] overflow-hidden">
            <div className="h-full w-full rounded-xl overflow-hidden border border-white/10">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className="object-cover w-full h-full"
                  width={800}
                  height={450}
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-white/10 dark:bg-white/5 skeleton-shimmer" />
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              {project.engagement && (
                <div>
                  <div className="text-xs text-gray-400">Engagement</div>
                  <div className="text-lg font-medium text-white">
                    {project.engagement}
                  </div>
                </div>
              )}
              {project.satisfaction && (
                <div>
                  <div className="text-xs text-gray-400">User Satisfaction</div>
                  <div className="text-lg font-medium text-white">
                    {project.satisfaction}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectShowcase;
