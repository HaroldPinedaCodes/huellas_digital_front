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
  image: {
    id: number;
    url: string;
    alternativeText: string | null;
  }[];
  link: {
    id: number;
    url: string;
    text: string;
  };
}

export interface FeatureBlock extends BaseBlock {
  __component: "layout.feactures-section";
  title: string;
  description: string;
  feature: Feature[];
}

export type Block = HeroBlock | FeatureBlock;
