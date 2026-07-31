"use client";

import { useState } from "react";
import { TextReveal } from "@/components/lib-ary/text-reveal/TextReveal";
import { Button } from "@/components/lib-ary/button/Button";
import { Card } from "@/components/lib-ary/card/Card";
import { Icons } from "@/components/lib-ary/icons/Icons";
import Link from "next/link";
import { MapboxMap } from "@/components/mapbox/MapboxMap";

interface Gig {
  id: string;
  venue: string;
  payout: number;
  expenses: number;
  gigHours: number;
  commuteMinutes: number;
  lat: number;
  lng: number;
}

const DEMO_GIGS: Gig[] = [
  {
    id: "1",
    venue: "The Echo",
    payout: 150,
    expenses: 28,
    gigHours: 2,
    commuteMinutes: 45,
    lat: 34.0703,
    lng: -118.2596,
  },
  {
    id: "2",
    venue: "Silverlake Lounge",
    payout: 200,
    expenses: 15,
    gigHours: 2.5,
    commuteMinutes: 25,
    lat: 34.0777,
    lng: -118.2609,
  },
  {
    id: "3",
    venue: "The Smell",
    payout: 60,
    expenses: 12,
    gigHours: 1.5,
    commuteMinutes: 55,
    lat: 34.0453,
    lng: -118.2454,
  },
  {
    id: "4",
    venue: "The Mint",
    payout: 350,
    expenses: 40,
    gigHours: 3,
    commuteMinutes: 30,
    lat: 34.0516,
    lng: -118.3761,
  },
];

function trueHourly(gig: Gig): number {
  const totalHours = gig.gigHours + gig.commuteMinutes / 60;
  if (totalHours <= 0) return 0;
  return Math.round(((gig.payout - gig.expenses) / totalHours) * 100) / 100;
}

