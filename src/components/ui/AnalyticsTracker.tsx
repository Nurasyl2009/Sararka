"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if pathname is available and we're in a browser
    if (!pathname) return;

    // Optional: filter out admin or api routes if you don't want to track them
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    const trackVisit = async () => {
      try {
        await fetch("/api/analytics/visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: pathname }),
        });
      } catch (error) {
        console.error("Failed to track visit:", error);
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
