"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { PosterArtifact } from "./data";

export function PosterArchive({ posters }: { posters: PosterArtifact[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openerIndexRef = useRef<number | null>(null);
  const ledgerTargetRef = useRef<string | null>(null);
  const directBackdropPressRef = useRef(false);
  const idPrefix = useId().replace(/:/g, "");

  const activePoster = activeIndex === null ? null : posters[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!activePoster || !dialog) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeDialog();
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
    if (activeIndex !== null && !posters[activeIndex]) {
      dialogRef.current?.close();
    }
  }, [activeIndex, posters]);

  function openPoster(index: number) {
    openerIndexRef.current = index;
    setActiveIndex(index);
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    const openerIndex = openerIndexRef.current;
    const ledgerTarget = ledgerTargetRef.current;
    ledgerTargetRef.current = null;
    setActiveIndex(null);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (ledgerTarget) {
          const target = document.getElementById(ledgerTarget);
          if (!target) return;

          window.location.hash = ledgerTarget;
          target.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "center",
          });
          target.focus({ preventScroll: true });
          return;
        }

        if (openerIndex !== null) openerRefs.current[openerIndex]?.focus();
      });
    });
  }

  function openLedgerEntry(targetId: string) {
    window.dispatchEvent(new CustomEvent("deadset:show-gig", { detail: { targetId } }));
    ledgerTargetRef.current = targetId;
    closeDialog();
  }

  function showPoster(index: number) {
    if (posters[index]) setActiveIndex(index);
  }

  return (
    <>
      <ol className="poster-track">
        {posters.map((poster, index) => {
          const labelId = `${idPrefix}-poster-${index}-label`;
          const noteId = `${idPrefix}-poster-${index}-note`;

          return (
            <li key={poster.id}>
              <button
                ref={(element) => {
                  openerRefs.current[index] = element;
                }}
                className="poster-card"
                type="button"
                aria-label={`Open ${poster.label}`}
                aria-describedby={noteId}
                onClick={() => openPoster(index)}
              >
                <span
                  className="poster-print"
                  style={{ position: "relative", display: "block", width: "100%", aspectRatio: "4 / 5" }}
                >
                  <Image
                    src={poster.src}
                    alt={poster.alt}
                    fill
                    sizes="(max-width: 680px) 78vw, (max-width: 1100px) 44vw, 31vw"
                    loading="lazy"
                    style={{ objectFit: "contain" }}
                  />
                </span>
              </button>
              <div className="poster-caption">
                <p id={labelId}>{poster.label}</p>
                <p id={noteId}>{poster.note}</p>
              </div>
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
          if (directBackdropPressRef.current && event.target === event.currentTarget) closeDialog();
          directBackdropPressRef.current = false;
        }}
      >
        {activePoster && activeIndex !== null && (
          <div className="poster-dialog-panel">
            <button
              ref={closeButtonRef}
              className="poster-dialog-close"
              type="button"
              onClick={closeDialog}
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
              {activePoster.linkedGigId && (
                <button
                  className="poster-dialog-history"
                  type="button"
                  onClick={() => openLedgerEntry(activePoster.linkedGigId!)}
                >
                  View matching ledger entry
                </button>
              )}
            </div>

            <div className="poster-dialog-controls" role="group" aria-label="Poster archive navigation">
              <button
                type="button"
                disabled={activeIndex === 0}
                aria-label={
                  activeIndex > 0
                    ? `View previous poster: ${posters[activeIndex - 1].label}`
                    : "No previous poster"
                }
                onClick={() => showPoster(activeIndex - 1)}
              >
                Previous
              </button>
              <p aria-live="polite">
                {activeIndex + 1} of {posters.length}
              </p>
              <button
                type="button"
                disabled={activeIndex === posters.length - 1}
                aria-label={
                  activeIndex < posters.length - 1
                    ? `View next poster: ${posters[activeIndex + 1].label}`
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
    </>
  );
}
