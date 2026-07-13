import Image from "next/image";
import { Archive } from "./Archive";
import { gigs, posterArtifacts } from "./data";
import { PosterArchive } from "./PosterArchive";
import { SiteMotion } from "./SiteMotion";

const identityMarks = [
  { src: "/media/logo1.png", label: "DRIP STUDY", className: "identity-a" },
  { src: "/media/logo2.png", label: "DIAMOND SEAL", className: "identity-b" },
  { src: "/media/logo3.png", label: "CIRCUIT STUDY", className: "identity-c" },
  { src: "/media/logo6.png", label: "CREATURE TYPE", className: "identity-d" },
];

export default function Home() {
  const pastGigs = gigs.filter((gig) => gig.status !== "upcoming");
  const upcomingCount = gigs.length - pastGigs.length;

  return (
    <>
      <SiteMotion />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Deadset, back to top">
          <Image src="/media/logo5.png" width={44} height={44} sizes="44px" alt="" priority />
          <span>DEADSET</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#upcoming">Shows</a>
          <a href="#posters">Posters</a>
          <a href="#history">History</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main" data-motion-root>
        <section className="hero ink-section" id="top">
          <Image
            className="hero-mark"
            src="/media/logo7.png"
            width={1254}
            height={1254}
            sizes="(max-width: 680px) 132vw, min(73vw, 920px)"
            alt=""
          />
          <div className="hero-copy">
            <p className="kicker">MADISON, WISCONSIN · LIVE ARCHIVE 2025—NOW</p>
            <h1><span>IN THE</span><br />ROOM.</h1>
            <p className="hero-deck">
              Deadset in ink, noise, dates, and whatever survives the night.
            </p>
            <a className="text-link on-dark" href="#upcoming">Enter the record <span aria-hidden="true">↓</span></a>
          </div>

          <figure className="hero-photo-frame">
            <Image
              src="/media/band-photo.jpg"
              width={328}
              height={492}
              sizes="(max-width: 680px) 76vw, (max-width: 900px) 30vw, 390px"
              alt="Four members of Deadset gathered with a green electric guitar"
              priority
            />
            <figcaption><span>ARCHIVE IMAGE / 001</span><span>MADISON, WI</span></figcaption>
          </figure>

          <div className="hero-index" aria-hidden="true">
            <span>DS—001</span><span>SCROLL / PLAY IT LOUD</span>
          </div>
        </section>

        <aside className="signal-strip" aria-label="Deadset archive index">
          <span>DEADSET FIELD RECORD</span>
          <b>{String(posterArtifacts.length).padStart(2, "0")} POSTERS</b>
          <span>{pastGigs.length} PAST DATES</span>
          <b>{String(upcomingCount).padStart(2, "0")} UP NEXT</b>
        </aside>

        <section className="upcoming paper-section section-pad" id="upcoming">
          <div className="section-heading">
            <p className="micro-label">UP NEXT / CONFIRMED</p>
            <h2>ONE NIGHT<br />ON THE BOOKS.</h2>
          </div>

          <article className="show-ticket">
            <time className="ticket-date" dateTime="2026-08-06">
              <span>AUG</span><strong>06</strong><small>2026</small>
            </time>
            <div className="ticket-body">
              <p className="micro-label">HIGH NOON SALOON PATIO · MADISON, WI</p>
              <h3>SUMMER PATIO SERIES</h3>
              <div className="ticket-meta">
                <span>FREE</span><span>TWO-HOUR SET</span><span>THURSDAY</span>
              </div>
            </div>
            <Image className="ticket-stamp" src="/media/logo0.png" width={1254} height={1254} sizes="(max-width: 680px) 80vw, 34vw" alt="" />
          </article>

          <p className="source-note">Show details reproduced from the supplied Deadset records sheet.</p>
        </section>

        <section className="poster-section ink-section" id="posters" aria-labelledby="posters-heading">
          <div className="poster-stage">
            <div className="poster-wall-copy">
              <p className="micro-label">THE WALL / 09 SUPPLIED ARTIFACTS</p>
              <h2 id="posters-heading">PAPER<br />REMEMBERS.</h2>
              <p className="poster-deck">Artwork first. Dates and rooms follow. Open any print for the full view.</p>
            </div>
            <PosterArchive posters={posterArtifacts} />
            <div className="poster-exit-line" aria-hidden="true">
              <span>ARTWORK</span><i /><span>HISTORY</span>
            </div>
          </div>
        </section>

        <section className="archive-section section-pad" id="history">
          <div className="archive-intro">
            <div className="section-heading">
              <p className="micro-label">THE LEDGER / 15 PAST ENTRIES</p>
              <h2>WHERE WE<br />LEFT A MARK.</h2>
            </div>
            <div className="archive-note">
              <p>A working history of past dates, rooms, lineups, benefits, acoustic sets, and house shows.</p>
              <a className="text-link" href="/deadset-records.pdf" target="_blank" rel="noreferrer">View source record ↗</a>
            </div>
          </div>
          <div className="archive-rule" aria-hidden="true" />
          <Archive gigs={pastGigs} />
        </section>

        <section className="marks-section section-pad" id="marks">
          <div className="marks-head">
            <p className="micro-label">HAND-DRAWN SYSTEM / FOUR OF EIGHT MARKS</p>
            <h2>THE NAME<br />KEEPS MUTATING.</h2>
            <p>Four selected marks from an eight-piece supplied set. One identity, mutating through teeth, circuits, drips, frames, and ink.</p>
          </div>

          <div className="identity-field">
            <p className="swipe-hint" aria-hidden="true">SWIPE THE MARKS →</p>
            {identityMarks.map((mark, index) => (
              <figure className={`identity-mark ${mark.className}`} key={mark.src}>
                <Image src={mark.src} width={1254} height={1254} sizes="(max-width: 680px) 78vw, 39vw" alt={`Deadset hand-drawn logo study ${index + 1}`} />
                <figcaption><span>0{index + 1}</span><span>{mark.label}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="quiet-section section-pad" aria-labelledby="audio-heading">
          <Image src="/media/logo2.png" width={1254} height={1254} sizes="(max-width: 680px) 150px, 360px" alt="" />
          <div>
            <p className="micro-label">AUDIO / NOT YET CATALOGUED</p>
            <h2 id="audio-heading">THE RECORD SHELF IS WAITING.</h2>
            <p>No release or streaming link was included in the supplied archive. This space is intentionally held for confirmed music.</p>
          </div>
        </section>

        <section className="contact-section ink-section section-pad" id="contact">
          <Image className="contact-mark" src="/media/logo4.png" width={1254} height={1254} sizes="(max-width: 680px) 135vw, min(74vw, 1000px)" alt="" />
          <div className="contact-copy">
            <p className="micro-label">BOOKING / SHOW INFO / SAY HELLO</p>
            <h2>GET IN<br />THE ROOM.</h2>
            <div className="contact-links">
              <a href="mailto:deadsetbandwi@gmail.com">deadsetbandwi@gmail.com <span aria-hidden="true">↗</span></a>
              <a href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">@deadsetwi <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>DEADSET · MADISON, WI</span>
        <span>LIVE RECORD / 2025—2026</span>
      </footer>
    </>
  );
}
