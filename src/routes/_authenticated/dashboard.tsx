import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Package, MessageCircle, Plus } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — UniTrade" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const name = (user.user_metadata as { full_name?: string } | null)?.full_name ?? user.email;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container-page flex-1 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="font-display text-3xl font-bold tracking-tight">{name}</h1>
          </div>
          <Button className="gap-1.5"><Plus className="h-4 w-4" /> Post a listing</Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Package, label: "Active listings", value: "0" },
            { icon: MessageCircle, label: "Unread messages", value: "0" },
            { icon: ShieldCheck, label: "Verification", value: "Pending" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-background p-5">
              <s.icon className="h-5 w-5 text-accent" />
              <div className="mt-3 text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
          <h2 className="font-display text-xl font-semibold">Your marketplace dashboard is ready</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Listings, messaging, reviews and verification will appear here as we build out the next stages.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
