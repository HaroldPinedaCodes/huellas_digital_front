export interface Brand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Image {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface ProductImage {
  id: number;
  url: string;
  alternativeText: string | null;
}

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
}
export interface Product {
  id: number;
  name: string;
  priceClient: number;
  priceVet?: number;
  rating: number;
  features?: {
    features?: {
      analysis: {
        fat: string;
        fiber: string;
        omega_3: string;
        omega_6: string;
        protein: string;
        taurine?: string;
        vitamin_A?: string;
        vitamin_E?: string;
        probiotics?: string;
        vitamin_D3?: string;
      };
      feeding_guide: {
        puppy_small_breeds: {
          [key: string]: {
            "2_months": string;
            "9_months": string;
            "3_to_5_months": string;
            "6_to_8_months": string;
          };
        };
      };
      guarantee?: {
        type: string;
        terms: string;
        hasGarantee: boolean;
        duration_days: string;
      };
    };
  };
  image: {
    id: number;
    url: string;
    alternativeText: string | null;
  }[];
  slug: string;
  stock: number;
  brand?: {
    id: number;
    name: string;
  };
}

export interface Description {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: Description[];
  priceClient: number;
  priceVet: number;
  stock: number;
  brand: {
    id: number;
    name: string;
    slug: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  };
  images: {
    id: number;
    url: string;
    alternativeText: string | null;
  }[];
  features: string[] | null;
  weight: number;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
