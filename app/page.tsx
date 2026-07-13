import Image from "next/image";
import { Archive } from "./Archive";
import { gigs, posters } from "./data";
import { PosterArchive } from "./PosterArchive";
import { SiteMotion } from "./SiteMotion";

export default function Home() {
  const upcoming = gigs.filter((gig) => gig.upcoming);
  const pastGigs = gigs.filter((gig) => !gig.upcoming);

  return (
    <>
      <SiteMotion />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Deadset, back to top">
          <Image src="/media/logo7.png" width={44} height={44} sizes="44px" alt="" priority />
          <span>DEADSET</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#shows">Shows</a>
          <a href="#photos">Live</a>
          <a href="#posters">Posters</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main" data-motion-root>
        <section className="hero ink-section" id="top">
          <Image className="hero-mark" src="/media/logo7.png" width={1254} height={1254} sizes="(max-width: 680px) 132vw, min(73vw, 920px)" alt="" />
          <div className="hero-copy">
            <p className="kicker">Indie rock / rock · Madison, Wisconsin</p>
            <h1>DEAD<br />SET.</h1>
            <p className="hero-deck">Loud guitars, live rooms, and more on the way.</p>
            <div className="hero-actions">
              <a className="text-link on-dark" href="#shows">Upcoming shows <span aria-hidden="true">↓</span></a>
              <a className="text-link on-dark" href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">Follow on Instagram <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <figure className="hero-photo-frame">
            <Image src="/media/live/hero-live.jpg" width={1536} height={2048} sizes="(max-width: 680px) 76vw, (max-width: 900px) 30vw, 390px" alt="Deadset performing live onstage under purple lights" priority />
            <figcaption><span>LIVE IN MADISON</span><span>2026</span></figcaption>
          </figure>
          <div className="hero-index" aria-hidden="true"><span>DEADSET / MADISON, WI</span><span>SCROLL FOR SHOWS</span></div>
        </section>

        <aside className="signal-strip" aria-label="Deadset at a glance">
          <span>Madison, WI</span><b>Indie rock / rock</b><span>{pastGigs.length} shows and counting</span><b>New music in the works</b>
        </aside>

        <section className="about-section paper-section section-pad" id="about">
          <div className="about-copy">
            <p className="micro-label">About Deadset</p>
            <h2>Built for the<br />live room.</h2>
            <p>Deadset is an indie rock band based in Madison, Wisconsin, playing shows throughout the local scene.</p>
            <p>Catch the next set, dig into the flyers, and keep an ear out—we&apos;re recording new music now.</p>
            {/* TODO: Replace with official Deadset biography when available. */}
          </div>
          <figure className="about-photo">
            <Image src="/media/live/full-band-stage.jpg" width={2048} height={1536} sizes="(max-width: 800px) 92vw, 46vw" alt="All four members of Deadset performing together onstage" />
          </figure>
        </section>

        <section className="upcoming paper-section section-pad" id="shows">
          <div className="section-heading">
            <p className="micro-label">Upcoming shows</p>
            <h2>See you<br />out there.</h2>
          </div>
          {upcoming.length ? upcoming.map((gig) => (
            <article className="show-ticket" key={`${gig.date}-${gig.venue}`}>
              <time className="ticket-date" dateTime={`${gig.year}-${gig.shortDate.replace(".", "-")}`}><span>AUG</span><strong>06</strong><small>2026</small></time>
              <div className="ticket-body">
                <p className="micro-label">{gig.venue} · Madison, WI</p>
                <h3>Summer patio<br />series</h3>
                <div className="ticket-meta"><span>Free</span><span>Two-hour set</span><span>Thursday</span></div>
              </div>
              <Image className="ticket-stamp" src="/media/logo0.png" width={1254} height={1254} sizes="(max-width: 680px) 80vw, 34vw" alt="" />
            </article>
          )) : <p className="next-dates">New dates coming soon. Follow <a href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">@deadsetwi</a> for announcements.</p>}
          <p className="show-follow">More dates are coming. Follow <a href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">@deadsetwi</a> for announcements.</p>
        </section>

        <section className="live-section ink-section section-pad" id="photos" aria-labelledby="live-heading">
          <div className="live-heading"><p className="micro-label">Live photos</p><h2 id="live-heading">The set<br />in motion.</h2></div>
          <div className="live-grid">
            <figure className="live-wide"><Image src="/media/live/live-wide.jpg" width={2048} height={1536} sizes="(max-width: 800px) 92vw, 62vw" alt="Deadset performing together under purple stage lighting" /></figure>
            <figure className="live-tall"><Image src="/media/live/bass-closeup.jpg" width={1536} height={2048} sizes="(max-width: 800px) 60vw, 28vw" alt="Deadset bassist performing under red and purple lights" /></figure>
            <figure className="live-detail"><Image src="/media/live/bass-stage.jpg" width={1536} height={2048} sizes="(max-width: 800px) 60vw, 28vw" alt="Deadset bassist onstage with the drummer behind her" /></figure>
          </div>
        </section>

        <section className="poster-section ink-section" id="posters" aria-labelledby="posters-heading">
          <div className="poster-stage">
            <div className="poster-wall-copy">
              <p className="micro-label">Show posters</p>
              <h2 id="posters-heading">Flyers from<br />the floor.</h2>
              <p className="poster-deck">A run of Deadset shows around Madison. Open a flyer for the full view and show details.</p>
            </div>
            <PosterArchive posters={posters} />
            <div className="poster-exit-line" aria-hidden="true"><span>PAST SHOWS</span><i /><span>MADISON, WI</span></div>
          </div>
        </section>

        <section className="archive-section section-pad" id="history">
          <div className="archive-intro">
            <div className="section-heading"><p className="micro-label">Past shows</p><h2>Where we&apos;ve<br />played.</h2></div>
            <div className="archive-note"><p>Past bills, benefits, acoustic sets, and house shows from Deadset&apos;s run around Madison.</p></div>
          </div>
          <div className="archive-rule" aria-hidden="true" />
          <Archive gigs={pastGigs} />
        </section>

        <section className="quiet-section section-pad" aria-labelledby="music-heading">
          <Image src="/media/logo1.png" width={1254} height={1254} sizes="(max-width: 680px) 150px, 360px" alt="" />
          <div><p className="micro-label">Music</p><h2 id="music-heading">New music is in the works.</h2><p>Deadset is recording now. Follow along for updates and listen links when they land.</p>{/* TODO: Add official streaming and release links when available. */}</div>
        </section>

        <section className="contact-section ink-section section-pad" id="contact">
          <Image className="contact-mark" src="/media/logo7.png" width={1254} height={1254} sizes="(max-width: 680px) 135vw, min(74vw, 1000px)" alt="" />
          <div className="contact-copy"><p className="micro-label">Booking / shows / other inquiries</p><h2>Book<br />Deadset.</h2><p className="contact-intro">For booking, shows, or anything else, get in touch.</p><div className="contact-links"><a href="mailto:deadsetbandwi@gmail.com">deadsetbandwi@gmail.com <span aria-hidden="true">↗</span></a><a href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">@deadsetwi <span aria-hidden="true">↗</span></a></div></div>
        </section>
      </main>
      <footer><span>DEADSET · MADISON, WI</span><span>INDIE ROCK / ROCK</span></footer>
    </>
  );
}
