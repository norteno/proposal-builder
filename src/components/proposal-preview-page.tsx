"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProposalPreview from "@/components/proposal-preview";
import { getRemoteProposalBySlug } from "@/lib/proposals-api";
import { findProposalBySlug } from "@/lib/storage";
import { starterProposal } from "@/lib/starterProposal";
import { hasSupabaseConfig } from "@/lib/supabase";
import { Proposal } from "@/lib/types";

export default function ProposalPreviewPage({ slug }: { slug: string }) {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadProposal = async () => {
      setLoading(true);
      try {
        let found: Proposal | null | undefined = null;

        if (hasSupabaseConfig) {
          found = await getRemoteProposalBySlug(slug);
        }

        if (!found) {
          found = findProposalBySlug(slug);
        }

        if (!cancelled) {
          setProposal(found || (slug === starterProposal.slug ? starterProposal : null));
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          const local = findProposalBySlug(slug);
          setProposal(local || (slug === starterProposal.slug ? starterProposal : null));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProposal();
    window.addEventListener("storage", loadProposal);
    window.addEventListener("focus", loadProposal);

    return () => {
      cancelled = true;
      window.removeEventListener("storage", loadProposal);
      window.removeEventListener("focus", loadProposal);
    };
  }, [slug]);

  if (loading && !proposal) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-6">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">Loading proposal</p>
        </div>
      </main>
    );
  }

  if (!proposal) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 p-6">
        <div className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">Proposal not found</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.04em]">No proposal exists for this URL.</h1>
          <p className="mt-4 text-neutral-600">Go back to the builder, save the proposal, and try the Preview button again.</p>
          <Link href="/" className="mt-6 inline-flex rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-bold text-white">Back to Builder</Link>
        </div>
      </main>
    );
  }

  return (
    <div>
      <div className="fixed right-4 top-4 z-50 flex gap-2 rounded-2xl bg-white/90 p-2 shadow-xl backdrop-blur">
        <Link href="/" className="rounded-xl bg-neutral-950 px-4 py-2 text-xs font-bold text-white">Edit</Link>
      </div>
      <ProposalPreview proposal={proposal} clean />
    </div>
  );
}
