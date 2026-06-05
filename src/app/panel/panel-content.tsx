"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  TrendingDown,
  Check,
  Sparkles,
  ChevronLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FitByBodyWidget } from "@/components/fit-by-body-widget";
import { fitProducts, sellerMetrics } from "@/data/fitbybody";

type Price = 199 | 249 | 299;

interface FakeDoorEvent {
  timestamp: string;
  price: Price;
  view: string;
}

const STORAGE_KEY = "fh_fakedoor_events";

function saveEvent(price: Price) {
  const existing: FakeDoorEvent[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? "[]"
  );
  const event: FakeDoorEvent = {
    timestamp: new Date().toISOString(),
    price,
    view: "panel",
  };
  existing.push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  console.log("[FashionHero FakeDoor] CTA clicked", event);
}

function getEvents(): FakeDoorEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function PanelContent() {
  const searchParams = useSearchParams();
  const isDebug = searchParams.get("debug") === "1";

  const [selectedPrice, setSelectedPrice] = useState<Price>(199);
  const [showModal, setShowModal] = useState(false);
  const [debugUnlocked, setDebugUnlocked] = useState(false);
  const [events, setEvents] = useState<FakeDoorEvent[]>([]);

  useEffect(() => {
    if (isDebug) {
      setEvents(getEvents());
    }
  }, [isDebug, showModal]);

  const paywallLocked = isDebug ? !debugUnlocked : true;

  function handleCTAClick() {
    saveEvent(selectedPrice);
    setShowModal(true);
    if (isDebug) setEvents(getEvents());
  }

  const dressProduct = fitProducts.find((p) => p.id === "sukienka")!;

  return (
    <div className="min-h-screen bg-white">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Sparkles className="size-8 text-[oklch(0.4_0.2_300)]" />
              </div>
              <h2 className="text-xl font-bold">Dziękujemy za zainteresowanie!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Twoja deklaracja zainteresowania planem Pro ({selectedPrice} PLN/mies.)
                została odnotowana. Skontaktujemy się z Tobą, gdy FitByBody Pro będzie
                dostępne dla Atelier Mila.
              </p>
              <div className="bg-muted rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground">
                Wybrana cena:{" "}
                <span className="font-bold text-foreground">{selectedPrice} PLN/mies.</span>
              </div>
              <Button
                onClick={() => setShowModal(false)}
                className="w-full h-10 rounded-full bg-[oklch(0.4_0.2_300)] text-white"
              >
                Zamknij
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Strona główna
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{sellerMetrics.name}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Panel sprzedawcy</p>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider border border-border rounded-full px-3 py-1">
            {sellerMetrics.plan}
          </span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Wskaźnik zwrotów
            </p>
            <p className="text-3xl font-bold text-foreground">{sellerMetrics.returnRate}%</p>
          </div>
          <div className="border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Zwroty „zły rozmiar"
            </p>
            <p className="text-3xl font-bold text-destructive">
              {sellerMetrics.wrongSizeReturnPct}%
            </p>
          </div>
          <div className="border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Konwersja
            </p>
            <p className="text-3xl font-bold text-foreground">{sellerMetrics.conversionRate}%</p>
          </div>
        </div>

        {/* Paywall section */}
        <div className="border-2 border-[oklch(0.8_0.1_300)] rounded-2xl overflow-hidden">
          {/* Section header */}
          <div className="bg-gradient-to-r from-[oklch(0.95_0.05_300)] to-white px-6 py-5">
            <div className="flex items-start gap-3">
              <TrendingDown className="size-5 text-[oklch(0.4_0.2_300)] mt-0.5 shrink-0" />
              <div>
                <h2 className="font-bold text-lg text-foreground">
                  Twoi kupujący rzadziej zwracają zły rozmiar
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  FitByBody Pro — widget dopasowania sylwetki dla Twoich produktów
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Benefits */}
            <ul className="space-y-2">
              {[
                "Mniej zwrotów z powodu złego rozmiaru — średnio o 34%",
                "Wyższa konwersja dzięki pewności kupujących co do rozmiaru",
                "Mniej ticketów supportu 'czy ten rozmiar jest dla mnie'",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Check className="size-4 text-[oklch(0.4_0.2_300)] mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Widget preview with lock overlay */}
            <div className="relative">
              <div
                className={
                  paywallLocked
                    ? "opacity-40 blur-sm pointer-events-none select-none"
                    : ""
                }
              >
                <FitByBodyWidget product={dressProduct} locked={paywallLocked} />
              </div>

              {paywallLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                  <div className="bg-white/90 rounded-2xl shadow-lg px-6 py-4 flex flex-col items-center gap-2 border border-[oklch(0.8_0.1_300)]">
                    <Lock className="size-8 text-[oklch(0.4_0.2_300)]" />
                    <span className="text-sm font-semibold text-foreground">
                      Tylko w planie Pro
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Price selector */}
            <div>
              <p className="text-sm font-medium mb-3">Wybierz plan cenowy</p>
              <div className="flex gap-3 flex-wrap">
                {([199, 249, 299] as Price[]).map((price) => (
                  <button
                    key={price}
                    onClick={() => setSelectedPrice(price)}
                    className={`flex-1 min-w-[80px] rounded-xl border-2 py-3 text-center transition-all ${
                      selectedPrice === price
                        ? "border-[oklch(0.4_0.2_300)] bg-[oklch(0.95_0.05_300)] text-[oklch(0.3_0.2_300)]"
                        : "border-border hover:border-[oklch(0.6_0.15_300)]"
                    }`}
                  >
                    <span className="block font-bold text-lg">{price} zł</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">/mies.</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={handleCTAClick}
              className="w-full h-12 rounded-full text-white font-semibold text-sm uppercase tracking-wide gap-2 bg-[oklch(0.4_0.2_300)] hover:opacity-90"
            >
              <Sparkles className="size-4" />
              Odblokuj w Pro — {selectedPrice} PLN/mies.
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Żadnych automatycznych płatności — skontaktujemy się z Tobą.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div>
          <h3 className="font-semibold text-base mb-4">Jak to działa</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "Dodajesz wymiary",
                desc: "Wgrywasz tabelę rozmiarów dla każdego produktu — raz, trwa 5 minut.",
              },
              {
                step: "2",
                title: "Widget pojawia się w sklepie",
                desc: "Kupujący widzą dopasowanie do sylwetki bezpośrednio na stronie produktu.",
              },
              {
                step: "3",
                title: "Mniej zwrotów, więcej sprzedaży",
                desc: "Śledzisz wyniki w panelu — konwersja, zwroty, satysfakcja kupujących.",
              },
            ].map((item) => (
              <div key={item.step} className="border border-border rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-[oklch(0.95_0.05_300)] text-[oklch(0.4_0.2_300)] font-bold text-sm flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Debug panel */}
        {isDebug && (
          <div className="border-2 border-dashed border-amber-400 rounded-xl p-5 space-y-4 bg-amber-50">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-sm font-bold text-amber-800">
                🛠 Debug Panel (tylko przy ?debug=1)
              </h4>
              <Button
                onClick={() => setDebugUnlocked((v) => !v)}
                className="text-xs h-7 px-3 bg-amber-600 text-white rounded-full"
              >
                {debugUnlocked ? "Zablokuj paywall" : "Odblokuj paywall"}
              </Button>
            </div>

            <div>
              <p className="font-mono text-xs text-amber-800 mb-2">
                Zdarzenia fake-door ({events.length}) — klucz:{" "}
                <code>{STORAGE_KEY}</code>
              </p>
              {events.length === 0 ? (
                <p className="text-xs text-amber-700 italic">
                  Brak zdarzeń. Kliknij &ldquo;Odblokuj w Pro&rdquo;.
                </p>
              ) : (
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {events.map((e, i) => (
                    <div
                      key={i}
                      className="font-mono text-xs bg-white border border-amber-200 rounded px-2 py-1"
                    >
                      [{e.timestamp}] price={e.price} view={e.view}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setEvents([]);
              }}
              className="text-xs h-7 px-3 bg-red-100 text-red-700 rounded-full border border-red-200"
            >
              Wyczyść zdarzenia
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
