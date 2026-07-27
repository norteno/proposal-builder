import { Proposal } from "./types";

export const starterProposal: Proposal = {
  id: "kinful-style-template",
  clientName: "Kinful",
  slug: "kinful-proposal",
  status: "Draft",
  title: "Website Design & Development Proposal",
  eyebrow: "Prepared for",
  heroIntro:
    "A focused proposal for your next brand and website experience.",
  heroCreatedDate: "May 2026",
  introLetter:
    "Thank you for considering our team as your creative partner. This proposal outlines a flexible, editorial website experience designed to help your brand communicate clearly, convert thoughtfully, and scale with confidence.",
  letterSigners: [
    { name: "Amanda Spain", role: "Creative Partner" },
    { name: "TGS Team", role: "Design & Development" }
  ],
  aboutTitle: "Hello, we are The Graphic Standard, but you can call us TGS.",
  aboutBody:
    "We are a multi-disciplinary studio merging high-lift design and technology to create brand systems, websites, and digital experiences for ambitious organizations.",
  aboutImageUrl: "",
  proofTitle: "We build and support Shopify storefronts for emerging brands.",
  proofBody:
    "Our work blends strategy, visual systems, storytelling, and technical execution into a seamless process for clients and their audiences.",
  experienceImageUrl: "",
  studioLogoUrl: "",
  headerText: "The Graphic Standard",
  theme: {
    primary: "#F5E7E3",
    secondary: "#061D00",
    cream: "#f4e7e2",
    accent: "#DE675F",
    text: "#ffffff",
    darkText: "#1b1b1b",
    headingFont: "Queens Condensed",
    bodyFont: "GT Alpina"
  },
  sectionBodyColors: {
    hero: "#061D00",
    letter: "#F5E7E3",
    about: "#4b4b4b",
    experience: "#061D00",
    team: "#F5E7E3",
    deliverables: "#555555",
    timeline: "#727272",
    pricing: "#061D00",
    handoff: "#061D00"
  },

  sectionTextColors: {
    hero: "#061D00",
    letter: "#F5E7E3",
    about: "#061D00",
    experience: "#061D00",
    team: "#F5E7E3",
    deliverables: "#061D00",
    timeline: "#061D00",
    pricing: "#061D00",
    handoff: "#061D00"
  },
  clientLogos: [
    { name: "R+Co" },
    { name: "Uchi" },
    { name: "Under Armour" },
    { name: "RLC" },
    { name: "Audi" },
    { name: "Perspire" }
  ],
  team: [
    { name: "Sarah Ellis", role: "Creative Director" },
    { name: "Ben Carter", role: "Strategy Lead" },
    { name: "Alex Moore", role: "Web Designer" },
    { name: "Lauren Kim", role: "Project Manager" },
    { name: "Rachel Stone", role: "Copywriter" },
    { name: "Drew Pike", role: "Developer" }
  ],
  deliverables: [
    {
      phase: "01",
      title: "Design Discovery",
      description:
        "A focused discovery phase to align on goals, audience, positioning, creative direction, and site priorities.",
      items: ["Creative intake", "Site goals", "Competitive review", "Moodboard direction"]
    },
    {
      phase: "02",
      title: "Website Definition",
      description:
        "A planning phase that defines content structure, user journeys, sitemap, key page requirements, and conversion goals.",
      items: ["Sitemap", "Page requirements", "Content hierarchy", "UX recommendations"]
    },
    {
      phase: "03",
      title: "Website Detailed Design",
      description:
        "A high-fidelity design phase for core website pages, components, responsive layouts, and visual design systems.",
      items: ["Homepage design", "Interior page designs", "Responsive design", "Design system"]
    },
    {
      phase: "04",
      title: "Copy Editing",
      description:
        "Light copy refinement to ensure the proposal, page content, and messaging feel polished, clear, and on-brand.",
      items: ["Headline refinement", "Page copy edits", "CTA recommendations", "Tone consistency"]
    }
  ],
  timelineUnit: "months",
  timelineLength: 7,
  timeline: [
    { label: "Discovery", duration: "4 weeks", startMonth: 1.3, endMonth: 2.4, color: "#e9ff3d" },
    { label: "Web Design", duration: "~16 weeks", startMonth: 1.6, endMonth: 6.0, color: "#18cbaa" },
    { label: "Development", duration: "~14–16 weeks", startMonth: 2.7, endMonth: 6.6, color: "#0d3d34" },
    { label: "Content Entry", duration: "Ongoing", startMonth: 4.4, endMonth: 6.6, color: "#d77df2" },
    { label: "Launch & Support", duration: "Ongoing", startMonth: 6.6, endMonth: 8.1, color: "#8ff4f4" }
  ],
  timelineNote: "Timeline is illustrative. Final scope confirmed after Discovery.",
  pricing: {
    eyebrow: "Estimated Budget",
    title: "Investment",
    totalLabel: "Total Budget",
    totalTitle: "Web Design + Development",
    totalDescription: "All-in project fee for all phases of the online shopping experience. See creative and development breakout pricing below.",
    totalPrice: "$178k",
    splitLabel: "Split",
    totalBoxBackgroundColor: "#ffffff",
    cardBackgroundColor: "#ffffff",
    items: [
      {
        eyebrow: "The Graphic Standard",
        title: "Web Design",
        price: "$85,000",
        items: ["Design discovery", "Website definition", "Website detailed design", "Copy editing", "Quality assurance of design in development", "Project management"]
      },
      {
        eyebrow: "Kinful",
        title: "Theme Development",
        price: "$85,000",
        items: ["Design advisement", "Technical discovery", "Custom Shopify theme", "Integration support"]
      },
      {
        eyebrow: "Kinful",
        title: "Quiz Development",
        price: "$8,000",
        items: ["Exploration of quiz logic", "App exploration for backend needs", "Roughly 40 hours for the quiz to define what fits within scope"]
      },
      {
        eyebrow: "Kinful",
        title: "Ongoing Support",
        price: "$4,300/mo",
        items: ["Ongoing support: $4,300/mo (20 hrs)", "Minimum 3 months of support required for continued post-launch optimization"]
      }
    ]
  }
};
