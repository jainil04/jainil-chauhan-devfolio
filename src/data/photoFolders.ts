export interface PhotoFolder {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  photos?: string[];
}

export const PHOTO_FOLDERS: PhotoFolder[] = [
  {
    id: "yosemite-np",
    title: "Yosemite National Park",
    description:
      "Iconic granite cliffs, thundering waterfalls, and ancient sequoias — a weekend in the valley.",
    coverImage: "/images/np/yosemite/after/after_1.jpg",
    tags: ["National Park", "Landscape"],
    photos: [
      "/images/np/yosemite/after/after_1.jpg",
      "/images/np/yosemite/after/after_2.jpg",
      "/images/np/yosemite/after/after_3.jpg",
    ],
  },
];
