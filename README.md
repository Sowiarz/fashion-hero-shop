# FashionHero — Prototyp walidacyjny FitByBody

Klikalny prototyp do testowania **willingness-to-pay (WTP)** sprzedawców za widget fit-by-body jako funkcję Pro (199–299 PLN/mies.).

Metoda badawcza: **fake-door** (test drzwi) dla killer assumption S3.1+2-A1 (viability).

---

## Jak uruchomić

```bash
npm install
npm run dev
```

Aplikacja startuje na `http://localhost:3000`.

---

## Routing i widoki

| URL | Opis |
|-----|------|
| `/` | Landing — wybór roli (kupujący / sprzedawca) |
| `/produkt/sukienka` | Widok kupującego — sukienka z widgetem FitByBody |
| `/produkt/torba` | Widok kupującego — torba (przykład innej kategorii) |
| `/panel` | Widok sprzedawcy — metryki + paywall Pro + fake-door |
| `/panel?debug=1` | Jak wyżej + panel debug (odblokowanie paywalla, podgląd zdarzeń) |

---

## Co testuje ten prototyp

**Hipoteza:** co najmniej 5% sprzedawców, którzy widzą ofertę FitByBody Pro, kliknie CTA i wybierze cenę 199–299 PLN/mies.

**Mierzone zdarzenia:** kliknięcie "Odblokuj w Pro" + wybrana cena.

**Kryterium sukcesu:**
- WTP >= 5% unikalnych odwiedzin `/panel`
- Rozkład preferencji cenowych (199 / 249 / 299 PLN)

---

## Gdzie podejrzeć zdarzenia fake-door

### W przeglądarce (localStorage)
1. Otwórz `/panel`, kliknij CTA "Odblokuj w Pro"
2. DevTools -> Application -> Local Storage -> `localhost:3000`
3. Klucz: **`fh_fakedoor_events`**

Format zdarzenia:
```json
[
  {
    "timestamp": "2026-06-06T10:30:00.000Z",
    "price": 249,
    "view": "panel"
  }
]
```

### W konsoli przeglądarki
Kazde klikniecie loguje: `[FashionHero FakeDoor] CTA clicked { timestamp, price, view }`

### Panel debug (najwygodniej)
Wejdz na `/panel?debug=1` — widzisz liste wszystkich zdarzen z localStorage oraz przycisk do ich czyszczenia.

---

## Jak przełączyć kategorię produktu

W widoku kupującego (`/produkt/[id]`) są dwa kafle u góry:
- **Sukienka** -> `/produkt/sukienka`
- **Torba** -> `/produkt/torba`

Dane produktów (wymiary, rozmiary, obrazy) są w `src/data/fitbybody.ts` — wystarczy edytowac `fitProducts`.

---

## Jak przełączyć stan paywalla (dev)

Odwiedz `/panel?debug=1`. W dolnym panelu debug jest przycisk **"Odblokuj paywall"** — pokazuje widget FitByBody bez nakładki Lock, aby przetestowac pełne UI.

---

## Stack

- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind CSS v4 + base-ui/react
- Dane mockowe w `src/data/fitbybody.ts` (zero backendu)
- Zdarzenia fake-door w localStorage

## Pliki kluczowe

| Plik | Zawartość |
|------|-----------|
| `src/data/fitbybody.ts` | Dane mockowe: produkty, sylwetki, metryki sprzedawcy |
| `src/components/fit-by-body-widget.tsx` | Główny widget (przełącznik sylwetek + tabela + personalizacja) |
| `src/app/produkt/[id]/page.tsx` | Widok kupującego |
| `src/app/panel/panel-content.tsx` | Widok sprzedawcy — paywall, ceny, fake-door, debug |
| `src/app/page.tsx` | Landing — wybór roli |
