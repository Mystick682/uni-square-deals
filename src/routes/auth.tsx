import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, ShieldCheck, Mail, Lock, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { universities } from "@/data/mock";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — UniTrade" },
      { name: "description", content: "Sign in or create your verified student account on UniTrade." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signup");
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName, university_id: universityId },
          },
        });
        if (error) throw error;
        toast.success("Check your email", { description: "We sent a verification link to confirm your account." });
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Reset link sent", { description: "Check your email for password reset instructions." });
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/dashboard` });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
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
            {["Verified by your school email or student ID", "Real-time chat with sellers on your campus", "Ratings, reviews and scam protection built-in"].map((t) => (
              <div key={t} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-trust" /> {t}</div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-primary-foreground/60">© {new Date().getFullYear()} UniTrade</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {mode !== "forgot" && (
            <div className="mb-6 inline-flex rounded-lg border border-border bg-muted p-1 text-sm">
              <button onClick={() => setMode("signin")} className={`rounded-md px-4 py-1.5 font-medium transition ${mode === "signin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>Sign in</button>
              <button onClick={() => setMode("signup")} className={`rounded-md px-4 py-1.5 font-medium transition ${mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>Create account</button>
            </div>
          )}

          <h2 className="font-display text-2xl font-bold tracking-tight">
            {mode === "signin" ? "Welcome back" : mode === "signup" ? "Join your campus market" : "Reset your password"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Sign in to continue trading on your campus." : mode === "signup" ? "It takes 2 minutes. Verification keeps everyone safe." : "Enter your email and we'll send you a reset link."}
          </p>

          {mode !== "forgot" && (
            <>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted disabled:opacity-50"
              >
                <GoogleIcon /> Continue with Google
              </button>
              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <Field icon={User} label="Full name" value={fullName} onChange={setFullName} required placeholder="Your name" />
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">University</label>
                  <select required value={universityId} onChange={(e) => setUniversityId(e.target.value)} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-accent">
                    <option value="">Select your institution</option>
                    {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
              </>
            )}
            <Field icon={Mail} type="email" label="School email" value={email} onChange={setEmail} required placeholder="you@university.edu.ng" />
            {mode !== "forgot" && (
              <Field icon={Lock} type="password" label="Password" value={password} onChange={setPassword} required placeholder="••••••••" />
            )}

            {mode === "signin" && (
              <button type="button" onClick={() => setMode("forgot")} className="text-xs font-medium text-accent hover:underline">
                Forgot your password?
              </button>
            )}

            <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : mode === "signup" ? "Create my account" : "Send reset link"}
            </Button>

            {mode === "forgot" && (
              <button type="button" onClick={() => setMode("signin")} className="block w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground">
                ← Back to sign in
              </button>
            )}

            <p className="text-center text-xs text-muted-foreground">
              By continuing you agree to UniTrade's Terms and Community Rules.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, type = "text", placeholder, value, onChange, required }: { icon: any; label: string; type?: string; placeholder?: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-accent">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-11 w-full bg-transparent text-sm outline-none" />
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
