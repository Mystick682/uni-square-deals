import { ShieldCheck, Star, MapPin, BadgeCheck } from "lucide-react";
import { formatNaira, type Listing, universities } from "@/data/mock";

export function ProductCard({ item }: { item: Listing }) {
  const uni = universities.find((u) => u.id === item.university);
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="rounded-full bg-background/90 px-2 py-0.5 text-[11px] font-medium text-foreground backdrop-blur">
            {item.condition}
          </span>
          {item.featured && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[11px] font-semibold text-gold-foreground">
              Featured
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{item.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-bold tracking-tight text-foreground">{formatNaira(item.price)}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {item.seller.rating.toFixed(1)}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-foreground">{item.seller.name}</span>
            {item.seller.verified && <ShieldCheck className="h-3.5 w-3.5 text-trust" />}
            {item.seller.trusted && <BadgeCheck className="h-3.5 w-3.5 text-gold" />}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {uni?.short}
          </div>
        </div>
      </div>
    </article>
  );
}
