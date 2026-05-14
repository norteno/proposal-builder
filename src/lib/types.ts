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

export type SectionBodyColors = {
  hero: string;
  letter: string;
  about: string;
  experience: string;
  team: string;
  deliverables: string;
  timeline: string;
  pricing: string;
  handoff: string;
};

export type SectionTextColors = SectionBodyColors;

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

export type TimelineItem = {
  label: string;
  duration: string;
  startMonth: number;
  endMonth: number;
  color: string;
};

export type PricingItem = {
  eyebrow: string;
  title: string;
  price: string;
  items: string[];
};

export type PricingModule = {
  eyebrow: string;
  title: string;
  totalLabel: string;
  totalTitle: string;
  totalDescription: string;
  totalPrice: string;
  splitLabel: string;
  totalBoxBackgroundColor: string;
  cardBackgroundColor: string;
  items: PricingItem[];
};

export type Proposal = {
  id: string;
  clientName: string;
  slug: string;
  status: string;
  title: string;
  eyebrow: string;
  heroIntro: string;
  heroCreatedDate: string;
  introLetter: string;
  letterSigners: LetterSigner[];
  aboutTitle: string;
  aboutBody: string;
  aboutImageUrl?: string;
  proofTitle: string;
  proofBody: string;
  experienceImageUrl?: string;
  studioLogoUrl?: string;
  headerText: string;
  theme: ProposalTheme;
  sectionBodyColors: SectionBodyColors;
  sectionTextColors: SectionTextColors;
  clientLogos: LogoItem[];
  team: TeamMember[];
  deliverables: Deliverable[];
  timeline: TimelineItem[];
  timelineNote: string;
  pricing: PricingModule;
};
