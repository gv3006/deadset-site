export type Gig = {
  date: string;
  shortDate: string;
  year: "2026" | "2025";
  status?: "upcoming" | "past";
  venue: string;
  with?: string;
  note?: string;
  uncertain?: boolean;
};

export type PosterArtifact = {
  id: string;
  src: string;
  alt: string;
  label: string;
  note: string;
  linkedGigId?: string;
};

export const posterArtifacts: PosterArtifact[] = [
  {
    id: "artifact-01",
    src: "/media/posters/poster1.jpg",
    alt: "Deadset show poster for High Noon Saloon on June 11",
    label: "ARTIFACT 01 / HIGH NOON",
    note: "June 11 / supplied show artwork",
    linkedGigId: "gig-2026-06-11",
  },
  {
    id: "artifact-02",
    src: "/media/posters/poster2.jpg",
    alt: "Pink and black Deadset and Blush show poster for the Rigby on March 27",
    label: "ARTIFACT 02 / RIGBY",
    note: "March 27 / supplied show artwork",
    linkedGigId: "gig-2026-03-27",
  },
  {
    id: "artifact-03",
    src: "/media/posters/poster3.jpg",
    alt: "Deadset show poster for the Rigby Cavern Club on April 21",
    label: "ARTIFACT 03 / RIGBY",
    note: "April 21 / supplied show artwork",
    linkedGigId: "gig-2026-04-21",
  },
  {
    id: "artifact-04",
    src: "/media/posters/poster4.jpg",
    alt: "Orange benefit show poster including Deadset at the Cardinal Bar on March 1",
    label: "ARTIFACT 04 / CARDINAL",
    note: "March 1 / supplied benefit poster",
    linkedGigId: "gig-2026-03-01",
  },
  {
    id: "artifact-05",
    src: "/media/posters/poster5.jpg",
    alt: "Hand-lettered Deadset show poster for the Cardinal Bar on February 15",
    label: "ARTIFACT 05 / CARDINAL",
    note: "February 15 / supplied show artwork",
    linkedGigId: "gig-2026-02-15",
  },
  {
    id: "artifact-06",
    src: "/media/posters/poster6.jpg",
    alt: "Illustrated Deadset show poster for Gold Soundz on February 27",
    label: "ARTIFACT 06 / GOLD SOUNDZ",
    note: "February 27 / supplied show artwork",
    linkedGigId: "gig-2026-02-27",
  },
  {
    id: "artifact-07",
    src: "/media/posters/poster7.jpg",
    alt: "Handmade red paper Deadset show poster for the Rigby on January 29",
    label: "ARTIFACT 07 / RIGBY",
    note: "January 29 / supplied show artwork",
    linkedGigId: "gig-2026-01-29",
  },
  {
    id: "artifact-08",
    src: "/media/posters/poster8.jpg",
    alt: "Badgerpalooza 2025 poster for December 5 and 6 at Union South",
    label: "ARTIFACT 08 / BADGERPALOOZA",
    note: "Related supplied artwork / December 5–6",
    linkedGigId: "gig-2025-12-05",
  },
  {
    id: "artifact-09",
    src: "/media/posters/poster9.jpg",
    alt: "Pink Deadset, Blush, and Yolk show poster for April 4 at the Roxxy",
    label: "ARTIFACT 09 / THE ROXXY",
    note: "April 4 / year not listed / not in supplied ledger",
  },
];

export const gigs: Gig[] = [
  {
    date: "August 6, 2026",
    shortDate: "08.06",
    year: "2026",
    status: "upcoming",
    venue: "High Noon Saloon Patio",
    note: "Free · Summer patio series · Two-hour set",
  },
  {
    date: "June 26, 2026",
    shortDate: "06.26",
    year: "2026",
    venue: "Brewery?",
    uncertain: true,
  },
  {
    date: "June 21, 2026",
    shortDate: "06.21",
    year: "2026",
    venue: "Venue not listed",
    note: "Make Music Madison Day",
    uncertain: true,
  },
  {
    date: "June 11, 2026",
    shortDate: "06.11",
    year: "2026",
    venue: "High Noon Saloon",
    with: "Blush · Oister Boy · Bloom the Arctic",
  },
  {
    date: "April 21, 2026",
    shortDate: "04.21",
    year: "2026",
    venue: "Rigby",
    with: "The Lowliest One · Prairie Smoke",
    note: "$10",
  },
  {
    date: "April 19, 2026",
    shortDate: "04.19",
    year: "2026",
    venue: "The People Farm",
    with: "The Porch Flowers",
    note: "Free · Spring fest celebration · Acoustic set",
  },
  {
    date: "March 27, 2026",
    shortDate: "03.27",
    year: "2026",
    venue: "Rigby",
    with: "Blush",
    note: "$5",
  },
  {
    date: "March 1, 2026",
    shortDate: "03.01",
    year: "2026",
    venue: "Cardinal Bar",
    with: "Free Dirt · Adult Book Club · James Norcross",
    note: "$10 · Fundraiser for Voces de la Fronteras (as listed)",
  },
  {
    date: "February 27, 2026",
    shortDate: "02.27",
    year: "2026",
    venue: "Gold Soundz",
    with: "The Precipitators · Ayewannabe · Faux Beaux",
    note: "$10",
  },
  {
    date: "February 26, 2026",
    shortDate: "02.26",
    year: "2026",
    venue: "Rigby",
    with: "Full Panic · Shawondesse",
    note: "Free · Acoustic set",
  },
  {
    date: "February 15, 2026",
    shortDate: "02.15",
    year: "2026",
    venue: "Cardinal Bar",
    with: "Effy and the Pond · Full Panic · Faux Beaux",
    note: "$10",
  },
  {
    date: "January 29, 2026",
    shortDate: "01.29",
    year: "2026",
    venue: "Rigby",
    with: "Tollbooth · Prairie Smoke · Faux Beaux",
    note: "$5",
  },
  {
    date: "December 5, 2025",
    shortDate: "12.05",
    year: "2025",
    venue: "Badgerpalooza @ Union South",
    with: "Jan · Phoebe · Velvet Blue",
  },
  {
    date: "November 15, 2025",
    shortDate: "11.15",
    year: "2025",
    venue: "Nottingham Ballroom",
    with: "Friendly Spectres · Haha Laughing · Eat Turf",
    note: "$10",
  },
  {
    date: "November 9, 2025",
    shortDate: "11.09",
    year: "2025",
    venue: "Cardinal Bar",
    with: "Visiosn (as listed) · Prairie Smoke · Faux Beaux",
    note: "$5",
  },
  {
    date: "October 11, 2025",
    shortDate: "10.11",
    year: "2025",
    venue: "House Show",
    with: "Blush",
  },
];
