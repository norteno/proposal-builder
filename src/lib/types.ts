export type Theme = {
  primary: string;
  secondary: string;
  cream: string;
  accent: string;
  text: string;
  darkText: string;
  headingFont: string;
  bodyFont: string;
};

export type TeamMember = {
  name: string;
  role: string;
  imageUrl?: string;
};

export type Deliverable = {
  phase: string;
  title: string;
  description: string;
  items: string[];
};

export type Proposal = {
  id: string;
  clientName: string;
  slug: string;
  status: "Draft" | "Shared" | "Archived" | string;
  title: string;
  eyebrow: string;
  introLetter: string;
  aboutTitle: string;
  aboutBody: string;
  proofTitle: string;
  proofBody: string;
  theme: Theme;
  clientLogos: string[];
  team: TeamMember[];
  deliverables: Deliverable[];
};
