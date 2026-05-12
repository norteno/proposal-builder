import { starterProposal } from "./starterProposal";
import { Proposal } from "./types";

const STORAGE_KEY = "proposal-builder:proposals";
const ACTIVE_KEY = "proposal-builder:active-id";

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || "proposal";
}

export function getStoredProposals(): Proposal[] {
  if (typeof window === "undefined") return [starterProposal];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [starterProposal];
    const parsed = JSON.parse(raw) as Proposal[];
    return Array.isArray(parsed) && parsed.length ? parsed : [starterProposal];
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
