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
    if (!root) return;

    document.documentElement.classList.add("motion-enhanced");
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const heroCopy = root.querySelector<HTMLElement>(".hero-copy");
      const heroMark = root.querySelector<HTMLElement>(".hero-mark");
      const heroPhoto = root.querySelector<HTMLElement>(".hero-photo-frame");
      const heroIndex = root.querySelector<HTMLElement>(".hero-index");

      const posters = root.querySelector<HTMLElement>("#posters");
      const posterStage = posters?.querySelector<HTMLElement>(".poster-stage") ?? null;
      const posterCopy = posters?.querySelector<HTMLElement>(".poster-wall-copy") ?? null;
      const posterTrack = posters?.querySelector<HTMLElement>(".poster-track") ?? null;
      const posterCards = posterTrack
        ? Array.from(posterTrack.querySelectorAll<HTMLElement>(".poster-card"))
        : [];
      const posterExitLine = posters?.querySelector<HTMLElement>(".poster-exit-line") ?? null;
      const posterExitRule = posterExitLine?.querySelector<HTMLElement>("i") ?? posterExitLine;

      const history = root.querySelector<HTMLElement>("#history");
      const archiveRule = history?.querySelector<HTMLElement>(".archive-rule") ?? null;

      const clearMotionProps = (targets: gsap.TweenTarget) => {
        gsap.set(targets, {
          clearProps: "transform,opacity,visibility,willChange,clipPath",
        });
      };

      const buildHeroArrival = (mobile: boolean) => {
        if (!heroCopy) return null;

        const children = Array.from(heroCopy.children) as HTMLElement[];
        const kicker = heroCopy.querySelector<HTMLElement>(".kicker");
        const title = heroCopy.querySelector<HTMLElement>("h1");
        const details = children.filter((element) => element !== kicker && element !== title);
        const animated = [heroMark, heroPhoto, heroIndex, kicker, title, ...details].filter(
          (element): element is HTMLElement => Boolean(element),
        );

        gsap.set(animated, { willChange: "transform, opacity" });

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => clearMotionProps(animated),
        });

        timeline.addLabel("register", 0);

        if (heroMark) {
          timeline.from(
            heroMark,
            mobile
              ? { opacity: 0, duration: 0.42, ease: "power2.out" }
              : {
                  opacity: 0,
                  rotation: -2.2,
                  scale: 1.045,
                  duration: 0.78,
                  ease: "expo.out",
                },
            "register",
          );
        }

        timeline.addLabel("strike", mobile ? 0.04 : 0.12);
        if (title) {
          timeline.from(
            title,
            {
              y: mobile ? 18 : 32,
              rotation: mobile ? 0 : 0.65,
              opacity: 0,
              duration: mobile ? 0.42 : 0.62,
              ease: "expo.out",
            },
            "strike",
          );
        }

        timeline.addLabel("paste", mobile ? 0.12 : 0.28);
        if (heroPhoto) {
          timeline.from(
            heroPhoto,
            mobile
              ? {
                  x: 12,
                  y: 10,
                  opacity: 0,
                  duration: 0.46,
                  ease: "power3.out",
                }
              : {
                  x: 44,
                  y: 20,
                  rotation: 5.2,
                  scale: 0.97,
                  opacity: 0,
                  duration: 0.72,
                  ease: "power4.out",
                },
            "paste",
          );
        }

        timeline.addLabel("details", mobile ? 0.2 : 0.45);
        const copyDetails = [kicker, ...details].filter(
          (element): element is HTMLElement => Boolean(element),
        );
        if (copyDetails.length) {
          timeline.from(
            copyDetails,
            {
              y: mobile ? 7 : 10,
              opacity: 0,
              duration: mobile ? 0.26 : 0.34,
              stagger: mobile ? 0.035 : 0.055,
              ease: "power2.out",
            },
            "details",
          );
        }

        timeline.addLabel("resolve", mobile ? 0.38 : 0.68);
        if (heroIndex) {
          timeline.from(
            heroIndex,
            { opacity: 0, duration: mobile ? 0.18 : 0.24, ease: "power1.out" },
            "resolve",
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
              heroMark,
              heroPhoto,
              heroIndex,
              ...(heroCopy ? (Array.from(heroCopy.children) as HTMLElement[]) : []),
              posterCopy,
              posterTrack,
              ...posterCards,
            ].filter((element): element is HTMLElement => Boolean(element));

            clearMotionProps(staticTargets);
            if (posterExitLine) gsap.set(posterExitLine, { opacity: 1 });
            if (posterExitRule) gsap.set(posterExitRule, { scaleX: 1 });
            if (archiveRule) gsap.set(archiveRule, { scaleX: 1 });
            return;
          }

          if (desktop) {
            buildHeroArrival(false);
            buildHistoryRule();

            if (!posterStage || !posterTrack || !posterCards.length) return;

            const cardX = [-46, 38, -30, 52, -36, 44, -42, 34];
            const cardY = [34, 22, 42, 18, 38, 26, 32, 20];
            const cardRotation = [-7, 6, -4, 8, -6, 5, -5, 7];
            const horizontalTravel = () =>
              Math.max(0, posterTrack.scrollWidth - posterStage.clientWidth);
            const scrollDistance = () =>
              Math.min(2200, Math.max(1800, Math.round(horizontalTravel() + 1200)));

            const posterTimeline = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: posterStage,
                start: "top top",
                end: () => `+=${scrollDistance()}`,
                pin: posterStage,
                pinSpacing: true,
                scrub: 0.85,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            posterTimeline.addLabel("briefing", 0);
            if (posterCopy) {
              posterTimeline.from(
                posterCopy.children.length ? Array.from(posterCopy.children) : posterCopy,
                {
                  y: 18,
                  opacity: 0,
                  duration: 0.46,
                  stagger: 0.06,
                  ease: "power2.out",
                },
                "briefing",
              );
            }

            posterTimeline.addLabel("paste", 0.24);
            posterTimeline.from(
              posterCards,
              {
                x: (index) => cardX[index % cardX.length],
                y: (index) => cardY[index % cardY.length],
                rotation: (index) => cardRotation[index % cardRotation.length],
                scale: 1.06,
                opacity: 0,
                transformOrigin: "50% 12%",
                duration: 0.72,
                stagger: 0.13,
                ease: "power4.out",
              },
              "paste",
            );

            posterTimeline.addLabel("travel", 1.12);
            posterTimeline.to(
              posterTrack,
              {
                scrollLeft: () => horizontalTravel(),
                duration: 2.5,
                ease: "none",
              },
              "travel",
            );

            posterTimeline.addLabel("resolve", 3.28);
            if (posterExitLine) {
              posterTimeline.from(
                posterExitLine,
                {
                  y: 8,
                  opacity: 0,
                  duration: 0.34,
                  ease: "power2.out",
                },
                "resolve",
              );
            }
            if (posterExitRule) {
              posterTimeline.fromTo(
                posterExitRule,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  transformOrigin: "left center",
                  duration: 0.62,
                  ease: "power3.inOut",
                },
                "resolve",
              );
            }

            return;
          }

          if (mobile) {
            buildHeroArrival(true);
            buildHistoryRule();
          }
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
      document.documentElement.classList.remove("motion-enhanced");
    };
  }, []);

  return null;
}
