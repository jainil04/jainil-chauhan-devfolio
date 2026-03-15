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
