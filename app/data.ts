export type Gig = {
  date: string;
  shortDate: string;
  year: "2026" | "2025";
  venue: string;
  with?: string;
  note?: string;
  upcoming?: boolean;
};

export type Poster = {
  id: string;
  src: string;
  alt: string;
  label: string;
  note: string;
  linkedGigId?: string;
};

export const posters: Poster[] = [
  { id: "high-noon", src: "/media/posters/poster1.jpg", alt: "Deadset, Blush, Oister Boy, and Bloom the Arctic flyer for High Noon Saloon", label: "High Noon Saloon", note: "June 11, 2026 · Madison, WI", linkedGigId: "gig-2026-06-11" },
  { id: "rigby-march", src: "/media/posters/poster2.jpg", alt: "Deadset and Blush flyer for the Rigby", label: "The Rigby", note: "March 27, 2026 · with Blush", linkedGigId: "gig-2026-03-27" },
  { id: "rigby-april", src: "/media/posters/poster3.jpg", alt: "Deadset, The Lowliest One, and Prairie Smoke flyer for the Rigby Cavern Club", label: "The Rigby Cavern Club", note: "April 21, 2026 · $10", linkedGigId: "gig-2026-04-21" },
  { id: "cardinal-benefit", src: "/media/posters/poster4.jpg", alt: "Madison Day for a Cause flyer with Deadset at Cardinal Bar", label: "Cardinal Bar", note: "March 1, 2026 · Madison Day for a Cause", linkedGigId: "gig-2026-03-01" },
  { id: "cardinal-february", src: "/media/posters/poster5.jpg", alt: "Deadset, Effy and the Pond, Full Panic, and Faux Beaux flyer for Cardinal Bar", label: "Cardinal Bar", note: "February 15, 2026 · $10", linkedGigId: "gig-2026-02-15" },
  { id: "gold-soundz", src: "/media/posters/poster6.jpg", alt: "Deadset, The Precipitators, Ayewannabe, and Faux Beaux illustrated flyer", label: "Gold Soundz", note: "February 27, 2026 · $10", linkedGigId: "gig-2026-02-27" },
  { id: "rigby-january", src: "/media/posters/poster7.jpg", alt: "Hand-drawn Deadset, Tollbooth, Prairie Smoke, and Faux Beaux flyer for the Rigby", label: "The Rigby", note: "January 29, 2026 · $5", linkedGigId: "gig-2026-01-29" },
  { id: "badgerpalooza", src: "/media/posters/poster8.jpg", alt: "Badgerpalooza 2025 flyer for Union South", label: "Badgerpalooza", note: "December 5–6, 2025 · Union South", linkedGigId: "gig-2025-12-05" },
  { id: "roxxy", src: "/media/posters/poster9.jpg", alt: "Deadset, Blush, and Yolk flyer for the Roxxy", label: "The Roxxy", note: "April 4 · Deadset, Blush, and Yolk" },
];

export const gigs: Gig[] = [
  { date: "August 6, 2026", shortDate: "08.06", year: "2026", venue: "High Noon Saloon Patio", note: "Free · Summer patio series · Two-hour set", upcoming: true },
  { date: "June 11, 2026", shortDate: "06.11", year: "2026", venue: "High Noon Saloon", with: "Blush · Oister Boy · Bloom the Arctic" },
  { date: "April 21, 2026", shortDate: "04.21", year: "2026", venue: "The Rigby", with: "The Lowliest One · Prairie Smoke", note: "$10" },
  { date: "April 19, 2026", shortDate: "04.19", year: "2026", venue: "The People Farm", with: "The Porch Flowers", note: "Free · Spring celebration · Acoustic set" },
  { date: "March 27, 2026", shortDate: "03.27", year: "2026", venue: "The Rigby", with: "Blush", note: "$5" },
  { date: "March 1, 2026", shortDate: "03.01", year: "2026", venue: "Cardinal Bar", with: "Free Dirt · Adult Book Club · James Norcross", note: "$10 · Benefit for Voces de la Frontera" },
  { date: "February 27, 2026", shortDate: "02.27", year: "2026", venue: "Gold Soundz", with: "The Precipitators · Ayewannabe · Faux Beaux", note: "$10" },
  { date: "February 26, 2026", shortDate: "02.26", year: "2026", venue: "The Rigby", with: "Full Panic · Shawondesse", note: "Free · Acoustic set" },
  { date: "February 15, 2026", shortDate: "02.15", year: "2026", venue: "Cardinal Bar", with: "Effy and the Pond · Full Panic · Faux Beaux", note: "$10" },
  { date: "January 29, 2026", shortDate: "01.29", year: "2026", venue: "The Rigby", with: "Tollbooth · Prairie Smoke · Faux Beaux", note: "$5" },
  { date: "December 5, 2025", shortDate: "12.05", year: "2025", venue: "Badgerpalooza at Union South", with: "Jan · Phoebe · Velvet Blue" },
  { date: "November 15, 2025", shortDate: "11.15", year: "2025", venue: "Nottingham Ballroom", with: "Friendly Spectres · Haha Laughing · Eat Turf", note: "$10" },
  { date: "November 9, 2025", shortDate: "11.09", year: "2025", venue: "Cardinal Bar", with: "Visiosn · Prairie Smoke · Faux Beaux", note: "$5" },
  { date: "October 11, 2025", shortDate: "10.11", year: "2025", venue: "House Show", with: "Blush" },
];
