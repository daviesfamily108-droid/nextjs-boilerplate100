
"use client";
import Link from "next/link";
import { startTrial, trialDaysRemaining, isPremiumActive } from "@/utils/subscription";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [days, setDays] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setDays(trialDaysRemaining());
    setActive(isPremiumActive());
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-slate-900/60 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-extrabold">🏆 BullseyeDartsLeague</div>
        <div className="flex items-center gap-3">
          {!active && (
            <button
              onClick={()=>{ startTrial(3); location.reload(); }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold shadow-card"
              title="Start your 3-day free trial"
            >
              3‑DAY FREE TRIAL
            </button>
          )}
          {active && days>0 && (
            <span className="text-amber-300">Trial ends in {days} day{days===1?"":"s"}</span>
          )}
          <Link href="/subscription" className="btn">Subscribe</Link>
        </div>
      </div>
    </header>
  );
}
