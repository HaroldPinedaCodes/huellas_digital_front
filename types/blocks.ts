// types/blocks.ts

export type ComponentMap = {
  "layout.hero-section": HeroBlock;
  "layout.feactures-section": FeatureBlock;
};

export interface Feature {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

export interface BaseBlock {
  id: number;
  __component: string;
  documentId: string;
}

export interface HeroBlock {
  id: number;
  documentId: string;
  __component: "layout.hero-section";
  heading: string;
  subHeading: string;
  image: MediaItem[];

  mobileImage: MediaItem[]; // Add mobile image array
  link: {
    id: number;
    url: string;
    text: string;
  };
  textAlignment: "left" | "center" | "right";
  verticalAlignment: "top" | "center" | "bottom";
}

interface MediaItem {
  id: number;
  url: string;
  alternativeText: string | null;
}

export interface FeatureBlock extends BaseBlock {
  __component: "layout.feactures-section";
  title: string;
  description: string;
  feature: Feature[];
}

export type Block = HeroBlock | FeatureBlock;
