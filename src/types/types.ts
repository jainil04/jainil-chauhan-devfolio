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
