/**
 * Achievements Component
 * Displays earned achievements as minimalist badges
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Achievement } from "@/types/types";

interface AchievementsProps {
  achievements: Achievement[];
  className?: string;
}

export default function Achievements({
  achievements,
  className = "",
}: AchievementsProps) {
  const earnedAchievements = achievements.filter((a) => a.earned);
  const lockedAchievements = achievements.filter((a) => !a.earned);

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <h3
          className="text-2xl md:text-3xl mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--foreground)",
          }}
        >
          Achievements
        </h3>
        <p
          className="text-sm mb-8"
          style={{
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {earnedAchievements.length} of {achievements.length} earned
        </p>

        {/* Earned Achievements */}
        {earnedAchievements.length > 0 && (
          <div className="mb-8">
            <h4
              className="text-sm uppercase tracking-wider mb-4"
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
              }}
            >
              Earned
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="relative group"
                >
                  <div
                    className="p-5 rounded-lg transition-all duration-300"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl" role="img" aria-label={achievement.title}>
                        {achievement.icon}
                      </span>
                      <div className="flex-1">
                        <h5
                          className="text-base font-semibold mb-1"
                          style={{
                            color: "var(--foreground)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {achievement.title}
                        </h5>
                        <p
                          className="text-sm"
                          style={{
                            color: "var(--muted-foreground)",
                            lineHeight: "1.5",
                          }}
                        >
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <h4
              className="text-sm uppercase tracking-wider mb-4"
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
              }}
            >
              Not Yet Earned
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: (earnedAchievements.length + index) * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <div
                    className="p-5 rounded-lg"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      opacity: 0.5,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl grayscale" role="img" aria-label={achievement.title}>
                        {achievement.icon}
                      </span>
                      <div className="flex-1">
                        <h5
                          className="text-base font-semibold mb-1"
                          style={{
                            color: "var(--foreground)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {achievement.title}
                        </h5>
                        <p
                          className="text-sm"
                          style={{
                            color: "var(--muted-foreground)",
                            lineHeight: "1.5",
                          }}
                        >
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
