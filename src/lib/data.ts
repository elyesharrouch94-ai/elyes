export type ClientLogo = {
  name: string;
  file: string; // path under /public/logos
  ratio: number; // intrinsic width / height, for consistent visual sizing
  monochromeWhite?: boolean; // true for logos pre-baked solid white (need inverting on light theme)
  whiteOnDark?: boolean; // true to force a full-color logo to render white on the dark theme only
  scale?: number; // multiplier on the shared marquee height, for logos that read too small at the default size
};

export const clientLogos: ClientLogo[] = [
  { name: "Airbus", file: "/logos/airbus.png", ratio: 1905 / 400 },
  { name: "Capgemini Engineering", file: "/logos/capgemini-engineering.png", ratio: 2926 / 400 },
  { name: "Skywise", file: "/logos/skywise.png", ratio: 1413 / 400 },
  { name: "Carlos", file: "/logos/carlos.png", ratio: 1450 / 400, whiteOnDark: true },
  { name: "Jardel", file: "/logos/jardel.png", ratio: 1029 / 400 },
  { name: "Girasole Energies", file: "/logos/girasole-energies.png", ratio: 1454 / 400 },
  { name: "Sadio Doumbia", file: "/logos/sadio-doumbia.png", ratio: 1984 / 400 },
  { name: "Daygrove", file: "/logos/daygrove.png", ratio: 1974 / 400 },
  { name: "Uber Eats", file: "/logos/uber-eats.png", ratio: 2169 / 400, whiteOnDark: true },
  { name: "Yallah Habibi", file: "/logos/yallah-habibi.png", ratio: 958 / 400 },
  { name: "CCI Toulouse Haute-Garonne", file: "/logos/cci-toulouse-haute-garonne.png", ratio: 1536 / 400 },
  { name: "CCI Tarn-et-Garonne", file: "/logos/cci-tarn-et-garonne.png", ratio: 1460 / 400 },
  { name: "Occitanie", file: "/logos/occitanie.png", ratio: 1119 / 300, monochromeWhite: true },
  { name: "B2M", file: "/logos/b2m.png", ratio: 800 / 400 },
  { name: "Domy", file: "/logos/domy.png", ratio: 928 / 400 },
  { name: "A2Z Process Solutions", file: "/logos/a2z-process-solutions.png", ratio: 839 / 300, monochromeWhite: true },
  { name: "Lesquina", file: "/logos/lesquina.png", ratio: 1093 / 300, monochromeWhite: true },
  { name: "La Beer Fabrique", file: "/logos/la-beer-fabrique.png", ratio: 424 / 400, scale: 1.6 },
];

export type Experience = {
  id: string;
  period: string;
  location: string;
  role: string;
  org: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    id: "heco",
    period: "2025 - 2026",
    location: "Toulouse / Montréal",
    role: "Founder",
    org: "HECO, Marketing & Communications Agency",
    bullets: [
      "Built and ran a multi-sector client portfolio: energy, sports, beauty, modeling, influencer marketing.",
      "Directed paid media strategy across Google Ads and LinkedIn Ads.",
      "Produced photo, video and reels content for consumer and B2B audiences.",
      "Created and hosted a B2B video podcast (@hecomment) for branding and lead generation.",
    ],
  },
  {
    id: "capgemini",
    period: "2022 - 2024",
    location: "Toulouse, France",
    role: "Communications Consultant",
    org: "Capgemini Engineering / Skywise, Airbus World",
    bullets: [
      "Grew and animated the Skywise LinkedIn community, lifting engagement per post.",
      "Structured art direction and editorial consistency across content.",
      "Produced audiovisual content and led a media team for the Skywise Symposium.",
      "Directed internal and external aviation communications projects.",
    ],
  },
  {
    id: "cci-formation",
    period: "2018 - 2022",
    location: "Montauban, France",
    role: "Digital Communications Manager",
    org: "CCI Formation Tarn & Garonne",
    bullets: [
      "Deployed SEO, SEA and SMO acquisition strategies and managed paid campaigns.",
      "Rebuilt and managed the organization's website, including tracking and performance.",
      "Implemented marketing automation tools (email, SMS).",
    ],
  },
  {
    id: "cci-toulouse",
    period: "2017 - 2018",
    location: "Toulouse, France",
    role: "Digital Transformation Consultant",
    org: "CCI Toulouse",
    bullets: [
      "Built digital-maturity tools for SMEs.",
      "Produced educational content and contributed to a digital platform.",
    ],
  },
];

