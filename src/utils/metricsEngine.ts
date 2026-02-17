/**
 * Metrics Engine
 * Computes aggregated statistics, achievements, and park summaries
 */

import type {
  Trail,
  AggregatedStats,
  ParkSummary,
  Achievement,
} from "@/types/types";

/**
 * Calculate aggregated statistics from an array of trails
 * @param trails - Array of trail objects
 * @returns Aggregated statistics
 */
export function calculateAggregatedStats(trails: Trail[]): AggregatedStats {
  if (!trails || trails.length === 0) {
    return {
      totalMiles: 0,
      totalElevationGain: 0,
      highestElevation: 0,
      longestHike: null,
      hardestHike: null,
      averageDistance: 0,
      totalTrails: 0,
      parks: [],
    };
  }

  // Total miles and elevation
  const totalMiles = trails.reduce((sum, trail) => sum + trail.length, 0);
  const totalElevationGain = trails.reduce(
    (sum, trail) => sum + trail.elevationGain,
    0
  );

  // Highest elevation
  const highestElevation = Math.max(
    ...trails.map((trail) => trail.maxElevation || 0)
  );

  // Longest hike
  const longestHike = trails.reduce((longest, trail) => {
    return trail.length > longest.length ? trail : longest;
  });

  // Hardest hike (based on total elevation gain)
  // Most challenging hikes are determined by total vertical feet climbed
  const hardestHike = trails.reduce((hardest, trail) => {
    return trail.elevationGain > hardest.elevationGain ? trail : hardest;
  });

  // Average distance
  const averageDistance = totalMiles / trails.length;

  // Parks summary
  const parkMap = new Map<string, Trail[]>();
  trails.forEach((trail) => {
    const park = trail.park;
    if (!parkMap.has(park)) {
      parkMap.set(park, []);
    }
    parkMap.get(park)!.push(trail);
  });

  const parks: ParkSummary[] = Array.from(parkMap.entries()).map(
    ([parkName, parkTrails]) => ({
      name: parkName,
      trailCount: parkTrails.length,
      totalMiles: parkTrails.reduce((sum, trail) => sum + trail.length, 0),
      totalElevationGain: parkTrails.reduce(
        (sum, trail) => sum + trail.elevationGain,
        0
      ),
      trails: parkTrails,
    })
  );

  // Sort parks by total miles
  parks.sort((a, b) => b.totalMiles - a.totalMiles);

  return {
    totalMiles: parseFloat(totalMiles.toFixed(1)),
    totalElevationGain: Math.round(totalElevationGain),
    highestElevation: Math.round(highestElevation),
    longestHike,
    hardestHike,
    averageDistance: parseFloat(averageDistance.toFixed(1)),
    totalTrails: trails.length,
    parks,
  };
}

/**
 * Generate achievements based on trail data
 * @param trails - Array of trail objects
 * @param stats - Aggregated statistics
 * @returns Array of achievements
 */
export function generateAchievements(
  trails: Trail[],
  stats: AggregatedStats
): Achievement[] {
  const achievements: Achievement[] = [];

  // 20+ Mile Club
  achievements.push({
    id: "20-mile-club",
    title: "20+ Mile Club",
    description: "Completed a hike over 20 miles",
    earned: trails.some((trail) => trail.length >= 20),
    icon: "🏔️",
  });

  // 5,000 ft Gain Club
  achievements.push({
    id: "5000-ft-gain",
    title: "5,000 ft Gain Club",
    description: "Conquered a hike with 5,000+ feet of elevation gain",
    earned: trails.some((trail) => trail.elevationGain >= 5000),
    icon: "⛰️",
  });

  // 100+ Total Miles
  achievements.push({
    id: "100-total-miles",
    title: "Century Hiker",
    description: "Hiked over 100 total miles",
    earned: stats.totalMiles >= 100,
    icon: "🥾",
  });

  // 10+ Trails in a Year
  const currentYear = new Date().getFullYear();
  const trailsThisYear = trails.filter((trail) => {
    if (!trail.when) return false;
    return trail.when.includes(currentYear.toString());
  });
  achievements.push({
    id: "10-trails-year",
    title: "Trail Explorer",
    description: `Completed 10+ trails in ${currentYear}`,
    earned: trailsThisYear.length >= 10,
    icon: "🌲",
  });

  // Half Dome
  achievements.push({
    id: "half-dome",
    title: "Half Dome Summit",
    description: "Conquered Yosemite's iconic Half Dome",
    earned: trails.some((trail) => trail.trail.toLowerCase().includes("half dome")),
    icon: "🏔️",
  });

  // 50,000+ Total Elevation
  achievements.push({
    id: "50k-elevation",
    title: "Vertical Veteran",
    description: "Climbed over 50,000 feet total elevation",
    earned: stats.totalElevationGain >= 50000,
    icon: "📈",
  });

  // Multiple Parks
  achievements.push({
    id: "park-explorer",
    title: "Park Explorer",
    description: "Visited 5+ different parks",
    earned: stats.parks.length >= 5,
    icon: "🌄",
  });

  // Ultra Endurance (15+ miles, 4k+ gain in single hike)
  achievements.push({
    id: "ultra-endurance",
    title: "Ultra Endurance",
    description: "Completed a 15+ mile hike with 4,000+ feet gain",
    earned: trails.some(
      (trail) => trail.length >= 15 && trail.elevationGain >= 4000
    ),
    icon: "💪",
  });

  return achievements;
}

/**
 * Get trail classification based on difficulty
 * @param trail - Trail object
 * @returns Classification string
 */
export function getTrailDifficulty(trail: Trail): string {
  const gainPerMile = trail.elevationGain / trail.length;

  if (trail.length >= 15 || trail.elevationGain >= 4000) {
    return "extreme";
  } else if (gainPerMile >= 500 || trail.length >= 10) {
    return "hard";
  } else if (gainPerMile >= 300 || trail.length >= 6) {
    return "moderate";
  } else {
    return "easy";
  }
}

/**
 * Filter trails by criteria
 * @param trails - Array of trails
 * @param filters - Filter options
 * @returns Filtered trails
 */
export function filterTrails(
  trails: Trail[],
  filters: {
    parks?: string[];
    longDistance?: boolean; // 15+ miles
    highElevation?: boolean; // 4k+ ft gain
    difficulty?: string[];
  }
): Trail[] {
  let filtered = [...trails];

  if (filters.parks && filters.parks.length > 0) {
    filtered = filtered.filter((trail) => filters.parks!.includes(trail.park));
  }

  if (filters.longDistance) {
    filtered = filtered.filter((trail) => trail.length >= 15);
  }

  if (filters.highElevation) {
    filtered = filtered.filter((trail) => trail.elevationGain >= 4000);
  }

  if (filters.difficulty && filters.difficulty.length > 0) {
    filtered = filtered.filter((trail) =>
      filters.difficulty!.includes(getTrailDifficulty(trail))
    );
  }

  return filtered;
}

/**
 * Format time duration
 * @param seconds - Duration in seconds
 * @returns Formatted string (e.g., "3h 45m")
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

/**
 * Calculate pace (minutes per mile)
 * @param distance - Distance in miles
 * @param duration - Duration in seconds
 * @returns Pace in minutes per mile
 */
export function calculatePace(distance: number, duration: number): number {
  const minutes = duration / 60;
  return minutes / distance;
}
