"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  experiences as dataExperiences,
  skills as dataSkills,
  workItems as dataWorkItems,
  type Experience,
  type Skill,
  type WorkItem,
} from "./data";

export type Lang = "en" | "fr";

export type StaticDict = {
  nav: { about: string; work: string; services: string; contact: string; getInTouch: string };
  sectionNav: { home: string; about: string; work: string; services: string; contact: string };
  hero: {
    availability: string;
    roles: string[];
    specialistPrefix: string;
    lead: string;
    ctaWork: string;
    ctaTalk: string;
    statsYears: string;
    statsBudgets: string;
    statsClients: string;
    trustedBy: string;
  };
  about: {
    eyebrow: string;
    headingPre: string;
    headingHighlight: string;
    headingPost: string;
    p1: string;
    p2: string;
    tags: string[];
    pathLabel: string;
  };
  work: {
    eyebrow: string;
    heading: string;
    filterAll: string;
    filterCorporate: string;
    filterContent: string;
    scrollHint: (client: string) => string;
  };
  services: {
    eyebrow: string;
    heading: string;
    ads: {
      label: string;
      title: string;
      description: string;
      platforms: string[];
      statLabel: string;
    };
  };
  contact: {
    eyebrow: string;
    headingPre: string;
    headingHighlight: string;
    sub: string;
    emailLabel: string;
    phoneLabel: string;
    instagramLabel: string;
    locationLabel: string;
    copiedEmail: string;
    copiedPhone: string;
    copyFailed: string;
  };
  footer: { rights: string };
  popit: { title: string; subtitle: string; reset: string; close: string };
  game: {
    title: string;
    subtitle: string;
    you: string;
    me: string;
    yourTurn: string;
    myTurn: string;
    youWin: string;
    iWin: string;
    draw: string;
    playAgain: string;
    score: string;
  };
};

const en: StaticDict = {
  nav: { about: "About", work: "Work", services: "Services", contact: "Contact", getInTouch: "Get in touch" },
  sectionNav: { home: "Home", about: "About", work: "Work", services: "Services", contact: "Contact" },
  hero: {
    availability: "Montréal, QC · Canada & worldwide",
    roles: [
      "Content, Branding & Digital Growth",
      "Storytelling & Brand Building",
      "Growth & Performance Marketing",
      "Photo, Video & Art Direction",
    ],
    specialistPrefix: "Communications Specialist",
    lead: "8 years turning complex ideas into stories that build brands, grow audiences, and convert, across corporate (Capgemini, Airbus) and entrepreneurial environments.",
    ctaWork: "See my work →",
    ctaTalk: "Let's talk",
    statsYears: "Years of experience",
    statsBudgets: "Media budgets managed",
    statsClients: "Clients across industries",
    trustedBy: "Trusted by teams and brands including",
  },
  about: {
    eyebrow: "01. Profile",
    headingPre: "I design ",
    headingHighlight: "multi-channel stories",
    headingPost: " that grow brands, audiences, and businesses.",
    p1: "Marketing and communications strategist with 8 years of experience across corporate (Capgemini, Airbus) and entrepreneurial environments. Specialized in storytelling, content creation, and brand-building, growing executive and corporate audiences, and producing editorial and audiovisual content for the aerospace sector.",
    p2: "Performance-driven, and comfortable turning complex topics into clear, compelling multi-channel narratives that drive engagement, growth, and conversion.",
    tags: ["Storytelling", "Brand Building", "Content Strategy", "Paid Media", "Growth", "Applied AI"],
    pathLabel: "Path",
  },
  work: {
    eyebrow: "02. Selected Work",
    heading: "Growth, strategy, and stories worth telling",
    filterAll: "All",
    filterCorporate: "Corporate & Growth",
    filterContent: "Content & Brand",
    scrollHint: (client: string) => `Scroll to see ${client}`,
  },
  services: {
    eyebrow: "03. Services",
    heading: "A hybrid profile: strategy and execution",
    ads: {
      label: "Paid Media Focus",
      title: "Budgets planned, campaigns run, results tracked",
      description:
        "Hands-on management of paid acquisition across Google Ads and LinkedIn Ads: targeting, creative testing, budget pacing, and conversion tracking end-to-end.",
      platforms: ["Google Ads", "LinkedIn Ads", "Meta Ads"],
      statLabel: "Managed across active campaigns",
    },
  },
  contact: {
    eyebrow: "04. Contact",
    headingPre: "Let's build something ",
    headingHighlight: "worth noticing",
    sub: "Working with clients across Canada and worldwide. Open to brand campaigns, content production, and creative collaborations.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    instagramLabel: "Instagram",
    locationLabel: "Location",
    copiedEmail: "Email copied to clipboard",
    copiedPhone: "Phone number copied to clipboard",
    copyFailed: "Couldn't copy",
  },
  footer: { rights: "All rights reserved." },
  popit: {
    title: "Feeling stressed?",
    subtitle: "Pop a few.",
    reset: "Reset",
    close: "Close",
  },
  game: {
    title: "Think you can beat me?",
    subtitle: "Tic-tac-toe. Winner buys the coffee.",
    you: "You",
    me: "Me",
    yourTurn: "Your move",
    myTurn: "Thinking...",
    youWin: "You actually won. Respect.",
    iWin: "I win. Told you so.",
    draw: "Draw. Rematch?",
    playAgain: "Play again",
    score: "Score",
  },
};

