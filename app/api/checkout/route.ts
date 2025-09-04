
import { NextResponse } from "next/server";

export async function GET() {
  // In dev we just mock-redirect to /subscription.
  // Wire up Stripe here for real Checkout.
  return NextResponse.redirect(new URL("/subscription", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}
