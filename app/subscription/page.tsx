
"use client";
import { activatePremium, startTrial, trialDaysRemaining, isPremiumActive } from "@/utils/subscription";
import { useEffect, useState } from "react";

export default function SubscriptionPage(){
  const [days,setDays]=useState(0);
  const [active,setActive]=useState(false);
  useEffect(()=>{ setDays(trialDaysRemaining()); setActive(isPremiumActive()); },[]);

  return (
    <div className="max-w-3xl mx-auto card space-y-4">
      <h1 className="text-2xl font-bold">Premium Membership</h1>
      <p>Unlock online play, advanced stats, spectator mode, and more.</p>
      {!active && (
        <div className="flex gap-3">
          <button className="btn bg-amber-500 hover:bg-amber-400 text-slate-900" onClick={()=>{ startTrial(); location.href="/"; }}>Start 3‑Day Free Trial</button>
          <button className="btn" onClick={()=>{ /* replace with Stripe redirect */ activatePremium(); alert("Premium activated (mock). Replace with Stripe redirect)."); location.href="/"; }}>
            Subscribe £2.99/mo
          </button>
        </div>
      )}
      {active && (
        <div className="text-emerald-300 font-bold">Premium active. {days>0 && `Trial ends in ${days} day${days===1?"":"s"}.`}</div>
      )}
      <p className="text-sm text-slate-400">Note: Stripe integration is stubbed for local dev. Wire your keys in <code>.env.local</code> and update the API route to enable live checkout.</p>
    </div>
  );
}