const fr: StaticDict = {
  nav: { about: "Profil", work: "Réalisations", services: "Services", contact: "Contact", getInTouch: "Me contacter" },
  sectionNav: { home: "Accueil", about: "Profil", work: "Réalisations", services: "Services", contact: "Contact" },
  hero: {
    availability: "Montréal, QC · Canada et à l'international",
    roles: [
      "Contenu, marque et croissance digitale",
      "Storytelling et construction de marque",
      "Croissance et marketing de performance",
      "Photo, vidéo et direction artistique",
    ],
    specialistPrefix: "Spécialiste en communication",
    lead: "8 ans à transformer des idées complexes en récits qui construisent des marques, font grandir des audiences et convertissent, entre univers corporate (Capgemini, Airbus) et entrepreneurial.",
    ctaWork: "Voir mes réalisations →",
    ctaTalk: "Discutons",
    statsYears: "Années d'expérience",
    statsBudgets: "Budgets média gérés",
    statsClients: "Clients tous secteurs confondus",
    trustedBy: "Ils m'ont fait confiance, notamment",
  },
  about: {
    eyebrow: "01. Profil",
    headingPre: "Je conçois des ",
    headingHighlight: "récits multicanaux",
    headingPost: " qui font grandir marques, audiences et entreprises.",
    p1: "Stratège marketing et communication avec 8 ans d'expérience entre univers corporate (Capgemini, Airbus) et entrepreneurial. Spécialisé en storytelling, création de contenu et construction de marque, avec une expertise dans la croissance d'audiences corporate et la production de contenu éditorial et audiovisuel pour le secteur aérospatial.",
    p2: "Orienté résultats, à l'aise pour transformer des sujets complexes en récits multicanaux clairs et percutants qui génèrent engagement, croissance et conversion.",
    tags: ["Storytelling", "Construction de marque", "Stratégie de contenu", "Paid Media", "Croissance", "IA appliquée"],
    pathLabel: "Parcours",
  },
  work: {
    eyebrow: "02. Réalisations",
    heading: "Croissance, stratégie et histoires qui méritent d'être racontées",
    filterAll: "Tout",
    filterCorporate: "Corporate & Croissance",
    filterContent: "Contenu & Marque",
    scrollHint: (client: string) => `Défiler pour découvrir ${client}`,
  },
  services: {
    eyebrow: "03. Services",
    heading: "Un profil hybride : stratégie et exécution",
    ads: {
      label: "Focus Paid Media",
      title: "Budgets planifiés, campagnes pilotées, résultats mesurés",
      description:
        "Gestion opérationnelle de l'acquisition payante sur Google Ads et LinkedIn Ads : ciblage, tests créatifs, pacing budgétaire et suivi de conversion de bout en bout.",
      platforms: ["Google Ads", "LinkedIn Ads", "Meta Ads"],
      statLabel: "Gérés sur les campagnes actives",
    },
  },
  contact: {
    eyebrow: "04. Contact",
    headingPre: "Construisons quelque chose ",
    headingHighlight: "qui se démarque",
    sub: "Je travaille avec des clients partout au Canada et à l'international. Ouvert aux campagnes de marque, à la production de contenu et aux collaborations créatives.",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    instagramLabel: "Instagram",
    locationLabel: "Localisation",
    copiedEmail: "Email copié dans le presse-papiers",
    copiedPhone: "Numéro copié dans le presse-papiers",
    copyFailed: "Impossible de copier",
  },
  footer: { rights: "Tous droits réservés." },
  popit: {
    title: "Un coup de stress ?",
    subtitle: "Fais éclater quelques bulles.",
    reset: "Réinitialiser",
    close: "Fermer",
  },
  game: {
    title: "Tu penses pouvoir me battre ?",
    subtitle: "Morpion. Le gagnant offre le café.",
    you: "Toi",
    me: "Moi",
    yourTurn: "À toi de jouer",
    myTurn: "Je réfléchis...",
    youWin: "T'as vraiment gagné. Respect.",
    iWin: "Je gagne. Je te l'avais dit.",
    draw: "Match nul. Revanche ?",
    playAgain: "Rejouer",
    score: "Score",
  },
};

