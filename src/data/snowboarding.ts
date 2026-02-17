/**
 * Snowboarding Data
 * Manual data for snowboarding performance section
 */

import type { SnowboardingData } from "@/types/types";

export const SNOWBOARDING_DATA: SnowboardingData = {
  daysOnMountain: 15,
  resortsVisited: ["Heavenly", "Northstar", "Kirkwood"],
  estimatedVerticalFeet: 75000,
  seasonProgression: [
    { date: "Dec 15, 2025", resort: "Heavenly", runs: 12 },
    { date: "Dec 22, 2025", resort: "Northstar", runs: 15 },
    { date: "Jan 5, 2026", resort: "Kirkwood", runs: 10 },
    { date: "Jan 12, 2026", resort: "Heavenly", runs: 14 },
    { date: "Jan 19, 2026", resort: "Northstar", runs: 16 },
  ],
};