export default function DashboardPage() {
  const [gigs] = useState<Gig[]>(DEMO_GIGS);
  const [selectedGigId, setSelectedGigId] = useState<string | null>(null);

  const selectedGig = gigs.find((g) => g.id === selectedGigId) ?? null;

  const avgRate =
    gigs.length > 0
      ? Math.round(
          (gigs.reduce((acc, g) => acc + trueHourly(g), 0) / gigs.length) * 100
        ) / 100
      : 0;

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Chrome: centered logo + back */}
      <header className="w-full max-w-md mx-auto px-4 pt-6 pb-2 flex flex-col items-center gap-1">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-[14px] bg-[#1e1f23] ring-1 ring-[#2b2c31] flex items-center justify-center">
            <img src="/logo.svg" alt="Sill" className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">
            Sill
          </span>
        </Link>
        <Link
          href="/"
          className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back home
        </Link>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-24 flex flex-col gap-5 pt-4">
        {/* Average rate gauge */}
        <section className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium self-center">
            Average True Rate
          </span>
          <Card className="rounded-[20px] bg-[#1e1f23] ring-1 ring-[#2b2c31] p-5 flex flex-col items-center gap-3">
            <div className="relative w-36 h-36 rounded-full bg-[#18191d] ring-1 ring-[#2b2c31] flex items-center justify-center">
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
                  strokeWidth="6"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#8ab4f8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="326.7"
                  strokeDashoffset={326.7 - (avgRate / 100) * 326.7}
                />
              </svg>
              <span className="relative z-10 text-3xl font-bold tabular-nums text-foreground">
                ${avgRate}
                <span className="text-base text-muted-foreground">/hr</span>
              </span>
            </div>
            <div className="flex items-center gap-5 text-xs text-muted-foreground">
              <span>{gigs.length} gigs tracked</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>Local data</span>
            </div>
          </Card>
        </section>

        {/* Commute Overlay — Mapbox */}
        <section className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
            Commute Overlay
          </span>
          <div className="rounded-[20px] ring-1 ring-[#2b2c31] overflow-hidden h-[340px]">
            <MapboxMap
              className="h-full w-full"
              center={[-118.26, 34.06]}
              zoom={11}
              markers={gigs.map((g) => ({
                id: g.id,
                lngLat: [g.lng, g.lat],
                color: g.id === selectedGigId ? "#8ab4f8" : "#4a5568",
                popupHtml: `<b>${g.venue}</b><br/>$${g.payout} — ${g.commuteMinutes}m commute`,
              }))}
              onMapClick={() => {}}
            />
          </div>
        </section>

        {/* Earnings Trend */}
        <section className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
            Earnings Trend
          </span>
          <Card className="rounded-[20px] bg-[#1e1f23] ring-1 ring-[#2b2c31] p-5 flex flex-col gap-3">
            <div className="flex items-end gap-1 h-24">
              {[42, 55, 38, 68, 52, 72, 59].map((val, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[4px]"
                  style={{
                    height: `${(val / 80) * 100}%`,
                    backgroundColor: i >= 4 ? "#8ab4f8" : "#2b2c31",
                    minHeight: 4,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold text-foreground tabular-nums">
                $68
              </span>
              <span className="text-[11px] text-[#8ab4f8]">+12% this week</span>
            </div>
          </Card>
        </section>

        {/* Gig Ledger */}
        <section className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
            Gig Ledger
          </span>
          <div className="rounded-[20px] bg-[#1e1f23] ring-1 ring-[#2b2c31] overflow-hidden">
            {gigs.map((gig, i) => {
              const rate = trueHourly(gig);
              const isSelected = selectedGigId === gig.id;
              return (
                <div key={gig.id}>
                  <button
                    onClick={() =>
                      setSelectedGigId(isSelected ? null : gig.id)
                    }
                    className={`w-full px-4 py-3.5 flex items-center justify-between text-left transition-colors ${
                      isSelected ? "bg-[#25262b]" : "hover:bg-[#1a1b20]"
                    } ${i < gigs.length - 1 ? "border-b border-[#2b2c31]" : ""}`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-foreground">
                        {gig.venue}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        ${gig.payout} · {gig.commuteMinutes}m commute · ${gig.expenses} expenses
                      </span>
                    </div>
                    <span
                      className={`text-sm font-semibold tabular-nums ${
                        rate < 20
                          ? "text-red-400/80"
                          : "text-[#8ab4f8]"
                      }`}
                    >
                      ${rate}/hr
                    </span>
                  </button>
                  {/* Expanded detail */}
                  {isSelected && (
                    <div className="px-4 pb-4 flex flex-col gap-3 border-b border-[#2b2c31]">
                      <div className="rounded-[16px] bg-[#18191d] ring-1 ring-[#2b2c31] p-3 flex flex-col gap-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Payout</span>
                          <span className="text-foreground tabular-nums font-medium">
                            ${gig.payout}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Expenses</span>
                          <span className="text-foreground tabular-nums font-medium">
                            -${gig.expenses}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Gig time</span>
                          <span className="text-foreground tabular-nums font-medium">
                            {gig.gigHours}h
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Commute</span>
                          <span className="text-foreground tabular-nums font-medium">
                            {gig.commuteMinutes}m
                          </span>
                        </div>
                        <div className="border-t border-[#2b2c31] pt-2 flex justify-between text-xs">
                          <span className="text-muted-foreground font-medium">
                            True Rate
                          </span>
                          <span className="text-[#8ab4f8] tabular-nums font-semibold text-sm">
                            ${rate}/hr
                          </span>
                        </div>
                      </div>
                      <div className="h-[120px] rounded-[16px] ring-1 ring-[#2b2c31] overflow-hidden">
                        <MapboxMap
                          className="h-full w-full"
                          center={[gig.lng, gig.lat]}
                          zoom={13}
                          markers={[
                            {
                              id: gig.id,
                              lngLat: [gig.lng, gig.lat],
                              color: "#8ab4f8",
                              popupHtml: `<b>${gig.venue}</b>`,
                            },
                          ]}
                          onMapClick={() => {}}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick-add */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() =>
              alert("Demo: manual gig entry would open here.")
            }
          >
            <Icons.Plus size={16} className="mr-1.5" /> Add Gig Manually
          </Button>
        </div>
      </main>
    </div>
  );
}