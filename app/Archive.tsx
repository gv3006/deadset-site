"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Gig, Poster } from "./data";

const filters = ["ALL", "2026", "2025"] as const;

export function Archive({ gigs, posters }: { gigs: Gig[]; posters: Poster[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openerIndexRef = useRef<number | null>(null);
  const directBackdropPressRef = useRef(false);
  const idPrefix = useId().replace(/:/g, "");

  const shown = useMemo(
    () => (filter === "ALL" ? gigs : gigs.filter((gig) => gig.year === filter)),
    [filter, gigs],
  );
  const orderedPosters = useMemo(
    () => gigs.flatMap((gig) => {
      const gigId = `gig-${gig.year}-${gig.shortDate.replace(".", "-")}`;
      const poster = posters.find((item) => item.linkedGigId === gigId);
      return poster ? [poster] : [];
    }),
    [gigs, posters],
  );
  const postersByGig = useMemo(
    () => new Map(orderedPosters.flatMap((poster, index) => (
      poster.linkedGigId ? [[poster.linkedGigId, { poster, index }] as const] : []
    ))),
    [orderedPosters],
  );
  const activePoster = activeIndex === null ? null : orderedPosters[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activePoster || !dialog) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      dialog.close();
    };
    document.addEventListener("keydown", handleEscape, true);

    if (!dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape, true);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [activePoster]);

  useEffect(() => {
    if (activeIndex !== null && !orderedPosters[activeIndex]) {
      dialogRef.current?.close();
    }
  }, [activeIndex, orderedPosters]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [filter]);

  function openPoster(index: number) {
    openerIndexRef.current = index;
    setActiveIndex(index);
  }

  function handleDialogClose() {
    const openerIndex = openerIndexRef.current;
    setActiveIndex(null);

    window.requestAnimationFrame(() => {
      openerRefs.current[openerIndex ?? -1]?.focus();
    });
  }

  function showPoster(index: number) {
    if (orderedPosters[index]) setActiveIndex(index);
  }

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
        {shown.map((gig) => {
          const gigId = `gig-${gig.year}-${gig.shortDate.replace(".", "-")}`;
          const linkedPoster = postersByGig.get(gigId);

          return (
            <li
              className={`gig-row${linkedPoster ? " has-poster" : ""}`}
              id={gigId}
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
              {linkedPoster && (
                <button
                  ref={(element) => {
                    openerRefs.current[linkedPoster.index] = element;
                  }}
                  className="gig-poster-card"
                  type="button"
                  aria-label={`Open poster for ${gig.date} at ${gig.venue}`}
                  onClick={() => openPoster(linkedPoster.index)}
                >
                  <span className="gig-poster-print">
                    <Image
                      src={linkedPoster.poster.src}
                      alt=""
                      fill
                      sizes="(max-width: 680px) 84px, 140px"
                      loading="lazy"
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                  <span className="gig-poster-label">View flyer</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>

      <dialog
        ref={dialogRef}
        className="poster-dialog"
        aria-labelledby={activePoster ? `${idPrefix}-dialog-label` : undefined}
        aria-describedby={activePoster ? `${idPrefix}-dialog-note` : undefined}
        onClose={handleDialogClose}
        onPointerDown={(event) => {
          directBackdropPressRef.current = event.target === event.currentTarget;
        }}
        onClick={(event) => {
          if (directBackdropPressRef.current && event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
          directBackdropPressRef.current = false;
        }}
      >
        {activePoster && activeIndex !== null && (
          <div className="poster-dialog-panel">
            <button
              ref={closeButtonRef}
              className="poster-dialog-close"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>

            <div
              className="poster-dialog-print"
              style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}
            >
              <Image
                src={activePoster.src}
                alt={activePoster.alt}
                fill
                sizes="(max-width: 680px) 92vw, min(76vw, 900px)"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div className="poster-dialog-copy">
              <h2 id={`${idPrefix}-dialog-label`}>{activePoster.label}</h2>
              <p id={`${idPrefix}-dialog-note`}>{activePoster.note}</p>
            </div>

            <div className="poster-dialog-controls" role="group" aria-label="Poster archive navigation">
              <button
                type="button"
                disabled={activeIndex === 0}
                aria-label={
                  activeIndex > 0
                    ? `View previous poster: ${orderedPosters[activeIndex - 1].label}`
                    : "No previous poster"
                }
                onClick={() => showPoster(activeIndex - 1)}
              >
                Previous
              </button>
              <p aria-live="polite">
                {activeIndex + 1} of {orderedPosters.length}
              </p>
              <button
                type="button"
                disabled={activeIndex === orderedPosters.length - 1}
                aria-label={
                  activeIndex < orderedPosters.length - 1
                    ? `View next poster: ${orderedPosters[activeIndex + 1].label}`
                    : "No next poster"
                }
                onClick={() => showPoster(activeIndex + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
