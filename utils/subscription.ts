
// Local-only mock subscription/trial logic.
// Replace with real Stripe customer/subscription checks on your backend.
type SubState = { premium: boolean; trialEnd?: number };

const KEY = "bdl_subscription";

function read(): SubState {
  if (typeof window === "undefined") return { premium: false };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { premium: false };
  try { return JSON.parse(raw) as SubState; } catch { return { premium: false }; }
}

function write(state: SubState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function isPremiumActive(): boolean {
  const s = read();
  if (s.premium) return true;
  if (s.trialEnd && Date.now() < s.trialEnd) return true;
  return false;
}

export function startTrial(days=3) {
  const end = Date.now() + days*24*60*60*1000;
  const s = read();
  s.trialEnd = end;
  write(s);
}

export function trialDaysRemaining(): number {
  const s = read();
  if (!s.trialEnd) return 0;
  const diff = s.trialEnd - Date.now();
  return Math.max(0, Math.ceil(diff / (24*60*60*1000)));
}

export function activatePremium() {
  const s = read();
  s.premium = true; write(s);
}

export function deactivatePremium() {
  write({ premium: false });
}
