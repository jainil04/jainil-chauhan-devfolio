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
}
