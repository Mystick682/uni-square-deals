import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">UniTrade</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Campus Market</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/browse" className="text-sm font-medium text-foreground/80 hover:text-foreground">Browse</Link>
          <a href="/browse" className="text-sm font-medium text-foreground/80 hover:text-foreground">Categories</a>
          <a href="/#how" className="text-sm font-medium text-foreground/80 hover:text-foreground">How it works</a>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-trust/15 px-2.5 py-1 text-xs font-medium text-trust-foreground">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified students only
          </span>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={signOut} variant="ghost" size="sm" className="gap-1.5">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="gap-1.5">
                <Link to="/auth"><Plus className="h-4 w-4" /> Post a listing</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
