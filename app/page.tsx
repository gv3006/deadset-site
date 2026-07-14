import Image from "next/image";
import { Archive } from "./Archive";
import { gigs, posters } from "./data";
import { SiteMotion } from "./SiteMotion";

export default function Home() {
  const upcoming = gigs.filter((gig) => gig.upcoming);
  const pastGigs = gigs.filter((gig) => !gig.upcoming);

  return (
    <>
      <SiteMotion />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header" data-hero-nav>
        <a className="brand-lockup" href="#top" aria-label="Deadset, back to top">
          <Image src="/media/logo7-white.png" width={44} height={44} sizes="44px" alt="" priority />
          <span>DEADSET</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#shows">Shows</a>
          <a href="#history">History</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main" data-motion-root>
        <section className="hero ink-section" id="top" aria-labelledby="hero-title">
          <div className="hero-paper" aria-hidden="true">
            <span className="hero-fold-line" />
            <span className="hero-tear hero-tear-top-right" />
            <span className="hero-tear hero-tear-left" />
            <span className="hero-tear hero-tear-bottom-left" />
          </div>
          <div className="hero-poster">
            <h1 className="hero-wordmark" id="hero-title" aria-label="Deadset">
              <Image
                className="hero-logo"
                src="/media/logo7-white.png"
                width={1254}
                height={1254}
                sizes="(max-width: 680px) 80vw, (max-width: 900px) 54vw, 34vw"
                alt=""
                priority
              />
              <span className="hero-logo-glitch hero-logo-glitch-red" aria-hidden="true" />
              <span className="hero-logo-glitch hero-logo-glitch-acid" aria-hidden="true" />
              <span className="hero-logo-scan" aria-hidden="true" />
            </h1>
            <p className="hero-tagline">
              <span>Indie Rock</span>
              <span>From Madison, WI</span>
            </p>
            <div className="hero-actions" aria-label="Featured links">
              <a className="hero-link" href="#shows">Upcoming shows</a>
              <span className="hero-star" aria-hidden="true" />
              <a className="hero-link hero-link-instagram" href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">
                <span className="instagram-mark" aria-hidden="true" />
                <span>@deadsetwi</span>
              </a>
            </div>
          </div>
        </section>

        <aside className="signal-strip" aria-label="Deadset at a glance">
          <span>Madison, WI</span><b>Indie rock / rock</b><span aria-hidden="true" /> <b>New music in the works</b>
        </aside>

        <section className="about-section paper-section section-pad" id="about">
          <div className="about-copy">
            <p className="micro-label">About Deadset</p>
            <h2>Built for the<br />live room.</h2>
            <p>We can say anything we want here.</p>
            <p>For instance I can say that Louis sucks and George is the coolest guy.</p>
            {/* TODO: Replace with official Deadset biography when available. */}
          </div>
          <figure className="about-photo">
            <Image src="/media/atmosphere/drummer-candid.jpg" width={2048} height={1536} sizes="(max-width: 900px) 88vw, 38vw" alt="Deadset drummer holding a cymbal backstage" />
          </figure>

          <div className="about-members" aria-labelledby="members-heading">
            <div className="members-heading">
              <p className="micro-label">The lineup</p>
              <h3 id="members-heading">Meet our members.</h3>
            </div>
            <div className="member-grid">
              <figure className="member-photo">
                <Image src="/media/members/bass.jpg" width={1536} height={2048} sizes="(max-width: 680px) 44vw, (max-width: 900px) 42vw, 22vw" alt="Deadset bassist performing under pink and purple stage lights" />
                <figcaption>Camory Repenshek</figcaption>
              </figure>
              <figure className="member-photo">
                <Image src="/media/members/vocals-guitar.jpg" width={1170} height={780} sizes="(max-width: 680px) 44vw, (max-width: 900px) 42vw, 22vw" alt="Deadset vocalist and guitarist performing with an acoustic guitar" />
                <figcaption>Matt Lemes</figcaption>
              </figure>
              <figure className="member-photo">
                <Image src="/media/members/drums.jpg" width={1170} height={780} sizes="(max-width: 680px) 44vw, (max-width: 900px) 42vw, 22vw" alt="Deadset drummer performing in black and white" />
                <figcaption>George Verdelis</figcaption>
              </figure>
              <figure className="member-photo">
                <Image src="/media/members/guitar.jpg" width={2304} height={1536} sizes="(max-width: 680px) 44vw, (max-width: 900px) 42vw, 22vw" alt="Deadset guitarist performing onstage" />
                <figcaption>Louie Thares</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="upcoming paper-section section-pad" id="shows">
          <div className="section-atmosphere shows-atmosphere" aria-hidden="true">
            <Image
              src="/media/atmosphere/birds-nest-marquee.jpg"
              alt=""
              fill
              sizes="(max-width: 680px) 105vw, (max-width: 900px) 90vw, 68vw"
            />
          </div>
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
              <figure className="ticket-photo">
                <Image src="/media/live/full-band-stage.jpg" width={2048} height={1536} sizes="(max-width: 680px) 92vw, (max-width: 900px) 88vw, 31vw" alt="Deadset performing together onstage under red and purple lights" />
              </figure>
              <Image className="ticket-stamp" src="/media/logo0.png" width={1254} height={1254} sizes="(max-width: 680px) 80vw, 34vw" alt="" />
            </article>
          )) : <p className="next-dates">New dates coming soon. Follow <a href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">@deadsetwi</a> for announcements.</p>}
          <p className="show-follow">More dates are coming. Follow <a href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">@deadsetwi</a> for announcements.</p>
        </section>

        <section className="archive-section section-pad" id="history">
          <div className="archive-intro">
            <div className="section-heading"><p className="micro-label">Past shows</p><h2>Where we&apos;ve<br />played.</h2></div>
          </div>
          <div className="archive-rule" aria-hidden="true" />
          <Archive gigs={pastGigs} posters={posters} />
        </section>

        <section className="quiet-section section-pad" aria-labelledby="music-heading">
          <div className="section-atmosphere music-atmosphere" aria-hidden="true">
            <Image
              src="/media/atmosphere/acoustic-red.jpg"
              alt=""
              fill
              sizes="100vw"
            />
          </div>
          <Image src="/media/logo1.png" width={1254} height={1254} sizes="(max-width: 680px) 150px, 360px" alt="" />
          <div><p className="micro-label">Music</p><h2 id="music-heading">New music is in the works.</h2><p>Deadset is recording now. Follow along for updates and listen links when they land.</p>{/* TODO: Add official streaming and release links when available. */}</div>
        </section>

        <section className="contact-section ink-section section-pad" id="contact">
          <Image className="contact-mark" src="/media/logo7-white.png" width={1254} height={1254} sizes="(max-width: 680px) 135vw, min(74vw, 1000px)" alt="" />
          <div className="contact-copy"><p className="micro-label">Booking / shows / other inquiries</p><h2>Book<br />Deadset.</h2><p className="contact-intro">For booking, shows, or anything else, get in touch.</p><div className="contact-links"><a href="mailto:deadsetbandwi@gmail.com">deadsetbandwi@gmail.com <span aria-hidden="true">↗</span></a><a href="https://www.instagram.com/deadsetwi/" target="_blank" rel="noreferrer">@deadsetwi <span aria-hidden="true">↗</span></a></div></div>
        </section>
      </main>
      <footer><span>DEADSET · MADISON, WI</span><span>INDIE ROCK / ROCK</span></footer>
    </>
  );
}
