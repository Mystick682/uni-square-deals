import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, ShieldCheck, Sparkles, MessageSquare, Star, ArrowRight, GraduationCap } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { categories, listings, universities } from "@/data/mock";
import heroImg from "@/assets/hero-students.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UniTrade — Your Campus. Your Market. Your Community." },
      { name: "description", content: "A trusted marketplace exclusively for verified university students across Nigeria. Buy, sell, and discover within your campus community." },
      { property: "og:title", content: "UniTrade — Trusted Student Marketplace" },
      { property: "og:description", content: "Buy and sell safely with verified students on your campus." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = listings.filter((l) => l.featured);
  const trending = listings.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-accent" />
        <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-24 lg:py-28">
          <div className="text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-foreground/90 backdrop-blur"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-trust" />
              Verified students from 50+ Nigerian universities
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Your campus.<br />
              <span className="text-trust">Your market.</span><br />
              Your community.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 max-w-lg text-base text-primary-foreground/80 sm:text-lg"
            >
              Buy, sell and discover products and services from verified students on your campus. Trust built in. Scams locked out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-7 flex flex-col gap-3 rounded-2xl bg-surface p-2 text-foreground shadow-[var(--shadow-lift)] sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search MacBooks, hostels, tutors…"
                  className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="hidden h-8 w-px bg-border sm:block" />
              <div className="flex items-center gap-2 px-3 sm:px-1">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <select className="h-11 w-full bg-transparent text-sm outline-none sm:w-44">
                  <option value="">All campuses</option>
                  {universities.map((u) => (
                    <option key={u.id} value={u.id}>{u.short} — {u.city}</option>
                  ))}
                </select>
              </div>
              <Button asChild size="lg" className="h-11 rounded-xl">
                <Link to="/browse">Search</Link>
              </Button>
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-trust" /> Student-ID verified</span>
              <span className="inline-flex items-center gap-1.5"><MessageSquare className="h-4 w-4 text-trust" /> In-app chat</span>
              <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-gold" /> Seller ratings</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[var(--shadow-lift)]">
              <img src={heroImg} alt="Students trading on campus" className="aspect-[4/3] h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-lift)] sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-trust/15 text-trust"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <div className="text-sm font-semibold">12,480 verified students</div>
                  <div className="text-xs text-muted-foreground">across 9 universities</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page py-16">
        <SectionHeader eyebrow="Explore" title="Shop by category" />
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {categories.map((c) => (
            <a
              key={c.id}
              href="/browse"
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-soft)]"
            >
              <div className="text-2xl">{c.emoji}</div>
              <div className="text-xs font-medium text-foreground">{c.name}</div>
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-secondary/60 py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <SectionHeader eyebrow="Hand-picked" title="Featured listings" />
            <Button asChild variant="ghost" className="gap-1">
              <Link to="/browse">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => <ProductCard key={l.id} item={l} />)}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="container-page py-16">
        <SectionHeader eyebrow="On the move" title="Trending on campus" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((l) => <ProductCard key={l.id} item={l} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="container-page py-16">
        <SectionHeader eyebrow="Trust, built-in" title="How UniTrade works" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "Verify your student status", body: "Sign up with your school email or upload your ID. Admins review every request." },
            { icon: Sparkles, title: "List or browse safely", body: "Post listings in seconds. Browse only your campus or all of Nigeria." },
            { icon: MessageSquare, title: "Chat, meet, exchange", body: "Message verified students directly. Meet on campus. Rate after the deal." },
          ].map((s, i) => (
            <div key={i} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/60 py-16">
        <div className="container-page">
          <SectionHeader eyebrow="Loved on campus" title="What students are saying" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { name: "Tola, UNILAG", body: "Sold my old iPad in two days to someone in my own hostel. The verification badge made it easy to trust the buyer." },
              { name: "Chinedu, UI", body: "Finally a marketplace where I don't have to worry about scammers. Every seller is a real student." },
              { name: "Aisha, ABU", body: "I rent out my textbooks every semester. UniTrade has paid for my groceries the whole year." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <p className="mt-3 text-sm text-foreground">"{t.body}"</p>
                <div className="mt-4 text-xs font-medium text-muted-foreground">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                Ready to join your campus market?
              </h2>
              <p className="mt-3 max-w-xl text-primary-foreground/80">
                Verify your student account in minutes. Post your first listing free.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-xl">
                <Link to="/auth">Create account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <Link to="/browse">Browse listings</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
    </div>
  );
}
