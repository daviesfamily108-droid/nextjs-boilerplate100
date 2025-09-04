
"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isPremiumActive } from "@/utils/subscription";

type Stat = { title:string; key:string; premium?:boolean; icon?:string };

const freeStats:Stat[] = [
  { title:"Best 3 Darts Avg", key:"best3", icon:"🎯" },
  { title:"Worst 3 Darts Avg", key:"worst3", icon:"🎯" }
];

const premiumStats:Stat[] = [
  { title:"Best Checkout", key:"bestCheckout", premium:true, icon:"🔥" },
  { title:"Worst Checkout", key:"worstCheckout", premium:true },
  { title:"Best Leg Won", key:"bestLeg", premium:true, icon:"🥇" },
  { title:"Worst Leg Won", key:"worstLeg", premium:true }
];

export default function Home() {
  // Quick-fire usage
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);
  const premium = isPremiumActive();

  useEffect(()=>{
    setOnlineCount(parseInt(localStorage.getItem("use_online")||"0"));
    setOfflineCount(parseInt(localStorage.getItem("use_offline")||"0"));
  },[]);

  const primary = useMemo(()=> onlineCount>=offlineCount ? "online" : "offline", [onlineCount, offlineCount]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="card">
        <h2 className="text-2xl font-bold mb-3">Quick‑Fire Menu</h2>
        <div className="flex gap-3">
          <Link href="/online" className={`btn ${primary==="online"?"ring-2 ring-amber-400":""}`}>Play Online ({onlineCount})</Link>
          <Link href="/offline" className={`btn ${primary==="offline"?"ring-2 ring-amber-400":""}`}>Play Offline ({offlineCount})</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-2">Free Stats</h3>
          <ul className="space-y-2">
            {freeStats.map(s=>(
              <li key={s.key} className="flex items-center gap-2">
                <span>{s.title}</span> {s.icon && <span>{s.icon}</span>}
                <span className="ml-auto text-slate-400">—</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card relative">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Premium Stats {!premium && <span className="text-yellow-300">🔒</span>}</h3>
          {!premium && (
            <Link href="/subscription" className="absolute inset-0" aria-label="locked area"></Link>
          )}
          <ul className="space-y-2 pointer-events-none">
            {premiumStats.map(s=>(
              <li key={s.key} className="flex items-center gap-2">
                <span>{s.title}</span> {s.icon && <span>{s.icon}</span>}
                {!premium && <span className="ml-auto text-yellow-300">🔒</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
