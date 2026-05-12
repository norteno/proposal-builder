"use client";

import { useEffect, useState } from "react";
import { Eye, Plus, Trash2 } from "lucide-react";
import { EditorPanel } from "@/components/editor-panel";
import { ProposalPreview } from "@/components/proposal-preview";
import { Sidebar, type Panel } from "@/components/sidebar";
import { Button } from "@/components/ui";
import { blankProposal, starterProposal } from "@/lib/starterProposal";
import { loadProposals, saveProposals } from "@/lib/storage";
import type { Proposal } from "@/lib/types";

function cloneProposal(proposal: Proposal): Proposal {
  return JSON.parse(JSON.stringify(proposal));
}

export default function ProposalBuilderPage() {
  const [activePanel, setActivePanel] = useState<Panel>("content");
  const [proposals, setProposals] = useState<Proposal[]>([starterProposal]);
  const [activeProposalId, setActiveProposalId] = useState(starterProposal.id);
  const activeProposal = proposals.find((proposal) => proposal.id === activeProposalId) ?? proposals[0];

  useEffect(() => {
    const loaded = loadProposals([starterProposal]);
    setProposals(loaded);
    setActiveProposalId(loaded[0].id);
  }, []);

  useEffect(() => {
    saveProposals(proposals);
  }, [proposals]);

  const setProposal = (updater: React.SetStateAction<Proposal>) => {
    setProposals((current) =>
      current.map((proposal) => {
        if (proposal.id !== activeProposal.id) return proposal;
        return typeof updater === "function" ? (updater as (proposal: Proposal) => Proposal)(proposal) : updater;
      })
    );
  };

  const duplicateProposal = () => {
    const copy = cloneProposal(activeProposal);
    const id = `${copy.id}-copy-${Date.now()}`;
    const duplicate: Proposal = {
      ...copy,
      id,
      clientName: `${copy.clientName} Copy`,
      slug: `${copy.slug}-copy`,
      status: "Draft",
    };
    setProposals((current) => [duplicate, ...current]);
    setActiveProposalId(id);
  };

  const createNewProposal = () => {
    const id = `proposal-${Date.now()}`;
    const next = { ...cloneProposal(blankProposal), id };
    setProposals((current) => [next, ...current]);
    setActiveProposalId(id);
    setActivePanel("content");
  };

  const deleteActiveProposal = () => {
    if (proposals.length === 1) return;
    const remaining = proposals.filter((proposal) => proposal.id !== activeProposal.id);
    setProposals(remaining);
    setActiveProposalId(remaining[0].id);
  };

  return (
    <div className="flex h-screen bg-neutral-100 text-neutral-950">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
        <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-3 lg:hidden">
          <strong>Proposal OS</strong>
          <select value={activePanel} onChange={(event) => setActivePanel(event.target.value as Panel)} className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm">
            <option value="content">Content</option>
            <option value="brand">Brand</option>
            <option value="logos">Logos</option>
            <option value="team">Team</option>
            <option value="deliverables">Deliverables</option>
            <option value="settings">Settings</option>
          </select>
        </div>

        <EditorPanel proposal={activeProposal} setProposal={setProposal} activePanel={activePanel} duplicateProposal={duplicateProposal} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-white px-5 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Live Preview</p>
              <p className="text-sm font-medium">/proposals/{activeProposal.slug}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={activeProposal.id}
                onChange={(event) => setActiveProposalId(event.target.value)}
                className="h-11 rounded-2xl border border-neutral-200 bg-white px-3 text-sm"
              >
                {proposals.map((proposal) => <option key={proposal.id} value={proposal.id}>{proposal.clientName}</option>)}
              </select>
              <Button variant="outline" onClick={createNewProposal}><Plus className="mr-2" size={16} /> New</Button>
              <Button variant="outline" disabled={proposals.length === 1} onClick={deleteActiveProposal}><Trash2 className="mr-2" size={16} /> Delete</Button>
              <Button><Eye className="mr-2" size={16} /> Preview</Button>
            </div>
          </header>
          <ProposalPreview proposal={activeProposal} />
        </div>
      </div>
    </div>
  );
}
