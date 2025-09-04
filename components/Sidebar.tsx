
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(260);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragging.current) return;
      const min = 180, max = 420;
      const newW = Math.min(max, Math.max(min, e.clientX));
      setWidth(newW);
    }
    function stop(){ dragging.current = false; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", stop); };
  }, []);

  if (!open) {
    return (
      <div className="w-12 bg-slate-900/70 border-r border-slate-800 flex flex-col">
        <button onClick={() => setOpen(true)} className="m-2 btn">☰</button>
      </div>
    );
  }

  return (
    <aside ref={sidebarRef} style={{ width }} className="relative bg-slate-900/70 border-r border-slate-800">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">🎯 BullseyeDartsLeague</Link>
        <button onClick={() => setOpen(false)} className="btn-outline">✕</button>
      </div>
      <nav className="px-2 space-y-1">
        <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Home</Link>
        <Link href="/stats" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Statistics</Link>
        <Link href="/friends" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Friends List</Link>
        <Link href="/find-friends" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Find Friends</Link>
        <Link href="/online" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Online Mode</Link>
        <Link href="/offline" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Offline Modes</Link>
        <Link href="/subscription" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Subscription</Link>
        <Link href="/settings" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Settings</Link>
        <Link href="/admin" className="block px-3 py-2 rounded-lg hover:bg-slate-800">Admin</Link>
      </nav>
      <div
        className="resizer absolute top-0 right-0 h-full"
        onMouseDown={() => { dragging.current = true; }}
      />
    </aside>
  );
}