const dictionaries: Record<Lang, StaticDict> = { en, fr };

const workItemsFr: Record<string, Partial<Pick<WorkItem, "title" | "description" | "tags">>> = {
  heco: {
    title: "Construire une agence marketing & communication",
    description:
      "Fondation et gestion d'une agence à taille humaine au service de clients dans l'énergie, le sport, la beauté et l'influence, de la stratégie au paid media jusqu'à la production de contenu.",
    tags: ["Stratégie", "Paid Media", "Contenu"],
  },
  skywise: {
    title: "Faire grandir une communauté aérospatiale mondiale",
    description:
      "Croissance et direction artistique de la présence LinkedIn de la plateforme Skywise d'Airbus, production de contenu audiovisuel et gestion d'une équipe média pour le Skywise Symposium.",
    tags: ["Communauté", "Direction artistique", "Audiovisuel"],
  },
  hecomment: {
    title: "Un podcast vidéo B2B, produit de A à Z",
    description:
      "Création et production d'un podcast vidéo B2B transformant des sujets industriels complexes en un véritable moteur de génération de leads, du format au tournage jusqu'au montage.",
    tags: ["Podcast", "Vidéo", "Génération de leads"],
  },
  carlos: {
    title: "Direction artistique & production photo pour Carlos Hair & Beauty",
    description:
      "Direction artistique et production photo pour Carlos, coiffeur reconnu à Toulouse, incluant la couverture de sa collaboration avec les Folies Bergères à Paris.",
    tags: ["Direction artistique", "Photographie", "Beauté"],
  },
  "ho-ara": {
    title: "Production photo pour Ho Ara Wellness",
    description:
      "Production photo intimiste et éditoriale pour l'institut de massage et bien-être Ho Ara : tons chauds, cadrages rapprochés et identité visuelle apaisante.",
    tags: ["Photographie", "Bien-être", "Identité de marque"],
  },
  "iam-margot": {
    title: "Photographie de mode pour Iam Margot à Toulouse",
    description:
      "Production photo mode éditoriale réalisée à Toulouse : street style et portraits soignés pour une marque de mode en pleine croissance.",
    tags: ["Photographie", "Mode", "Éditorial"],
  },
  "la-beer-fabrique": {
    title: "Vidéo de marque pour La Beer Fabrique",
    description:
      "Production vidéo réalisée sur place dans une brasserie artisanale : process, équipe et ambiance pour une identité résolument artisanale.",
    tags: ["Vidéo", "Restauration", "Marque"],
  },
  "yallah-habibi": {
    title: "Captation vidéo & design de tournée pour Yallah Habibi",
    description:
      "Production vidéo sur place pour un événement nightlife Yallah Habibi, ainsi que le design des affiches pour la World Tour 2026 à Chicago, Montréal et Toronto.",
    tags: ["Vidéo", "Design graphique", "Couverture d'événement"],
  },
  "sadio-doumbia": {
    title: "Contenu vidéo pour Sadio Doumbia, joueur Top 10 ATP Race en double",
    description:
      "Production vidéo sociale pour un joueur Top 10 ATP Race en double : temps forts de match et séances d'entraînement captés et montés pour développer sa marque personnelle sur le circuit.",
    tags: ["Vidéo", "Sport", "Marque personnelle"],
  },
  "girasole-energies": {
    title: "Vidéo de marque pour Girasole Energies",
    description:
      "Production vidéo par drone et sur site pour une entreprise d'énergie solaire, mettant en valeur les installations et deux ans de partenariat avec une identité visuelle sobre et corporate.",
    tags: ["Vidéo", "Drone", "Énergie"],
  },
  "hecomment-shorts": {
    title: "Des accroches courtes qui ont dépassé les 100K vues",
    description:
      "Écriture, tournage et montage de formats courts issus du podcast, construits autour d'accroches percutantes, transformant un format B2B en contenu ayant dépassé les 100 000 vues.",
    tags: ["Format court", "Vidéo", "100K+ vues"],
  },
};

