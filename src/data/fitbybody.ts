export type BodyType = "petite" | "average" | "plus";

export interface SilhouetteData {
  id: BodyType;
  label: string;
  emoji: string;
  description: string;
  note: string;
  imageColor: string; // tailwind bg color for placeholder
  /** AI-wygenerowane zdjęcia modelki w sukience (per produkt) */
  images: Record<string, string>;
}

export interface SizeRow {
  size: string;
  length: number; // cm
  chest: number;  // cm
  hips: number;   // cm
}

export interface FitProduct {
  id: string;
  name: string;
  category: "dress" | "bag";
  price: number;
  imageUrl: string;
  sizes: SizeRow[];
  recommendedSize: string;
  images: string[];
}

export const silhouettes: SilhouetteData[] = [
  {
    id: "petite",
    label: "Drobna",
    emoji: "🌸",
    description: "Smukła sylwetka, wąskie ramiona i biodra",
    note: "Sukienka leży swobodnie w talii — rozważ rozmiar S lub XS. Długość może wymagać skrócenia.",
    imageColor: "bg-rose-100",
    images: {
      sukienka: "/fit-by-body/model-petite.jpg",
      torba:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=900&fit=crop&q=80",
    },
  },
  {
    id: "average",
    label: "Średnia",
    emoji: "✨",
    description: "Proporcjonalna sylwetka, średnie ramiona i biodra",
    note: "Rozmiar M to Twój ideał — sukienka podkreśli talię i biodra zgodnie z projektem.",
    imageColor: "bg-purple-100",
    images: {
      sukienka: "/fit-by-body/model-average.jpg",
      torba:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=900&fit=crop&q=80",
    },
  },
  {
    id: "plus",
    label: "Pełniejsza",
    emoji: "🌟",
    description: "Zaokrąglone kształty, pełniejszy biust i biodra",
    note: "Wybierz rozmiar L lub XL. Materiał pięknie układa się na pełniejszych kształtach.",
    imageColor: "bg-amber-100",
    images: {
      sukienka: "/fit-by-body/model-plus.jpg",
      torba:
        "https://images.unsplash.com/photo-1558171813-0d31e5f51f33?w=600&h=900&fit=crop&q=80",
    },
  },
];

export const fitProducts: FitProduct[] = [
  {
    id: "sukienka",
    name: "Sukienka Wrap Silk Touch",
    category: "dress",
    price: 499,
    imageUrl: "/fit-by-body/product-dress.jpg",
    images: [
      "/fit-by-body/product-dress.jpg",
      "https://images.unsplash.com/photo-1585914924626-15adac1e6402?w=800&h=1100&fit=crop&q=85",
    ],
    recommendedSize: "M",
    sizes: [
      { size: "S",  length: 105, chest: 86,  hips: 90  },
      { size: "M",  length: 107, chest: 92,  hips: 96  },
      { size: "L",  length: 109, chest: 100, hips: 106 },
    ],
  },
];

export const sellerMetrics = {
  name: "Atelier Mila",
  plan: "Standard",
  returnRate: 18,
  wrongSizeReturnPct: 67,
  conversionRate: 2.3,
};
