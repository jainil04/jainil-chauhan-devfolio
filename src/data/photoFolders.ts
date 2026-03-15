export interface PhotoFolder {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  photos?: string[];
  beforeAfterPairs?: { before: string; after: string }[];
}

export const PHOTO_FOLDERS: PhotoFolder[] = [
  {
    id: "075-please-moscow",
    title: "0.75 Please Moscow",
    description:
      "A heartfelt and playful tribute celebrating sophisticated city life and a love for gardening right in the heart of Patriarch's Ponds, Moscow.",
    coverImage: "/photos/075-please-moscow/cover.svg",
    tags: ["Restaurants", "Branding", "Moscow"],
  },
  {
    id: "sadko",
    title: "Sadko",
    description:
      "A modern gastronomic reinterpretation of the tale of Sadko, immersing you in a profound journey through a magical underwater kingdom.",
    coverImage: "/photos/sadko/cover.svg",
    tags: ["Restaurants", "Branding", "Krasnoyarsk"],
  },
  {
    id: "mountain-trails",
    title: "Mountain Trails",
    description:
      "Capturing the raw beauty and serenity of alpine landscapes — from misty ridgelines to golden-hour summits.",
    coverImage: "/photos/mountain-trails/cover.svg",
    tags: ["Landscape", "Hiking", "Nature"],
  },
  {
    id: "urban-fragments",
    title: "Urban Fragments",
    description:
      "Street-level observations of city life — architecture, textures, and the quiet poetry of everyday urban scenes.",
    coverImage: "/photos/urban-fragments/cover.svg",
    tags: ["Street", "Architecture", "City"],
  },
  {
    id: "golden-hour",
    title: "Golden Hour",
    description:
      "That fleeting window of warm, directional light that turns ordinary scenes into something cinematic.",
    coverImage: "/photos/golden-hour/cover.svg",
    tags: ["Landscape", "Light", "Sunset"],
  },
  {
    id: "analog-days",
    title: "Analog Days",
    description:
      "Shot on film — grain, imperfections, and the patience of waiting for your scans to come back.",
    coverImage: "/photos/analog-days/cover.svg",
    tags: ["Film", "35mm", "Analog"],
  },
  {
    id: "yosemite-np",
    title: "Yosemite National Park",
    description:
      "Iconic granite cliffs, thundering waterfalls, and ancient sequoias — before and after edits from a weekend in the valley.",
    coverImage: "/images/np/yosemite/after/after_1.jpg",
    tags: ["National Park", "Landscape", "Before/After"],
    beforeAfterPairs: [
      { before: "/images/np/yosemite/before/before_1.jpg", after: "/images/np/yosemite/after/after_1.jpg" },
      { before: "/images/np/yosemite/before/before_2.jpg", after: "/images/np/yosemite/after/after_2.jpg" },
      { before: "/images/np/yosemite/before/before_3.jpg", after: "/images/np/yosemite/after/after_3.jpg" },
    ],
  },
];
