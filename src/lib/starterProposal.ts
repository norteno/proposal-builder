import type { Proposal } from "./types";

export const starterProposal: Proposal = {
  id: "kinful-style-template",
  clientName: "Kinful",
  slug: "kinful-proposal",
  status: "Draft",
  title: "Website Design & Development Proposal",
  eyebrow: "Prepared for",
  introLetter:
    "Thank you for considering our team as your creative partner. This proposal outlines a flexible, editorial website experience designed to help your brand communicate clearly, convert thoughtfully, and scale with confidence.",
  aboutTitle: "Hello, we are The Graphic Standard, but you can call us TGS.",
  aboutBody:
    "We are a multi-disciplinary studio merging high-lift design and technology to create brand systems, websites, and digital experiences for ambitious organizations.",
  proofTitle: "We build and support Shopify storefronts for emerging brands.",
  proofBody:
    "Our work blends strategy, visual systems, storytelling, and technical execution into a seamless process for clients and their audiences.",
  theme: {
    primary: "#0d3d34",
    secondary: "#1e1e1e",
    cream: "#f4e7e2",
    accent: "#d9f44f",
    text: "#ffffff",
    darkText: "#1b1b1b",
    headingFont: "Inter Tight",
    bodyFont: "Inter",
  },
  clientLogos: ["R+Co", "Uchi", "Under Armour", "RLC", "Audi", "Perspire"],
  team: [
    { name: "Sarah Ellis", role: "Creative Director" },
    { name: "Ben Carter", role: "Strategy Lead" },
    { name: "Alex Moore", role: "Web Designer" },
    { name: "Lauren Kim", role: "Project Manager" },
    { name: "Rachel Stone", role: "Copywriter" },
    { name: "Drew Pike", role: "Developer" },
  ],
  deliverables: [
    {
      phase: "01",
      title: "Design Discovery",
      description:
        "A focused discovery phase to align on goals, audience, positioning, creative direction, and site priorities.",
      items: ["Creative intake", "Site goals", "Competitive review", "Moodboard direction"],
    },
    {
      phase: "02",
      title: "Website Definition",
      description:
        "A planning phase that defines content structure, user journeys, sitemap, key page requirements, and conversion goals.",
      items: ["Sitemap", "Page requirements", "Content hierarchy", "UX recommendations"],
    },
    {
      phase: "03",
      title: "Website Detailed Design",
      description:
        "A high-fidelity design phase for core website pages, components, responsive layouts, and visual design systems.",
      items: ["Homepage design", "Interior page designs", "Responsive design", "Design system"],
    },
    {
      phase: "04",
      title: "Copy Editing",
      description:
        "Light copy refinement to ensure the proposal, page content, and messaging feel polished, clear, and on-brand.",
      items: ["Headline refinement", "Page copy edits", "CTA recommendations", "Tone consistency"],
    },
  ],
};

export const blankProposal: Proposal = {
  ...starterProposal,
  id: "new-template",
  clientName: "New Client",
  slug: "new-client-proposal",
  status: "Draft",
};