const experiencesFr: Record<string, Partial<Pick<Experience, "role" | "org" | "bullets">>> = {
  heco: {
    role: "Fondateur",
    org: "HECO, agence marketing & communication",
    bullets: [
      "Création et gestion d'un portefeuille clients multisectoriel : énergie, sport, beauté, mannequinat, influence.",
      "Pilotage de la stratégie paid media sur Google Ads et LinkedIn Ads.",
      "Production de contenu photo, vidéo et reels pour audiences grand public et B2B.",
      "Création et animation d'un podcast vidéo B2B (@hecomment) pour la marque et la génération de leads.",
    ],
  },
  capgemini: {
    role: "Consultant en communication",
    org: "Capgemini Engineering / Skywise, univers Airbus",
    bullets: [
      "Développement et animation de la communauté LinkedIn Skywise, avec une hausse de l'engagement par publication.",
      "Structuration de la direction artistique et de la cohérence éditoriale des contenus.",
      "Production de contenu audiovisuel et gestion d'une équipe média pour le Skywise Symposium.",
      "Pilotage de projets de communication aéronautique internes et externes.",
    ],
  },
  "cci-formation": {
    role: "Responsable communication digitale",
    org: "CCI Formation Tarn & Garonne",
    bullets: [
      "Déploiement de stratégies d'acquisition SEO, SEA et SMO, et gestion de campagnes payantes.",
      "Refonte et gestion du site web de l'organisme, incluant tracking et performance.",
      "Mise en place d'outils de marketing automation (email, SMS).",
    ],
  },
  "cci-toulouse": {
    role: "Consultant en transformation digitale",
    org: "CCI Toulouse",
    bullets: [
      "Conception d'outils de maturité digitale pour les PME.",
      "Production de contenu pédagogique et contribution au développement d'une plateforme digitale.",
    ],
  },
};

const skillsFr: Record<string, Partial<Pick<Skill, "title" | "description">>> = {
  brand: {
    title: "Stratégie de marque & Storytelling",
    description: "Positionnement, narration et direction éditoriale sur tous les canaux.",
  },
  "paid-media": {
    title: "Paid Media & Croissance",
    description: "Google Ads, LinkedIn Ads, Meta Ads : gestion de budgets et conversion.",
  },
  content: {
    title: "Production de contenu",
    description: "Photo, vidéo, reels et direction artistique pour audiences grand public et B2B.",
  },
  seo: {
    title: "SEO & Marketing Automation",
    description: "Analytics, SEO et outils d'automatisation pour une croissance durable.",
  },
  ai: {
    title: "IA appliquée au marketing",
    description: "Intégration de l'IA dans les workflows de contenu, de recherche et marketing.",
  },
};

function localize<T extends { id: string }>(items: T[], lang: Lang, overrides: Record<string, Partial<T>>): T[] {
  if (lang === "en") return items;
  return items.map((item) => ({ ...item, ...(overrides[item.id] ?? {}) }));
}

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: StaticDict;
  workItems: WorkItem[];
  experiences: Experience[];
  skills: Skill[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "eh-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr") {
      setLangState(stored);
      return;
    }
    const browserLang = navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
    setLangState(browserLang);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
      workItems: localize<WorkItem>(dataWorkItems, lang, workItemsFr),
      experiences: localize<Experience>(dataExperiences, lang, experiencesFr),
      skills: localize<Skill>(dataSkills, lang, skillsFr),
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