export type Skill = {
  id: string;
  title: string;
  description: string;
};

export const skills: Skill[] = [
  { id: "brand", title: "Brand Strategy & Storytelling", description: "Positioning, narrative and editorial direction across channels." },
  { id: "paid-media", title: "Paid Media & Growth", description: "Google Ads, LinkedIn Ads, Meta Ads: budget management and conversion." },
  { id: "content", title: "Content Production", description: "Photo, video, reels and art direction for consumer and B2B audiences." },
  { id: "seo", title: "SEO & Marketing Automation", description: "Analytics, SEO and automation tooling for sustained growth." },
  { id: "ai", title: "Applied AI for Marketing", description: "Integrating AI into content, research and marketing workflows." },
];

export const adsStatValue = "80K€+";

export type WorkCategory = "corporate" | "content";

export type WorkItem = {
  id: string;
  category: WorkCategory;
  client: string;
  title: string;
  description: string;
  tags: string[];
  images?: string[];
  video?: { src: string; poster: string; aspect?: string };
};

export const workItems: WorkItem[] = [
  {
    id: "heco",
    category: "corporate",
    client: "HECO",
    title: "Building a Marketing & Communications Agency",
    description:
      "Founded and ran a boutique agency serving clients across energy, sports, beauty and influencer marketing, owning strategy, paid media, and content production end-to-end.",
    tags: ["Strategy", "Paid Media", "Content"],
  },
  {
    id: "skywise",
    category: "corporate",
    client: "Skywise, Airbus World",
    title: "Growing a Global Aerospace Community",
    description:
      "Grew and art-directed the LinkedIn presence for Airbus's Skywise platform, producing audiovisual content and leading a media team for the Skywise Symposium.",
    tags: ["Community", "Art Direction", "Audiovisual"],
  },
  {
    id: "hecomment",
    category: "corporate",
    client: "@hecomment",
    title: "A B2B Video Podcast, Produced End-to-End",
    description:
      "Created and produced a B2B video podcast turning complex industry topics into a lead-generation engine, from format design to shooting and editing.",
    tags: ["Podcast", "Video", "Lead Gen"],
  },
  {
    id: "carlos",
    category: "content",
    client: "Carlos",
    title: "Art Direction & Photo Production for Carlos Hair & Beauty",
    description:
      "Art direction and photo production for Carlos, a renowned Toulouse hairdresser, including coverage of his collaboration with the Folies Bergères in Paris.",
    tags: ["Art Direction", "Photography", "Beauty"],
    images: ["/work/carlos-01.jpg", "/work/carlos-02.jpg", "/work/carlos-03.jpg", "/work/carlos-04.jpg"],
    video: {
      src: "/work/carlos-boho-muse.mp4",
      poster: "/work/carlos-boho-muse-poster.jpg",
    },
  },
  {
    id: "ho-ara",
    category: "content",
    client: "Ho Ara",
    title: "Photo Production for Ho Ara Wellness",
    description:
      "Intimate, editorial photo production for Ho Ara's massage and wellness studio: warm tones, close framing, and a calm visual identity.",
    tags: ["Photography", "Wellness", "Brand Identity"],
    images: ["/work/ho-ara-01.jpg", "/work/ho-ara-02.jpg", "/work/ho-ara-03.jpg", "/work/ho-ara-04.jpg"],
  },
  {
    id: "iam-margot",
    category: "content",
    client: "Iam Margot",
    title: "Fashion Photography for Iam Margot in Toulouse",
    description:
      "Editorial fashion photo production shot across Toulouse: street style and studio-grade portraiture for a growing fashion brand.",
    tags: ["Photography", "Fashion", "Editorial"],
    images: [
      "/work/iam-margot-01.jpg",
      "/work/iam-margot-02.jpg",
      "/work/iam-margot-03.jpg",
      "/work/iam-margot-04.jpg",
      "/work/iam-margot-05.jpg",
      "/work/iam-margot-06.jpg",
    ],
  },
  {
    id: "yallah-habibi",
    category: "content",
    client: "Yallah Habibi",
    title: "Event Video Coverage & Tour Design for Yallah Habibi",
    description:
      "On-site video production for a Yallah Habibi nightlife event, plus event poster design for the brand's 2026 World Tour across Chicago, Montréal and Toronto.",
    tags: ["Video", "Graphic Design", "Event Coverage"],
    images: [
      "/work/yallah-habibi-01.jpg",
      "/work/yallah-habibi-02.jpg",
      "/work/yallah-habibi-03.jpg",
      "/work/yallah-habibi-04.jpg",
    ],
    video: { src: "/work/yallah-habibi.mp4", poster: "/work/yallah-habibi-poster.jpg" },
  },
  {
    id: "la-beer-fabrique",
    category: "content",
    client: "La Beer Fabrique",
    title: "Brand Video Coverage for La Beer Fabrique",
    description:
      "On-site video production for a craft brewery, capturing process, people and atmosphere for a distinctly artisanal identity.",
    tags: ["Video", "F&B", "Brand"],
    video: {
      src: "/work/la-beer-fabrique.mp4",
      poster: "/work/la-beer-fabrique-poster.jpg",
      aspect: "2.5/1",
    },
  },
  {
    id: "sadio-doumbia",
    category: "content",
    client: "Sadio Doumbia",
    title: "Image Management for Sadio Doumbia, Top 10 ATP Race Doubles Player",
    description:
      "Ongoing image management for a Top 10 ATP Race doubles player: video and photo production, partnership activation, and personal brand strategy on tour.",
    tags: ["Video", "Photography", "Partnerships"],
    video: { src: "/work/sadio-doumbia.mp4", poster: "/work/sadio-doumbia-poster.jpg" },
  },
  {
    id: "girasole-energies",
    category: "content",
    client: "Girasole Energies",
    title: "Brand & Image Management for Girasole Energies",
    description:
      "End-to-end brand management for a solar energy company: paid ads, print, social media and event coverage, all under one consistent visual identity.",
    tags: ["Branding", "Ads", "Social Media"],
    video: {
      src: "/work/girasole-energies.mp4",
      poster: "/work/girasole-energies-poster.jpg",
      aspect: "1/1",
    },
  },
  {
    id: "hecomment-shorts",
    category: "corporate",
    client: "@hecomment",
    title: "Short-Form Hooks That Crossed 100K+ Views",
    description:
      "Wrote, shot and edited short-form podcast clips built around scroll-stopping hooks, turning a B2B format into content that broke past 100K views.",
    tags: ["Short-Form", "Video", "100K+ Views"],
    video: { src: "/work/mon-podcast.mp4", poster: "/work/mon-podcast-poster.jpg" },
  },
];

export const workFilterKeys: ("all" | WorkCategory)[] = ["all", "corporate", "content"];

export const stats = [
  { target: 8, suffix: "+" },
  { target: 80, suffix: "K€+" },
  { target: 10, suffix: "+" },
];

export const contact = {
  email: "elyesharrouch94@gmail.com",
  phone: "(263) 382-7834",
  phoneHref: "+2263827834",
  instagram: "https://www.instagram.com/hecomment?igsh=c3doN2lmbnk0anZp&utm_source=qr",
  instagramHandle: "@hecomment",
  location: "Montréal, QC",
};
