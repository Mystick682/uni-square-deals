import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, ShieldCheck, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { universities } from "@/data/mock";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — UniTrade" },
      { name: "description", content: "Sign in or create your verified student account on UniTrade." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden bg-primary p-12 text-primary-foreground md:flex md:flex-col md:justify-between">
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 backdrop-blur"><GraduationCap className="h-5 w-5" /></div>
          <div className="font-display text-lg font-bold">UniTrade</div>
        </Link>
        <div className="relative">
          <h1 className="font-display text-4xl font-bold leading-tight">A marketplace built<br />on student trust.</h1>
          <p className="mt-4 max-w-md text-primary-foreground/80">Verify your student ID once. Trade with thousands of verified students across Nigeria — safely.</p>
          <div className="mt-8 space-y-3 text-sm">
            {[
              "Verified by your school email or student ID",
              "Real-time chat with sellers on your campus",
              "Ratings, reviews and scam protection built-in",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-trust" /> {t}</div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-primary-foreground/60">© {new Date().getFullYear()} UniTrade</div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-6 inline-flex rounded-lg border border-border bg-muted p-1 text-sm">
            <button
              onClick={() => setMode("signin")}
              className={`rounded-md px-4 py-1.5 font-medium transition ${mode === "signin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >Sign in</button>
            <button
              onClick={() => setMode("signup")}
              className={`rounded-md px-4 py-1.5 font-medium transition ${mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >Create account</button>
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight">
            {mode === "signin" ? "Welcome back" : "Join your campus market"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Sign in to continue trading on your campus." : "It takes 2 minutes. Verification keeps everyone safe."}
          </p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <>
                <Field icon={User} label="Full name" placeholder="Your name" />
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">University</label>
                  <select className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-accent">
                    <option value="">Select your institution</option>
                    {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              </>
            )}
            <Field icon={Mail} type="email" label="School email" placeholder="you@university.edu.ng" />
            <Field icon={Lock} type="password" label="Password" placeholder="••••••••" />

            <Button type="submit" size="lg" className="mt-2 w-full">
              {mode === "signin" ? "Sign in" : "Create my account"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By continuing you agree to UniTrade's Terms and Community Rules.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, type = "text", placeholder }: { icon: any; label: string; type?: string; placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-accent">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <input type={type} placeholder={placeholder} className="h-11 w-full bg-transparent text-sm outline-none" />
      </div>
    </div>
  );
}
