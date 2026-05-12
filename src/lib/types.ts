export type ProposalTheme = {
  primary: string;
  secondary: string;
  cream: string;
  accent: string;
  text: string;
  darkText: string;
  headingFont: string;
  bodyFont: string;
};

export type LetterSigner = {
  name: string;
  role: string;
  imageUrl?: string;
};

export type LogoItem = {
  name: string;
  imageUrl?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
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
  status: string;
  title: string;
  eyebrow: string;
  introLetter: string;
  letterSigners: LetterSigner[];
  aboutTitle: string;
  aboutBody: string;
  aboutImageUrl?: string;
  proofTitle: string;
  proofBody: string;
  experienceImageUrl?: string;
  theme: ProposalTheme;
  clientLogos: LogoItem[];
  team: TeamMember[];
  deliverables: Deliverable[];
};
