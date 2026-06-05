"use client";

import { Suspense } from "react";
import PanelContent from "./panel-content";

export default function PanelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Ładowanie…</div>}>
      <PanelContent />
    </Suspense>
  );
}
