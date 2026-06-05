"use client";

import { useState } from "react";
import Image from "next/image";
import { Ruler, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { silhouettes, type BodyType, type FitProduct } from "@/data/fitbybody";

interface FitByBodyWidgetProps {
  product: FitProduct;
  locked?: boolean;
}

export function FitByBodyWidget({ product, locked = false }: FitByBodyWidgetProps) {
  const [selected, setSelected] = useState<BodyType>("average");

  const activeSilhouette = silhouettes.find((s) => s.id === selected)!;
  const modelImageUrl = activeSilhouette.images[product.id] ?? activeSilhouette.images["sukienka"];

  function handleSelect(id: BodyType) {
    if (locked) return;
    setSelected(id);
    console.log("[FitByBody] sylwetka zmieniona:", id, "produkt:", product.id);
  }

  const sizeLabel = product.category === "bag"
    ? ["Wysokość (cm)", "Głębokość (cm)", "Szerokość (cm)"]
    : ["Długość (cm)", "Szerokość klatki (cm)", "Biodra (cm)"];

  return (
    <div className="rounded-xl border border-border bg-white p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Ruler className="size-4 text-[oklch(0.4_0.2_300)]" />
        <span className="font-semibold text-sm text-foreground">FitByBody</span>
        <span className="ml-1 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[oklch(0.4_0.2_300)] border border-[oklch(0.4_0.2_300)] rounded-full px-2 py-0.5">
          <Sparkles className="size-2.5" />
          AI
        </span>
        <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-[oklch(0.4_0.2_300)] border border-[oklch(0.4_0.2_300)] rounded-full px-2 py-0.5">
          Pro
        </span>
      </div>

      {/* Silhouette switcher + model image */}
      <div className="grid grid-cols-3 gap-2">
        {silhouettes.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            disabled={locked}
            className={cn(
              "flex flex-col items-center rounded-xl border-2 overflow-hidden transition-all text-xs font-medium",
              selected === s.id
                ? "border-[oklch(0.4_0.2_300)] shadow-md"
                : "border-border hover:border-[oklch(0.6_0.15_300)]",
              locked && "cursor-not-allowed opacity-60"
            )}
          >
            {/* Model photo */}
            <div className="relative w-full aspect-[2/3] bg-muted overflow-hidden">
              <Image
                src={s.images[product.id] ?? s.images["sukienka"]}
                alt={`Modelka — sylwetka ${s.label}`}
                fill
                className="object-cover object-top transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 33vw, 160px"
              />
              {selected === s.id && (
                <div className="absolute inset-0 ring-2 ring-inset ring-[oklch(0.4_0.2_300)] rounded-[inherit]" />
              )}
              {/* AI badge on image */}
              <span className="absolute top-1.5 left-1.5 text-[9px] font-semibold bg-black/60 text-white px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                AI
              </span>
            </div>
            {/* Label */}
            <span
              className={cn(
                "w-full py-1.5 text-center",
                selected === s.id
                  ? "bg-[oklch(0.4_0.2_300)] text-white"
                  : "bg-white text-muted-foreground"
              )}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Big model preview for selected silhouette */}
      <div className="relative rounded-xl overflow-hidden bg-muted aspect-[3/4] w-full">
        <Image
          key={selected}
          src={modelImageUrl}
          alt={`Wizualizacja AI — ${activeSilhouette.label} — ${product.name}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {/* Overlay label */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
          <p className="text-white text-xs leading-snug">{activeSilhouette.note}</p>
          <p className="text-white/60 text-[10px] mt-0.5 flex items-center gap-1">
            <Sparkles className="size-2.5" />
            Wizualizacja AI — sylwetka {activeSilhouette.label}
          </p>
        </div>
      </div>

      {/* Size table */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
          Tabela wymiarów
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1.5 pr-3 font-medium text-muted-foreground">Rozmiar</th>
                {sizeLabel.map((label) => (
                  <th key={label} className="text-right py-1.5 px-1 font-medium text-muted-foreground whitespace-nowrap">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {product.sizes.map((row) => (
                <tr
                  key={row.size}
                  className={cn(
                    "border-b border-border/50 last:border-0",
                    row.size === product.recommendedSize && "bg-purple-50"
                  )}
                >
                  <td className="py-1.5 pr-3 font-semibold">
                    {row.size}
                    {row.size === product.recommendedSize && (
                      <span className="ml-1 text-[10px] text-[oklch(0.4_0.2_300)]">★ rekomendowany</span>
                    )}
                  </td>
                  <td className="text-right py-1.5 px-1">{row.length}</td>
                  <td className="text-right py-1.5 px-1">{row.chest}</td>
                  <td className="text-right py-1.5 px-1">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Personalisation */}
      {!locked && (
        <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2">
          <span className="text-sm">Twój zwykły rozmiar to</span>
          <span className="font-bold text-[oklch(0.4_0.2_300)]">{product.recommendedSize}</span>
          <span className="ml-auto text-[10px] font-medium text-[oklch(0.4_0.2_300)] border border-[oklch(0.4_0.2_300)] rounded-full px-2 py-0.5">
            beta
          </span>
        </div>
      )}
    </div>
  );
}
