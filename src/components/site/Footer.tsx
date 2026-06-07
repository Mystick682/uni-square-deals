import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="font-display text-lg font-bold">UniTrade</div>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Your Campus. Your Market. Your Community. A trusted marketplace built exclusively for verified students.
          </p>
        </div>
        {[
          { title: "Marketplace", links: ["Browse", "Categories", "Top sellers", "Featured"] },
          { title: "Trust & Safety", links: ["Verification", "Scam reporting", "Community rules", "Ambassadors"] },
          { title: "Company", links: ["About", "Universities", "Careers", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold text-foreground">{col.title}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} UniTrade. Built for African campuses.</div>
          <div>Made with care in Lagos, Ibadan & Ife.</div>
        </div>
      </div>
    </footer>
  );
}
