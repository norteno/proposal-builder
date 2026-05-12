import { starterProposal } from "./starterProposal";
import { LogoItem, Proposal } from "./types";

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

export function normalizeProposal(proposal: Partial<Proposal>): Proposal {
  return {
    ...starterProposal,
    ...proposal,
    theme: { ...starterProposal.theme, ...(proposal.theme || {}) },
    letterSigners: proposal.letterSigners?.length ? proposal.letterSigners : starterProposal.letterSigners,
    aboutImageUrl: proposal.aboutImageUrl || "",
    experienceImageUrl: proposal.experienceImageUrl || "",
    clientLogos: normalizeLogos(proposal.clientLogos),
    team: proposal.team?.length ? proposal.team : starterProposal.team,
    deliverables: proposal.deliverables?.length ? proposal.deliverables : starterProposal.deliverables
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
