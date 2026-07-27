import { starterProposal } from "./starterProposal";
import { LogoItem, PricingItem, Proposal, TimelineItem, TimelineUnit } from "./types";

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

function normalizeTimelineUnit(value: unknown): TimelineUnit {
  return value === "weeks" ? "weeks" : "months";
}


function normalizeTimelineLength(value: unknown, timeline: unknown): number {
  const explicitLength = Number(value);
  const timelineItems = Array.isArray(timeline) ? timeline : [];
  const largestEnd = timelineItems.reduce((max, item) => {
    if (!item || typeof item !== "object") return max;
    const end = Number((item as Partial<TimelineItem>).endMonth);
    return Number.isFinite(end) ? Math.max(max, Math.ceil(end)) : max;
  }, 0);

  if (Number.isFinite(explicitLength) && explicitLength >= 1) {
    return Math.max(1, Math.round(explicitLength));
  }

  return Math.max(starterProposal.timelineLength || 7, largestEnd || 0);
}

function normalizeTimeline(timeline: unknown): TimelineItem[] {
  if (!Array.isArray(timeline)) return starterProposal.timeline;
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
  if (!Array.isArray(items)) return starterProposal.pricing.items;
  return items.map((item) => {
    const entry = item && typeof item === "object" ? (item as Partial<PricingItem> & { description?: string; note?: string }) : {};
    return {
      eyebrow: entry.eyebrow || entry.note || "",
      title: entry.title || "Pricing Item",
      price: entry.price || "$0",
      items: Array.isArray(entry.items) ? entry.items : entry.description ? [entry.description] : []
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
    letterSigners: Array.isArray(proposal.letterSigners) ? proposal.letterSigners : starterProposal.letterSigners,
    aboutImageUrl: proposal.aboutImageUrl || "",
    experienceImageUrl: proposal.experienceImageUrl || "",
    studioLogoUrl: proposal.studioLogoUrl || "",
    heroIntro: proposal.heroIntro || starterProposal.heroIntro,
    heroCreatedDate: proposal.heroCreatedDate || starterProposal.heroCreatedDate,
    headerText: proposal.headerText || starterProposal.headerText,
    clientLogos: normalizeLogos(proposal.clientLogos),
    team: proposal.team?.length ? proposal.team : starterProposal.team,
    deliverables: proposal.deliverables?.length ? proposal.deliverables : starterProposal.deliverables,
    timelineUnit: normalizeTimelineUnit(proposal.timelineUnit),
    timelineLength: normalizeTimelineLength(proposal.timelineLength, proposal.timeline),
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
