"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Gig } from "./data";

const filters = ["ALL", "2026", "2025"] as const;

export function Archive({ gigs }: { gigs: Gig[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const shown = useMemo(
    () => (filter === "ALL" ? gigs : gigs.filter((gig) => gig.year === filter)),
    [filter, gigs],
  );

  useEffect(() => {
    const showLinkedGig = (event: Event) => {
      const targetId = (event as CustomEvent<{ targetId?: string }>).detail?.targetId;
      if (!targetId) return;

      if (targetId.startsWith("gig-2025-")) setFilter("2025");
      if (targetId.startsWith("gig-2026-")) setFilter("2026");
    };

    window.addEventListener("deadset:show-gig", showLinkedGig);
    return () => window.removeEventListener("deadset:show-gig", showLinkedGig);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [filter]);

  return (
    <div className="archive-shell">
      <fieldset className="archive-controls">
        <legend className="micro-label">Index by year</legend>
        <div className="filter-set">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className="filter-button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} past shows.
      </p>

      <ol className="gig-list">
        {shown.map((gig) => (
          <li
            className="gig-row"
            id={`gig-${gig.year}-${gig.shortDate.replace(".", "-")}`}
            key={`${gig.date}-${gig.venue}`}
            tabIndex={-1}
          >
            <time className="gig-date" dateTime={`${gig.year}-${gig.shortDate.replace(".", "-")}`}>
              <span>{gig.shortDate}</span>
              <small>{gig.year}</small>
            </time>
            <div className="gig-core">
              <h3>{gig.venue}</h3>
              <span className="sr-only">{gig.date}</span>
            </div>
            <div className="gig-context">
              {gig.with && <p><b>WITH</b> {gig.with}</p>}
              {gig.note && <p><b>NOTE</b> {gig.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
