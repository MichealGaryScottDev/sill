import { TextReveal } from "@/components/lib-ary/text-reveal/TextReveal";
import { Button } from "@/components/lib-ary/button/Button";
import { Icons } from "@/components/lib-ary/icons/Icons";
import { Card } from "@/components/lib-ary/card/Card";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <SiteHeader />

      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-12 pb-24 flex flex-col gap-12">
        {/* Hero */}
        <section className="flex flex-col items-center text-center gap-5 pt-10">
          {/* Oversized logo mark */}
          <div className="w-24 h-24 rounded-[24px] bg-[#1e1f23] ring-1 ring-[#2b2c31] flex items-center justify-center mb-1">
            <img src="/logo.svg" alt="Sill" className="w-14 h-14" />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <TextReveal
              mode="word"
              as="h1"
              className="text-[2.125rem] leading-tight font-semibold tracking-tight text-foreground"
            >
              Know what each gig is really worth.
            </TextReveal>
          </div>

          <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
            The true-hourly-rate dashboard for working musicians. No fluff — just
            the numbers.
          </p>

          <Button
            variant="primary"
            size="lg"
            asChild
            className="mt-3"
          >
            <Link href="/dashboard">Get the true rate</Link>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] text-muted-foreground/70 font-medium uppercase tracking-widest">
            <span>Calendar Sync</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>Commute Maps</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>Local-First</span>
          </div>
        </section>

        {/* True Rate Gauge Preview */}
        <section className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
            The True Rate Gauge
          </span>
          <Card className="rounded-[20px] bg-[#1e1f23] ring-1 ring-[#2b2c31] p-5 flex flex-col items-center gap-4">
            <div className="relative w-44 h-44 rounded-full bg-[#18191d] ring-1 ring-[#2b2c31] flex items-center justify-center">
              {/* Gauge arc */}
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full -rotate-90"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#2b2c31"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#8ab4f8"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="326.7"
                  strokeDashoffset="100"
                />
              </svg>
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground mb-0.5">
                  True Rate
                </span>
                <span className="text-4xl font-bold tracking-tight tabular-nums text-foreground">
                  $42
                  <span className="text-lg text-muted-foreground">/hr</span>
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-[240px] leading-relaxed">
              After a 45‑min commute and $28 in expenses, your $150 gig pays you
              $42/hour — not $50.
            </p>
          </Card>
        </section>

        {/* Commute Overlay preview */}
        <section className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
            Commute Overlay
          </span>
          <div className="overflow-hidden rounded-[20px] ring-1 ring-[#2b2c31] h-[240px]">
            <iframe
              src="/commute-sim.html"
              className="w-full h-full"
              title="Commute simulation"
            />
          </div>
        </section>

        {/* Gig Ledger preview */}
        <section className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
            Gig Ledger
          </span>
          <div className="rounded-[20px] bg-[#1e1f23] ring-1 ring-[#2b2c31] overflow-hidden">
            {[
              { venue: "The Echo", pay: "$150", expenses: "$28", commute: "45m", rate: "$42/hr" },
              { venue: "Silverlake Lounge", pay: "$200", expenses: "$15", commute: "25m", rate: "$68/hr" },
              { venue: "The Smell", pay: "$60", expenses: "$12", commute: "55m", rate: "$18/hr" },
            ].map((gig, i) => (
              <div
                key={gig.venue}
                className={`px-4 py-3.5 flex items-center justify-between ${
                  i < 2 ? "border-b border-[#2b2c31]" : ""
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">{gig.venue}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {gig.pay} — {gig.commute} commute — {gig.expenses} expenses
                  </span>
                </div>
                <span
                  className={`text-sm font-semibold tabular-nums ${
                    parseFloat(gig.rate) < 20 ? "text-red-400/80" : "text-[#8ab4f8]"
                  }`}
                >
                  {gig.rate}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
            Local-First Privacy
          </span>
          <div className="rounded-[20px] bg-[#1e1f23] ring-1 ring-[#2b2c31] p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#18191d] ring-1 ring-[#2b2c31] flex items-center justify-center shrink-0">
              <Icons.Shield size={20} className="text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground">
                No server. No cloud. Your data stays yours.
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed">
                Everything lives in your browser’s local storage. Sill never
                uploads your gig history, commute times, or earnings.
              </span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="flex flex-col items-center gap-3 mt-2 pb-4">
          <Button variant="primary" size="lg" asChild>
            <Link href="/dashboard">Open Sill Dashboard</Link>
          </Button>
          <span className="text-[10px] text-muted-foreground/60">
            Free. No sign-up. Works in your browser.
          </span>
        </div>
      </main>

      {/* Footer: just a centered line for wallet density */}
      <footer className="w-full max-w-md mx-auto px-4 pb-8 text-center">
        <span className="text-[10px] text-muted-foreground/40">
          Sill — Know what each gig is really worth.
        </span>
      </footer>
    </div>
  );
}