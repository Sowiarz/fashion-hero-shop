"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import Link from "next/link";
import { ImageGallery } from "@/components/image-gallery";
import { FitByBodyWidget } from "@/components/fit-by-body-widget";
import { fitProducts } from "@/data/fitbybody";
import { WishlistButton } from "@/components/wishlist-button";
import { StarIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import type { Product, ProductColor } from "@/types";

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            filled={i < fullStars || (i === fullStars && hasHalf)}
            className="h-3.5 w-3.5 text-charcoal"
          />
        ))}
      </div>
      <span className="text-xs text-warm-gray">({count})</span>
    </div>
  );
}

export default function ProduktPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "sukienka";
  const product = fitProducts.find((p) => p.id === id) ?? fitProducts[0];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [widgetInteracted, setWidgetInteracted] = useState(false);
  const { addItem, openCart } = useCart();
  const posthog = usePostHog();

  // Build a Product-compatible mock so we can reuse the real cart
  const cartProduct = useMemo<Product>(() => ({
    id: product.id,
    name: product.name,
    slug: product.id,
    category: "women",
    productCategory: "apparel",
    collections: ["womens"],
    price: product.price,
    colors: [{ name: "Terakota", hex: "#a0522d", image: product.imageUrl }],
    sizes: product.sizes.map((_, i) => i + 1), // map S/M/L → 1/2/3 for cart
    description: product.name,
    features: [],
    materials: "",
    care: "",
    images: product.images,
    type: "bag",
    material: "mesh",
    rating: 4.7,
    reviewCount: 138,
    tags: [],
    sellerId: "s2",
  }), [product]);

  const cartColor: ProductColor = { name: "Terakota", hex: "#a0522d", image: product.imageUrl };

  function handleAddToCart() {
    const sizeIndex = product.sizes.findIndex((s) => s.size === selectedSize);
    const numericSize = sizeIndex >= 0 ? sizeIndex + 1 : 1;
    addItem(cartProduct, cartColor, numericSize);
    openCart();
    posthog?.capture("add_to_cart_clicked", { widget_interacted: widgetInteracted });
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12">
        {/* Left: Image gallery + accordion */}
        <div className="flex flex-col gap-8">
          <ImageGallery
            images={product.images}
            productName={product.name}
            colorName="Terakota"
            colorHex="#a0522d"
          />
          <div className="border-t border-border pt-2">
            {[
              { title: "Opis produktu", content: "Sukienka w stylu wrap z tkaniny silk touch. Miękki materiał delikatnie opada wzdłuż sylwetki, podkreślając talię dzięki wiązaniu. Dekolt V, długość midi. Idealna na co dzień i na wyjścia." },
              { title: "Skład i materiały", content: "95% wiskoza, 5% elastan. Podszewka: 100% poliester. Produkt certyfikowany OEKO-TEX Standard 100." },
              { title: "Pielęgnacja", content: "Pranie ręczne lub w pralce w 30°C, program delikatny. Nie wybielać. Prasować w niskiej temperaturze. Nie suszyć w suszarce." },
              { title: "Dostawa i zwroty", content: "Darmowa dostawa powyżej 299 zł. Czas dostawy 5–7 dni roboczych. Zwrot w ciągu 30 dni od daty zakupu." },
            ].map((section, i) => (
              <AccordionItem key={i} title={section.title} content={section.content} />
            ))}
          </div>
        </div>

        {/* Right: product info */}
        <div className="flex flex-col gap-5">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-warm-gray/70">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collections/womens" className="hover:text-charcoal transition-colors">
              Odzież damska
            </Link>
            <span>/</span>
            <span className="text-charcoal/60">{product.name}</span>
          </nav>

          {/* Name + wishlist */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl md:text-3xl font-normal text-charcoal mb-2">
                {product.name}
              </h1>
              <WishlistButton productId={product.id} className="mt-1 flex-shrink-0" />
            </div>
            <StarRating rating={4.7} count={138} />
            <p className="text-[12px] text-warm-gray mt-1">
              Sprzedaje{" "}
              <span className="underline cursor-pointer hover:text-charcoal transition-colors">
                Atelier Mila
              </span>
              <span className="inline-block ml-1 text-[9px] bg-charcoal/10 text-charcoal/70 px-1 py-0.5 rounded uppercase tracking-wide">
                Pro
              </span>
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-charcoal">{product.price} zł</span>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-green-700 font-medium">W magazynie — gotowe do wysyłki</span>
          </div>

          {/* Size selector */}
          {product.category !== "bag" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-nav text-charcoal">Rozmiar</p>
                <button className="text-[11px] text-warm-gray underline hover:text-charcoal transition-colors">
                  Tabela rozmiarów
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`w-12 h-12 border text-[12px] font-medium transition-colors ${
                      selectedSize === s.size
                        ? "border-charcoal bg-charcoal text-white"
                        : "border-border text-charcoal hover:border-charcoal/60"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.category !== "bag" && !selectedSize}
            className="w-full py-4 bg-charcoal text-white text-[12px] font-medium uppercase tracking-[0.6px] rounded-full hover:bg-charcoal/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {selectedSize || product.category === "bag"
              ? `DODAJ DO KOSZYKA — ${product.price} zł`
              : "WYBIERZ ROZMIAR"}
          </button>

          {/* Shipping info */}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <p className="text-xs text-warm-gray">Darmowa dostawa przy zamówieniach powyżej 299 zł</p>
            <p className="text-xs text-warm-gray">Szacowana dostawa: 11–13 cze</p>
            <p className="text-xs text-warm-gray">Łatwe zwroty</p>
          </div>

          {/* FitByBody widget */}
          <FitByBodyWidget product={product} locked={false} onInteract={() => setWidgetInteracted(true)} />
        </div>
      </div>

    </main>
  );
}

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-nav text-charcoal">{title}</span>
        <span className="text-charcoal h-4 w-4 flex items-center justify-center">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="text-sm text-warm-gray pb-4 leading-relaxed">{content}</p>
      )}
    </div>
  );
}
