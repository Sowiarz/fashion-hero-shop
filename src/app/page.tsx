import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Logo / Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">FashionHero</h1>
        <p className="text-muted-foreground text-sm">Prototyp walidacyjny · FitByBody WTP</p>
      </div>

      {/* Role cards */}
      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-xl">
        {/* Buyer */}
        <Link
          href="/produkt/sukienka"
          className="group flex flex-col gap-4 rounded-2xl border-2 border-border hover:border-[oklch(0.4_0.2_300)] bg-white p-8 transition-all hover:shadow-lg"
        >
          <div className="w-14 h-14 rounded-2xl bg-[oklch(0.95_0.05_300)] flex items-center justify-center">
            <ShoppingBag className="size-7 text-[oklch(0.4_0.2_300)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold mb-1 group-hover:text-[oklch(0.4_0.2_300)] transition-colors">
              Jestem kupującym
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Przeglądaj produkty i wypróbuj widget dopasowania do sylwetki.
            </p>
          </div>
          <span className="mt-auto text-xs font-medium text-[oklch(0.4_0.2_300)] group-hover:underline">
            Przejdź do widoku kupującego →
          </span>
        </Link>

        {/* Seller */}
        <Link
          href="/panel"
          className="group flex flex-col gap-4 rounded-2xl border-2 border-border hover:border-[oklch(0.4_0.2_300)] bg-white p-8 transition-all hover:shadow-lg"
        >
          <div className="w-14 h-14 rounded-2xl bg-[oklch(0.95_0.05_300)] flex items-center justify-center">
            <Sparkles className="size-7 text-[oklch(0.4_0.2_300)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold mb-1 group-hover:text-[oklch(0.4_0.2_300)] transition-colors">
              Jestem sprzedawcą
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Zobacz panel sprzedawcy i ofertę Pro z FitByBody.
            </p>
          </div>
          <span className="mt-auto text-xs font-medium text-[oklch(0.4_0.2_300)] group-hover:underline">
            Przejdź do panelu sprzedawcy →
          </span>
        </Link>
      </div>

      {/* Hint */}
      <p className="mt-10 text-xs text-muted-foreground text-center">
        Panel sprzedawcy z trybem debug:{" "}
        <Link href="/panel?debug=1" className="underline hover:text-foreground">
          /panel?debug=1
        </Link>
      </p>
    </div>
  );
}
