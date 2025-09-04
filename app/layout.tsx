
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import type { ReactNode } from "react";

export const metadata = { title: "BullseyeDartsLeague", description: "Play online/offline darts with stats" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <TopBar />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
