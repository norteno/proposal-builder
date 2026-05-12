import { Copy, Plus, Save } from "lucide-react";
import { ColorField, Field } from "./fields";
import { Button, Card, CardContent } from "./ui";
import type { Proposal } from "@/lib/types";
import type { Panel } from "./sidebar";

type Props = {
  proposal: Proposal;
  setProposal: React.Dispatch<React.SetStateAction<Proposal>>;
  activePanel: Panel;
  duplicateProposal: () => void;
};

function cloneProposal(proposal: Proposal): Proposal {
  return JSON.parse(JSON.stringify(proposal));
}

export function EditorPanel({ proposal, setProposal, activePanel, duplicateProposal }: Props) {
  const update = (path: string, value: unknown) => {
    setProposal((current) => {
      const next = cloneProposal(current) as unknown as Record<string, unknown>;
      const keys = path.split(".");
      let target = next;
      keys.slice(0, -1).forEach((key) => {
        target = target[key] as Record<string, unknown>;
      });
      target[keys.at(-1) as string] = value;
      return next as unknown as Proposal;
    });
  };

  const addTeamMember = () => setProposal((current) => ({ ...current, team: [...current.team, { name: "New Team Member", role: "Role" }] }));
  const addLogo = () => setProposal((current) => ({ ...current, clientLogos: [...current.clientLogos, "New Logo"] }));
  const addDeliverable = () =>
    setProposal((current) => ({
      ...current,
      deliverables: [
        ...current.deliverables,
        {
          phase: String(current.deliverables.length + 1).padStart(2, "0"),
          title: "New Deliverable",
          description: "Describe this phase or deliverable.",
          items: ["Included item"],
        },
      ],
    }));

  return (
    <section className="w-full border-r border-neutral-200 bg-neutral-50 p-4 lg:w-[420px] lg:shrink-0 lg:overflow-y-auto">
      <div className="sticky top-0 z-10 mb-4 flex items-center justify-between rounded-3xl border border-neutral-200 bg-white/90 p-3 backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Editing</p>
          <h2 className="font-semibold text-neutral-950">{proposal.clientName}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={duplicateProposal} title="Duplicate proposal"><Copy size={16} /></Button>
          <Button size="icon" title="Save proposal"><Save size={16} /></Button>
        </div>
      </div>

      {activePanel === "content" && (
        <Card><CardContent className="space-y-5">
          <Field label="Client Name" value={proposal.clientName} onChange={(value) => update("clientName", value)} />
          <Field label="Proposal Title" value={proposal.title} onChange={(value) => update("title", value)} />
          <Field label="Hero Eyebrow" value={proposal.eyebrow} onChange={(value) => update("eyebrow", value)} />
          <Field label="Letter to Client" value={proposal.introLetter} onChange={(value) => update("introLetter", value)} textarea />
          <Field label="About Title" value={proposal.aboutTitle} onChange={(value) => update("aboutTitle", value)} textarea />
          <Field label="About Body" value={proposal.aboutBody} onChange={(value) => update("aboutBody", value)} textarea />
          <Field label="Proof Section Title" value={proposal.proofTitle} onChange={(value) => update("proofTitle", value)} textarea />
          <Field label="Proof Section Body" value={proposal.proofBody} onChange={(value) => update("proofBody", value)} textarea />
        </CardContent></Card>
      )}

      {activePanel === "brand" && (
        <Card><CardContent className="space-y-4">
          <ColorField label="Primary" value={proposal.theme.primary} onChange={(value) => update("theme.primary", value)} />
          <ColorField label="Secondary" value={proposal.theme.secondary} onChange={(value) => update("theme.secondary", value)} />
          <ColorField label="Cream" value={proposal.theme.cream} onChange={(value) => update("theme.cream", value)} />
          <ColorField label="Accent" value={proposal.theme.accent} onChange={(value) => update("theme.accent", value)} />
          <Field label="Heading Font" value={proposal.theme.headingFont} onChange={(value) => update("theme.headingFont", value)} />
          <Field label="Body Font" value={proposal.theme.bodyFont} onChange={(value) => update("theme.bodyFont", value)} />
        </CardContent></Card>
      )}

      {activePanel === "logos" && (
        <Card><CardContent className="space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-semibold">Past Client Logos</h3><Button variant="outline" size="sm" onClick={addLogo}><Plus className="mr-2" size={14} /> Add</Button></div>
          {proposal.clientLogos.map((logo, index) => (
            <Field key={`${logo}-${index}`} label={`Logo ${index + 1}`} value={logo} onChange={(value) => {
              const next = [...proposal.clientLogos]; next[index] = value; update("clientLogos", next);
            }} />
          ))}
        </CardContent></Card>
      )}

      {activePanel === "team" && (
        <Card><CardContent className="space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-semibold">Team Members</h3><Button variant="outline" size="sm" onClick={addTeamMember}><Plus className="mr-2" size={14} /> Add</Button></div>
          {proposal.team.map((member, index) => (
            <div key={`${member.name}-${index}`} className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-4">
              <Field label="Name" value={member.name} onChange={(value) => { const next = [...proposal.team]; next[index] = { ...next[index], name: value }; update("team", next); }} />
              <Field label="Role" value={member.role} onChange={(value) => { const next = [...proposal.team]; next[index] = { ...next[index], role: value }; update("team", next); }} />
              <Field label="Image URL" value={member.imageUrl ?? ""} onChange={(value) => { const next = [...proposal.team]; next[index] = { ...next[index], imageUrl: value }; update("team", next); }} />
            </div>
          ))}
        </CardContent></Card>
      )}

      {activePanel === "deliverables" && (
        <Card><CardContent className="space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-semibold">Deliverables</h3><Button variant="outline" size="sm" onClick={addDeliverable}><Plus className="mr-2" size={14} /> Add</Button></div>
          {proposal.deliverables.map((item, index) => (
            <div key={`${item.title}-${index}`} className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-4">
              <Field label="Phase" value={item.phase} onChange={(value) => { const next = [...proposal.deliverables]; next[index] = { ...next[index], phase: value }; update("deliverables", next); }} />
              <Field label="Title" value={item.title} onChange={(value) => { const next = [...proposal.deliverables]; next[index] = { ...next[index], title: value }; update("deliverables", next); }} />
              <Field label="Description" value={item.description} textarea onChange={(value) => { const next = [...proposal.deliverables]; next[index] = { ...next[index], description: value }; update("deliverables", next); }} />
              <Field label="Included Items, comma separated" value={item.items.join(", ")} onChange={(value) => { const next = [...proposal.deliverables]; next[index] = { ...next[index], items: value.split(",").map((entry) => entry.trim()).filter(Boolean) }; update("deliverables", next); }} />
            </div>
          ))}
        </CardContent></Card>
      )}

      {activePanel === "settings" && (
        <Card><CardContent className="space-y-5">
          <Field label="URL Slug" value={proposal.slug} onChange={(value) => update("slug", value)} />
          <Field label="Status" value={proposal.status} onChange={(value) => update("status", value)} />
          <div className="rounded-3xl bg-neutral-950 p-4 text-white"><p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Preview URL</p><p className="mt-2 break-all text-sm">/proposals/{proposal.slug}</p></div>
        </CardContent></Card>
      )}
    </section>
  );
}
