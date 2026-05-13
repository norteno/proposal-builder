import { starterProposal } from "./starterProposal";
import { LogoItem, PricingItem, Proposal, TimelineItem } from "./types";

const STORAGE_KEY = "proposal-builder:proposals";
const ACTIVE_KEY = "proposal-builder:active-id";

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || "proposal";
}

function normalizeLogos(logos: unknown): LogoItem[] {
  if (!Array.isArray(logos)) return starterProposal.clientLogos;
  return logos.map((logo) => {
    if (typeof logo === "string") return { name: logo };
    if (logo && typeof logo === "object") {
      const item = logo as Partial<LogoItem>;
      return { name: item.name || "Logo", imageUrl: item.imageUrl || "" };
    }
    return { name: "Logo" };
  });
}

function normalizeTimeline(timeline: unknown): TimelineItem[] {
  if (!Array.isArray(timeline) || !timeline.length) return starterProposal.timeline;
  return timeline.map((item, index) => {
    const entry = item && typeof item === "object" ? (item as Partial<TimelineItem> & { title?: string }) : {};
    return {
      label: entry.label || entry.title || `Phase ${index + 1}`,
      duration: entry.duration || "",
      startMonth: Number(entry.startMonth || index + 1),
      endMonth: Number(entry.endMonth || index + 2),
      color: entry.color || starterProposal.timeline[index % starterProposal.timeline.length]?.color || starterProposal.theme.accent
    };
  });
}

function normalizePricingItems(items: unknown): PricingItem[] {
  if (!Array.isArray(items) || !items.length) return starterProposal.pricing.items;
  return items.map((item) => {
    const entry = item && typeof item === "object" ? (item as Partial<PricingItem> & { description?: string; note?: string }) : {};
    return {
      eyebrow: entry.eyebrow || entry.note || "",
      title: entry.title || "Pricing Item",
      price: entry.price || "$0",
      items: Array.isArray(entry.items) && entry.items.length ? entry.items : entry.description ? [entry.description] : []
    };
  });
}

export function normalizeProposal(proposal: Partial<Proposal>): Proposal {
  const incomingPricing = proposal.pricing as unknown;
  return {
    ...starterProposal,
    ...proposal,
    theme: { ...starterProposal.theme, ...(proposal.theme || {}) },
    sectionBodyColors: { ...starterProposal.sectionBodyColors, ...(proposal.sectionBodyColors || {}) },
    sectionTextColors: { ...starterProposal.sectionTextColors, ...(proposal.sectionTextColors || {}) },
    letterSigners: proposal.letterSigners?.length ? proposal.letterSigners : starterProposal.letterSigners,
    aboutImageUrl: proposal.aboutImageUrl || "",
    experienceImageUrl: proposal.experienceImageUrl || "",
    studioLogoUrl: proposal.studioLogoUrl || "",
    heroIntro: proposal.heroIntro || starterProposal.heroIntro,
    headerText: proposal.headerText || starterProposal.headerText,
    clientLogos: normalizeLogos(proposal.clientLogos),
    team: proposal.team?.length ? proposal.team : starterProposal.team,
    deliverables: proposal.deliverables?.length ? proposal.deliverables : starterProposal.deliverables,
    timeline: normalizeTimeline(proposal.timeline),
    timelineNote: proposal.timelineNote || starterProposal.timelineNote,
    pricing: {
      ...starterProposal.pricing,
      ...(incomingPricing && typeof incomingPricing === "object" && !Array.isArray(incomingPricing) ? incomingPricing : {}),
      items: normalizePricingItems(Array.isArray(incomingPricing) ? incomingPricing : proposal.pricing?.items)
    }
  };
}

export function getStoredProposals(): Proposal[] {
  if (typeof window === "undefined") return [starterProposal];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [starterProposal];
    const parsed = JSON.parse(raw) as Partial<Proposal>[];
    return Array.isArray(parsed) && parsed.length ? parsed.map(normalizeProposal) : [starterProposal];
  } catch {
    return [starterProposal];
  }
}

export function saveStoredProposals(proposals: Proposal[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
}

export function getActiveProposalId() {
  if (typeof window === "undefined") return starterProposal.id;
  return window.localStorage.getItem(ACTIVE_KEY) || starterProposal.id;
}

export function setActiveProposalId(id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACTIVE_KEY, id);
}

export function findProposalBySlug(slug: string): Proposal | undefined {
  return getStoredProposals().find((proposal) => proposal.slug === slug);
}
