# Deadset refinement log

## 2026-07-12

- **Weaknesses identified:** the supplied workspace had no website source or prior log; the useful material was fragmented across eight opaque-background logo studies, one archive photo, and a two-page show ledger. Missing music, venue, and biography details made factual invention a primary risk.
- **Priorities selected:** establish a distinctive gig-document hero; turn the logos into a disciplined identity system; make the show history a usable editorial ledger; give mobile its own ticket, archive, and horizontal mark interactions; keep motion readable and reversible.
- **Completed:** built the one-page Next.js experience; extracted and integrated the supplied band photo; added the confirmed August 6 show; structured all 16 supplied gig records with uncertainty labels; added year filtering, source PDF access, booking links, responsive layouts, reduced-motion behavior, GSAP cleanup, and a bespoke social preview.
- **Reviewer feedback incorporated:** kept dynamic archive rows out of the global reveal timeline and refresh ScrollTrigger after filtering; added accurate responsive image hints; enlarged mobile navigation touch targets; added a visible mobile swipe cue.
- **Intentionally preserved:** all supplied logos and factual record wording; unknown June venues remain visibly unconfirmed; no releases, genre, members, press, or achievements were invented; the supplied phone number was not published.
- **Validation:** inspected desktop and 390px mobile renders; tested the archive filter and live count; checked keyboard semantics/focus styling, responsive overflow, console state, GSAP context cleanup, and a production Next.js build.
- **Next opportunity:** replace the deliberately empty audio shelf with confirmed release/streaming data and add real poster or live-photo assets when supplied.

## 2026-07-12 — refinement pass 2

- **Agents used:** Lead Creative Engineer; Creative Director / Visual Systems; GSAP Motion Director; Experience / Content Architecture; Frontend / Accessibility / Performance; and a separate Independent Final Reviewer.
- **Main weaknesses found:** nine supplied posters were absent; poster culture and gig history were conflated; motion was a field of repeated reveals; mobile headings/navigation clipped; the future August show was framed inside past history; the marks/audio chapters created excess vertical drag.
- **Priorities selected:** make posters a distinct visual archive; author one poster-wall-to-ledger GSAP sequence; separate upcoming from past records; repair mobile/reduced-motion behavior; and make poster browsing keyboard- and touch-complete.
- **Workstream ownership:** motion agent owned `SiteMotion.tsx`; experience agent built `PosterArchive.tsx`; the lead integrated structured content, page architecture, typography, responsive CSS, accessibility corrections, browser QA, and reviewer changes.
- **Major changes completed:** added all nine poster artifacts and an accessible enlarged viewer; added self-hosted Roboto Condensed / Newsreader typography; replaced generic reveals with labeled hero and poster timelines; made desktop poster travel use a real focus-aware scroller; added a no-pin mobile poster strip; split 15 past dates from the one upcoming show; tightened marks/music pacing; strengthened focus rings and modal scroll lock.
- **Intentionally preserved:** the hero/ticket/ledger foundation, all supplied factual wording and uncertainty flags, all original marks, the source PDF, the honest empty music state, booking email, and Instagram link.
- **Independent review incorporated:** the ARTWORK → HISTORY promise is now functional—matching posters expose a ledger action that closes the dialog, restores the correct year filter, moves focus to the exact record, and highlights it. The redundant mobile poster fade and inert reveal hooks were removed; the desktop mark field was shortened.
- **Validation performed:** production build, TypeScript, ESLint, console review, 1440/930/880/390/320 responsive checks, desktop pin travel and reverse scroll, 900px breakpoint cleanup, horizontal mobile poster browsing, archive filtering, dialog open/close/Escape/focus return/scroll lock, and poster-to-ledger focus handoff. No horizontal document overflow or console warnings were observed.
- **Remaining high-value opportunities:** add confirmed music/release links; replace the single posed archive image with real live photography; store native poster aspect ratios; crop transparent logo derivatives; and shorten the desktop pin further if audience testing finds it too deliberate.
- **Limitations:** no confirmed member biography, release catalog, live-photo set, poster credits, or year for artifact 09 was supplied, so none was invented.
