"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MotionConditions = {
  desktop: boolean;
  mobile: boolean;
  reduce: boolean;
};

const DESKTOP_QUERY = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";
const MOBILE_QUERY = "(max-width: 900px) and (prefers-reduced-motion: no-preference)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export function SiteMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>("main[data-motion-root]");
    const header = document.querySelector<HTMLElement>("[data-hero-nav]");
    if (!root) return;

    document.documentElement.classList.add("motion-enhanced");
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    let heroHasEntered = window.scrollY > 40;

    const context = gsap.context(() => {
      const hero = root.querySelector<HTMLElement>(".hero");
      const heroPoster = root.querySelector<HTMLElement>(".hero-poster");
      const heroWordmark = root.querySelector<HTMLElement>(".hero-wordmark");
      const heroLetters = Array.from(root.querySelectorAll<HTMLElement>(".hero-letter"));
      const heroTagline = root.querySelector<HTMLElement>(".hero-tagline");
      const heroTaglineLines = Array.from(root.querySelectorAll<HTMLElement>(".hero-tagline > span"));
      const heroActions = root.querySelector<HTMLElement>(".hero-actions");
      const heroTears = Array.from(root.querySelectorAll<HTMLElement>(".hero-tear"));

      const history = root.querySelector<HTMLElement>("#history");
      const archiveRule = history?.querySelector<HTMLElement>(".archive-rule") ?? null;

      const clearMotionProps = (targets: gsap.TweenTarget) => {
        gsap.set(targets, {
          clearProps: "transform,opacity,visibility,willChange,clipPath",
        });
      };

      const syncHeader = () => {
        if (!hero || !header) return;
        const revealAt = hero.offsetTop + hero.offsetHeight - header.offsetHeight;
        header.classList.toggle("is-visible", window.scrollY >= revealAt);
      };

      if (hero && header) {
        ScrollTrigger.create({
          trigger: hero,
          start: () => `bottom top+=${header.offsetHeight}`,
          onEnter: () => header.classList.add("is-visible"),
          onLeaveBack: () => header.classList.remove("is-visible"),
          onRefresh: syncHeader,
          invalidateOnRefresh: true,
        });
        syncHeader();
      }

      const buildHeroArrival = (mobile: boolean, onReady: () => void) => {
        if (!heroWordmark || !heroLetters.length || !heroTaglineLines.length || !heroActions) return null;

        const animated = [heroWordmark, ...heroLetters, ...heroTaglineLines, heroActions, ...heroTears];
        gsap.set(animated, { willChange: "transform, opacity" });

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            clearMotionProps(animated);
            onReady();
          },
        });

        if (heroTears.length) {
          timeline.from(
            heroTears,
            {
              opacity: 0,
              y: (index) => index === 0 ? -14 : 12,
              scale: 1.035,
              duration: mobile ? .42 : .62,
              stagger: .05,
            },
            0,
          );
        }

        timeline.from(
          heroLetters,
          {
            y: mobile ? 20 : 34,
            rotation: (index) => index % 2 ? 2.2 : -2.2,
            opacity: 0,
            duration: mobile ? .46 : .66,
            stagger: mobile ? .025 : .04,
            ease: "expo.out",
          },
          mobile ? .08 : .12,
        );

        timeline.from(
          heroTaglineLines,
          {
            yPercent: 45,
            opacity: 0,
            duration: mobile ? .34 : .44,
            stagger: .06,
          },
          mobile ? .31 : .46,
        );

        timeline.from(
          heroActions,
          {
            y: 12,
            opacity: 0,
            duration: mobile ? .3 : .42,
            ease: "power2.out",
          },
          mobile ? .48 : .67,
        );

        return timeline;
      };

      const buildHeroParallax = (mobile: boolean) => {
        if (!hero || !heroWordmark || !heroPoster) return null;

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: mobile ? .35 : .55,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(heroWordmark, { yPercent: mobile ? -2.5 : -4.5, scale: .99, duration: 1 }, 0);
        if (heroTagline) timeline.to(heroTagline, { yPercent: mobile ? -1.5 : -3, duration: 1 }, 0);
        if (heroTears.length) {
          timeline.to(
            heroTears,
            { y: (index) => (index - 1) * (mobile ? 5 : 9), duration: 1 },
            0,
          );
        }

        return timeline;
      };

      const buildHistoryRule = () => {
        if (!history || !archiveRule) return null;

        return gsap.fromTo(
          archiveRule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.48,
            transformOrigin: "left center",
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: history,
              start: "top 78%",
              once: true,
            },
          },
        );
      };

      media.add(
        {
          desktop: DESKTOP_QUERY,
          mobile: MOBILE_QUERY,
          reduce: REDUCED_QUERY,
        },
        (mediaContext) => {
          const { desktop, mobile, reduce } = mediaContext.conditions as MotionConditions;

          if (reduce) {
            const staticTargets = [
              heroWordmark,
              ...heroLetters,
              ...heroTaglineLines,
              heroActions,
              ...heroTears,
            ].filter((element): element is HTMLElement => Boolean(element));

            clearMotionProps(staticTargets);
            if (archiveRule) gsap.set(archiveRule, { scaleX: 1 });
            heroHasEntered = true;
            syncHeader();
            return;
          }

          const startHeroMotion = (isMobile: boolean) => {
            if (!heroHasEntered) {
              heroHasEntered = true;
              buildHeroArrival(isMobile, () => {
                buildHeroParallax(isMobile);
                ScrollTrigger.refresh();
              });
            } else {
              buildHeroParallax(isMobile);
            }
          };

          if (desktop) {
            startHeroMotion(false);
            buildHistoryRule();
            return;
          }

          if (mobile) {
            startHeroMotion(true);
            buildHistoryRule();
          }
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
      header?.classList.remove("is-visible");
      document.documentElement.classList.remove("motion-enhanced");
    };
  }, []);

  return null;
}
