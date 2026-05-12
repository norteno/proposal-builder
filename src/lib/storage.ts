import type { Proposal } from "./types";

const KEY = "proposal-builder:proposals";

export function loadProposals(fallback: Proposal[]): Proposal[] {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Proposal[];
    return Array.isArray(parsed) && parsed.length ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveProposals(proposals: Proposal[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(proposals));
}
