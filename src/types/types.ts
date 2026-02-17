export type Project = {
  title: string;
  description: string;
  imageUrl: string;
  engagement?: string;
  satisfaction?: string;
  githubUrl: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
};

export interface SpaceObject {
  id: string;
  label: string;
  subtitle: string;
  description: string[];
  tags: string[];
  /** Position in % for desktop */
  x: number;
  y: number;
  /** Size in px */
  width: number;
  /** Idle animation delay in seconds */
  floatDelay: number;
  /** Rotation hint in degrees */
  rotation: number;
  accent: string;
  /** Page path to navigate to */
  href: string;
}

export interface Trail {
  park: string;
  trail: string;
  length: number; // in miles
  elevationGain: number; // in feet
  estimatedTime: string; // formatted as "H:MM"
  when?: string; // completion date
  maxElevation?: number; // in feet
  duration?: number; // in seconds
  coordinates?: Array<{ lat: number; lng: number }>;
  elevationProfile?: Array<{ distance: number; elevation: number }>;
  gpxFile?: string; // filename of GPX file
  personalNote?: string; // custom note
}

export interface ParkSummary {
  name: string;
  trailCount: number;
  totalMiles: number;
  totalElevationGain: number;
  trails: Trail[];
}

export interface AggregatedStats {
  totalMiles: number;
  totalElevationGain: number;
  highestElevation: number;
  longestHike: Trail | null;
  hardestHike: Trail | null;
  averageDistance: number;
  totalTrails: number;
  parks: ParkSummary[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  icon: string;
}

export interface SnowboardingData {
  daysOnMountain: number;
  resortsVisited: string[];
  estimatedVerticalFeet: number;
  seasonProgression: Array<{ date: string; resort: string; runs: number }>;
}
