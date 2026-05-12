"use client";

import { Eye, Plus, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import EditorPanel, { Panel, PanelNav } from "@/components/editor-panel";
import ProposalPreview from "@/components/proposal-preview";
import { Button } from "@/components/ui";
import { starterProposal } from "@/lib/starterProposal";
import { createSlug, getActiveProposalId, getStoredProposals, saveStoredProposals, setActiveProposalId } from "@/lib/storage";
import { Proposal } from "@/lib/types";

function cloneProposal(proposal: Proposal, proposals: Proposal[]): Proposal {
  const copyNumber = proposals.filter((item) => item.clientName.startsWith(proposal.clientName)).length + 1;
  const clientName = `${proposal.clientName} Copy ${copyNumber}`;
  const slug = `${createSlug(proposal.slug)}-copy-${copyNumber}`;
  return {
    ...structuredClone(proposal),
    id: `${proposal.id}-copy-${Date.now()}`,
    clientName,
    slug,
    status: "Draft"
  };
}

export default function Home() {
  const [proposals, setProposals] = useState<Proposal[]>([starterProposal]);
  const [proposal, setProposal] = useState<Proposal>(starterProposal);
  const [activePanel, setActivePanel] = useState<Panel>("content");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = getStoredProposals();
    const activeId = getActiveProposalId();
    const active = stored.find((item) => item.id === activeId) || stored[0] || starterProposal;
    setProposals(stored);
    setProposal(active);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setProposals((current) => {
      const exists = current.some((item) => item.id === proposal.id);
      const next = exists ? current.map((item) => (item.id === proposal.id ? proposal : item)) : [...current, proposal];
      saveStoredProposals(next);
      setActiveProposalId(proposal.id);
      return next;
    });
  }, [proposal, loaded]);

  const sortedProposals = useMemo(() => proposals, [proposals]);

  const selectProposal = (id: string) => {
    const selected = proposals.find((item) => item.id === id);
    if (!selected) return;
    setProposal(selected);
    setActiveProposalId(selected.id);
  };

  const saveNow = () => {
    const next = proposals.map((item) => (item.id === proposal.id ? proposal : item));
    saveStoredProposals(next);
    setProposals(next);
  };

  const duplicateProposal = () => {
    const nextProposal = cloneProposal(proposal, proposals);
    const next = [...proposals, nextProposal];
    setProposals(next);
    saveStoredProposals(next);
    setProposal(nextProposal);
    setActiveProposalId(nextProposal.id);
  };

  const createNewProposal = () => {
    const newProposal: Proposal = {
      ...structuredClone(starterProposal),
      id: `proposal-${Date.now()}`,
      clientName: "New Client",
      slug: `new-client-${Date.now()}`,
      status: "Draft"
    };
    const next = [...proposals, newProposal];
    setProposals(next);
    saveStoredProposals(next);
    setProposal(newProposal);
    setActiveProposalId(newProposal.id);
    setActivePanel("content");
  };

  const deleteCurrent = () => {
    if (proposals.length <= 1) return;
    const next = proposals.filter((item) => item.id !== proposal.id);
    const fallback = next[0];
    setProposals(next);
    saveStoredProposals(next);
    setProposal(fallback);
    setActiveProposalId(fallback.id);
  };

  const openPreview = () => {
    saveNow();
    window.open(`/proposals/${proposal.slug}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex h-screen bg-neutral-100 text-neutral-950">
      <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white p-4 lg:block">
        <div className="mb-5 rounded-3xl bg-neutral-950 p-5 text-white">
          <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 text-neutral-950"><Sparkles size={18} /></div>
          <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">Proposal OS</p>
          <h1 className="mt-2 text-xl font-semibold leading-tight">Brand & Website Proposal Builder</h1>
        </div>
        <label className="mb-5 block space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">Current Proposal</span>
          <select value={proposal.id} onChange={(event) => selectProposal(event.target.value)} className="w-full rounded-2xl border border-neutral-200 bg-white px-3 py-3 text-sm">
            {sortedProposals.map((item) => (
              <option key={item.id} value={item.id}>{item.clientName}</option>
            ))}
          </select>
        </label>
        <PanelNav activePanel={activePanel} setActivePanel={setActivePanel} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
        <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-3 lg:hidden">
          <strong>Proposal OS</strong>
          <select value={activePanel} onChange={(event) => setActivePanel(event.target.value as Panel)} className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm">
            <option value="content">Content</option>
            <option value="brand">Brand</option>
            <option value="logos">Logos</option>
            <option value="team">Team</option>
            <option value="deliverables">Deliverables</option>
            <option value="timeline">Timeline</option>
            <option value="pricing">Pricing</option>
            <option value="settings">Settings</option>
          </select>
        </div>

        <EditorPanel proposal={proposal} setProposal={setProposal} activePanel={activePanel} duplicateProposal={duplicateProposal} saveNow={saveNow} deleteCurrent={deleteCurrent} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Live Preview</p>
              <p className="text-sm font-medium">/proposals/{proposal.slug}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={createNewProposal}><Plus size={16} /> New</Button>
              <Button onClick={openPreview}><Eye size={16} /> Preview</Button>
            </div>
          </header>
          <ProposalPreview proposal={proposal} />
        </div>
      </div>
    </div>
  );
}
