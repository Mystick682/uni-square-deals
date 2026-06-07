import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, listings, universities } from "@/data/mock";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse listings — UniTrade" },
      { name: "description", content: "Browse student listings across Nigerian universities. Filter by campus, category, condition and price." },
    ],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const [q, setQ] = useState("");
  const [uni, setUni] = useState("");
  const [cat, setCat] = useState("");
  const [cond, setCond] = useState("");

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (q && !l.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (uni && l.university !== uni) return false;
      if (cat && l.category !== cat) return false;
      if (cond && l.condition !== cond) return false;
      return true;
    });
  }, [q, uni, cat, cond]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Marketplace</div>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Browse listings</h1>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length} items across {universities.length} campuses</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" /> Filter your campus
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search listings…"
              className="h-10 w-full bg-transparent text-sm outline-none"
            />
          </div>
          <Select value={uni} onChange={setUni} placeholder="All campuses" options={universities.map((u) => ({ value: u.id, label: `${u.short} — ${u.city}` }))} />
          <Select value={cat} onChange={setCat} placeholder="All categories" options={categories.map((c) => ({ value: c.id, label: c.name }))} />
          <Select value={cond} onChange={setCond} placeholder="Any condition" options={["New", "Like New", "Used", "Refurbished"].map((c) => ({ value: c, label: c }))} />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No listings match your filters yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((l) => <ProductCard key={l.id} item={l} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Select({ value, onChange, placeholder, options }: { value: string; onChange: (v: string) => void; placeholder: string; options: { value: string; label: string }[]; }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-accent"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
