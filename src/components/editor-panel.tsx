"use client";

import { Copy, FileText, Image, LayoutTemplate, Palette, Plus, Save, Settings, Trash2, Upload, Users, X, CalendarDays, DollarSign } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { Proposal } from "@/lib/types";

export type Panel = "content" | "brand" | "logos" | "team" | "deliverables" | "timeline" | "pricing" | "settings";

function Field({ label, value, onChange, textarea = false, type = "text" }: { label: string; value: string | number; onChange: (value: string) => void; textarea?: boolean; type?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">{label}</span>
      {textarea ? (
        <textarea value={String(value)} onChange={(event) => onChange(event.target.value)} className="min-h-[112px] w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900" />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-900" />
      )}
    </label>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-3">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">{label}</span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-transparent p-0" />
        <span className="w-20 text-xs text-neutral-500">{value}</span>
      </div>
    </label>
  );
}

function ImageUpload({ label, value, onChange }: { label: string; value?: string; onChange: (value: string) => void }) {
  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">{label}</span>
      <div className="rounded-2xl border border-neutral-200 bg-white p-3">
        {value ? (
          <div className="mb-3 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Uploaded preview" className="h-32 w-full object-cover" />
          </div>
        ) : (
          <div className="mb-3 flex h-28 items-center justify-center rounded-xl bg-neutral-100 text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">No image uploaded</div>
        )}
        <div className="flex flex-wrap gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-neutral-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800">
            <Upload size={14} /> Upload image
            <input type="file" accept="image/*" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} />
          </label>
          {value ? <Button variant="outline" size="sm" onClick={() => onChange("")}><X size={14} /> Remove</Button> : null}
        </div>
        <p className="mt-2 text-xs leading-5 text-neutral-400">Images are saved in your browser storage for now. Later, this can be replaced with real cloud uploads.</p>
      </div>
    </div>
  );
}

export function PanelNav({ activePanel, setActivePanel }: { activePanel: Panel; setActivePanel: (panel: Panel) => void }) {
  const nav = [
    { id: "content", label: "Content", icon: FileText },
    { id: "brand", label: "Brand", icon: Palette },
    { id: "logos", label: "Logos", icon: Image },
    { id: "team", label: "Team", icon: Users },
    { id: "deliverables", label: "Deliverables", icon: LayoutTemplate },
    { id: "timeline", label: "Timeline", icon: CalendarDays },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings }
  ] as const;

  return (
    <nav className="space-y-2">
      {nav.map((item) => {
        const Icon = item.icon;
        const isActive = activePanel === item.id;
        return (
          <button key={item.id} onClick={() => setActivePanel(item.id)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${isActive ? "bg-neutral-950 text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"}`}>
            <Icon size={18} />{item.label}
          </button>
        );
      })}
    </nav>
  );
}

export default function EditorPanel({ proposal, setProposal, activePanel, duplicateProposal, saveNow, deleteCurrent }: { proposal: Proposal; setProposal: React.Dispatch<React.SetStateAction<Proposal>>; activePanel: Panel; duplicateProposal: () => void; saveNow: () => void; deleteCurrent: () => void; }) {
  const update = (path: string, value: unknown) => {
    setProposal((current) => {
      const next = structuredClone(current);
      const keys = path.split(".");
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>;
      keys.slice(0, -1).forEach((key) => { target = target[key] as Record<string, unknown>; });
      target[keys.at(-1) as string] = value;
      return next;
    });
  };

  const addLogo = () => update("clientLogos", [...proposal.clientLogos, { name: "New Logo", imageUrl: "" }]);
  const addSigner = () => update("letterSigners", [...proposal.letterSigners, { name: "New Signer", role: "Role", imageUrl: "" }]);
  const addTeamMember = () => update("team", [...proposal.team, { name: "New Team Member", role: "Role", imageUrl: "" }]);
  const addDeliverable = () => update("deliverables", [...proposal.deliverables, { phase: String(proposal.deliverables.length + 1).padStart(2, "0"), title: "New Deliverable", description: "Describe this phase or deliverable.", items: ["Included item"] }]);
  const addTimelineItem = () => update("timeline", [...proposal.timeline, { label: "New Phase", duration: "4 weeks", startMonth: 1, endMonth: 2, color: proposal.theme.accent }]);
  const addPricingItem = () => update("pricing.items", [...proposal.pricing.items, { eyebrow: proposal.clientName, title: "New Pricing Item", price: "$0", items: ["Included item"] }]);

  return (
    <section className="w-full border-r border-neutral-200 bg-neutral-50 p-4 lg:w-[420px] lg:shrink-0 lg:overflow-y-auto">
      <div className="sticky top-0 z-10 mb-4 flex items-center justify-between rounded-3xl border border-neutral-200 bg-white/90 p-3 backdrop-blur">
        <div><p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Editing</p><h2 className="font-semibold text-neutral-950">{proposal.clientName}</h2></div>
        <div className="flex gap-2"><Button variant="outline" size="icon" onClick={duplicateProposal} title="Duplicate proposal"><Copy size={16} /></Button><Button size="icon" onClick={saveNow} title="Save proposal"><Save size={16} /></Button></div>
      </div>

      {activePanel === "content" && <Card><CardContent className="space-y-5">
        <Field label="Client Name" value={proposal.clientName} onChange={(value) => update("clientName", value)} />
        <Field label="Proposal Title" value={proposal.title} onChange={(value) => update("title", value)} />
        <Field label="Hero Eyebrow" value={proposal.eyebrow} onChange={(value) => update("eyebrow", value)} />
        <Field label="Letter to Client" value={proposal.introLetter} onChange={(value) => update("introLetter", value)} textarea />
        <div className="rounded-3xl border border-neutral-200 bg-white p-4"><div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Letter signers</h3><Button variant="outline" size="sm" onClick={addSigner}><Plus size={14} /> Add</Button></div><div className="space-y-4">{proposal.letterSigners.map((signer, index) => <div key={`signer-${index}`} className="space-y-3 rounded-2xl bg-neutral-50 p-3"><ImageUpload label="Signer Image" value={signer.imageUrl} onChange={(value) => { const next = [...proposal.letterSigners]; next[index] = { ...next[index], imageUrl: value }; update("letterSigners", next); }} /><Field label="Signer Name" value={signer.name} onChange={(value) => { const next = [...proposal.letterSigners]; next[index] = { ...next[index], name: value }; update("letterSigners", next); }} /><Field label="Signer Role" value={signer.role} onChange={(value) => { const next = [...proposal.letterSigners]; next[index] = { ...next[index], role: value }; update("letterSigners", next); }} /><Button variant="ghost" size="sm" onClick={() => update("letterSigners", proposal.letterSigners.filter((_, i) => i !== index))}><Trash2 size={14} /> Remove signer</Button></div>)}</div></div>
        <Field label="About Title" value={proposal.aboutTitle} onChange={(value) => update("aboutTitle", value)} textarea />
        <Field label="About Body" value={proposal.aboutBody} onChange={(value) => update("aboutBody", value)} textarea />
        <ImageUpload label="About Studio Image" value={proposal.aboutImageUrl} onChange={(value) => update("aboutImageUrl", value)} />
        <Field label="Experience Section Title" value={proposal.proofTitle} onChange={(value) => update("proofTitle", value)} textarea />
        <Field label="Experience Section Body" value={proposal.proofBody} onChange={(value) => update("proofBody", value)} textarea />
        <ImageUpload label="Experience Section Image" value={proposal.experienceImageUrl} onChange={(value) => update("experienceImageUrl", value)} />
      </CardContent></Card>}

      {activePanel === "brand" && <Card><CardContent className="space-y-4">
        <h3 className="font-semibold">Global Theme</h3>
        <ColorField label="Primary" value={proposal.theme.primary} onChange={(value) => update("theme.primary", value)} />
        <ColorField label="Secondary" value={proposal.theme.secondary} onChange={(value) => update("theme.secondary", value)} />
        <ColorField label="Cream" value={proposal.theme.cream} onChange={(value) => update("theme.cream", value)} />
        <ColorField label="Accent" value={proposal.theme.accent} onChange={(value) => update("theme.accent", value)} />
        <Field label="Heading Font" value={proposal.theme.headingFont} onChange={(value) => update("theme.headingFont", value)} />
        <Field label="Body Font" value={proposal.theme.bodyFont} onChange={(value) => update("theme.bodyFont", value)} />
        <div className="border-t border-neutral-200 pt-4"><h3 className="mb-3 font-semibold">Body Copy Colors Per Section</h3><div className="space-y-3">
          <ColorField label="Hero Copy" value={proposal.sectionBodyColors.hero} onChange={(value) => update("sectionBodyColors.hero", value)} />
          <ColorField label="Letter Copy" value={proposal.sectionBodyColors.letter} onChange={(value) => update("sectionBodyColors.letter", value)} />
          <ColorField label="About Copy" value={proposal.sectionBodyColors.about} onChange={(value) => update("sectionBodyColors.about", value)} />
          <ColorField label="Experience Copy" value={proposal.sectionBodyColors.experience} onChange={(value) => update("sectionBodyColors.experience", value)} />
          <ColorField label="Team Copy" value={proposal.sectionBodyColors.team} onChange={(value) => update("sectionBodyColors.team", value)} />
          <ColorField label="Deliverables Copy" value={proposal.sectionBodyColors.deliverables} onChange={(value) => update("sectionBodyColors.deliverables", value)} />
          <ColorField label="Timeline Copy" value={proposal.sectionBodyColors.timeline} onChange={(value) => update("sectionBodyColors.timeline", value)} />
          <ColorField label="Pricing Copy" value={proposal.sectionBodyColors.pricing} onChange={(value) => update("sectionBodyColors.pricing", value)} />
        </div></div>
      </CardContent></Card>}

      {activePanel === "logos" && <Card><CardContent className="space-y-4"><div className="flex items-center justify-between"><h3 className="font-semibold">Past Client Logos</h3><Button variant="outline" size="sm" onClick={addLogo}><Plus size={14} /> Add</Button></div>{proposal.clientLogos.map((logo, index) => <div key={`logo-${index}`} className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-4"><ImageUpload label={`Logo ${index + 1} Image`} value={logo.imageUrl} onChange={(value) => { const next = [...proposal.clientLogos]; next[index] = { ...next[index], imageUrl: value }; update("clientLogos", next); }} /><Field label={`Logo ${index + 1} Name`} value={logo.name} onChange={(value) => { const next = [...proposal.clientLogos]; next[index] = { ...next[index], name: value }; update("clientLogos", next); }} /><Button variant="ghost" size="sm" onClick={() => update("clientLogos", proposal.clientLogos.filter((_, i) => i !== index))}><Trash2 size={14} /> Remove logo</Button></div>)}</CardContent></Card>}

      {activePanel === "team" && <Card><CardContent className="space-y-4"><div className="flex items-center justify-between"><h3 className="font-semibold">Team Members</h3><Button variant="outline" size="sm" onClick={addTeamMember}><Plus size={14} /> Add</Button></div>{proposal.team.map((member, index) => <div key={`member-${index}`} className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-4"><ImageUpload label="Headshot" value={member.imageUrl} onChange={(value) => { const next = [...proposal.team]; next[index] = { ...next[index], imageUrl: value }; update("team", next); }} /><Field label="Name" value={member.name} onChange={(value) => { const next = [...proposal.team]; next[index] = { ...next[index], name: value }; update("team", next); }} /><Field label="Role" value={member.role} onChange={(value) => { const next = [...proposal.team]; next[index] = { ...next[index], role: value }; update("team", next); }} /><Button variant="ghost" size="sm" onClick={() => update("team", proposal.team.filter((_, i) => i !== index))}><Trash2 size={14} /> Remove</Button></div>)}</CardContent></Card>}

      {activePanel === "deliverables" && <Card><CardContent className="space-y-4"><div className="flex items-center justify-between"><h3 className="font-semibold">Deliverables</h3><Button variant="outline" size="sm" onClick={addDeliverable}><Plus size={14} /> Add</Button></div>{proposal.deliverables.map((item, index) => <div key={`deliverable-${index}`} className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-4"><Field label="Phase" value={item.phase} onChange={(value) => { const next = [...proposal.deliverables]; next[index] = { ...next[index], phase: value }; update("deliverables", next); }} /><Field label="Title" value={item.title} onChange={(value) => { const next = [...proposal.deliverables]; next[index] = { ...next[index], title: value }; update("deliverables", next); }} /><Field label="Description" value={item.description} textarea onChange={(value) => { const next = [...proposal.deliverables]; next[index] = { ...next[index], description: value }; update("deliverables", next); }} /><Field label="Included Items, comma separated" value={item.items.join(", ")} onChange={(value) => { const next = [...proposal.deliverables]; next[index] = { ...next[index], items: value.split(",").map((entry) => entry.trim()).filter(Boolean) }; update("deliverables", next); }} /><Button variant="ghost" size="sm" onClick={() => update("deliverables", proposal.deliverables.filter((_, i) => i !== index))}><Trash2 size={14} /> Remove</Button></div>)}</CardContent></Card>}

      {activePanel === "timeline" && <Card><CardContent className="space-y-4"><div className="flex items-center justify-between"><h3 className="font-semibold">Timeline</h3><Button variant="outline" size="sm" onClick={addTimelineItem}><Plus size={14} /> Add</Button></div><Field label="Timeline Note" value={proposal.timelineNote} onChange={(value) => update("timelineNote", value)} textarea />{proposal.timeline.map((item, index) => <div key={`timeline-${index}`} className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-4"><Field label="Label" value={item.label} onChange={(value) => { const next = [...proposal.timeline]; next[index] = { ...next[index], label: value }; update("timeline", next); }} /><Field label="Duration" value={item.duration} onChange={(value) => { const next = [...proposal.timeline]; next[index] = { ...next[index], duration: value }; update("timeline", next); }} /><div className="grid grid-cols-2 gap-3"><Field label="Start Month" type="number" value={item.startMonth} onChange={(value) => { const next = [...proposal.timeline]; next[index] = { ...next[index], startMonth: Number(value) }; update("timeline", next); }} /><Field label="End Month" type="number" value={item.endMonth} onChange={(value) => { const next = [...proposal.timeline]; next[index] = { ...next[index], endMonth: Number(value) }; update("timeline", next); }} /></div><ColorField label="Bar Color" value={item.color} onChange={(value) => { const next = [...proposal.timeline]; next[index] = { ...next[index], color: value }; update("timeline", next); }} /><Button variant="ghost" size="sm" onClick={() => update("timeline", proposal.timeline.filter((_, i) => i !== index))}><Trash2 size={14} /> Remove</Button></div>)}</CardContent></Card>}

      {activePanel === "pricing" && <Card><CardContent className="space-y-4"><h3 className="font-semibold">Pricing Module</h3><Field label="Eyebrow" value={proposal.pricing.eyebrow} onChange={(value) => update("pricing.eyebrow", value)} /><Field label="Title" value={proposal.pricing.title} onChange={(value) => update("pricing.title", value)} /><Field label="Total Label" value={proposal.pricing.totalLabel} onChange={(value) => update("pricing.totalLabel", value)} /><Field label="Total Title" value={proposal.pricing.totalTitle} onChange={(value) => update("pricing.totalTitle", value)} /><Field label="Total Description" value={proposal.pricing.totalDescription} textarea onChange={(value) => update("pricing.totalDescription", value)} /><Field label="Total Price" value={proposal.pricing.totalPrice} onChange={(value) => update("pricing.totalPrice", value)} /><Field label="Split Label" value={proposal.pricing.splitLabel} onChange={(value) => update("pricing.splitLabel", value)} /><div className="flex items-center justify-between border-t border-neutral-200 pt-4"><h3 className="font-semibold">Pricing Cards</h3><Button variant="outline" size="sm" onClick={addPricingItem}><Plus size={14} /> Add</Button></div>{proposal.pricing.items.map((item, index) => <div key={`pricing-${index}`} className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-4"><Field label="Eyebrow" value={item.eyebrow} onChange={(value) => { const next = [...proposal.pricing.items]; next[index] = { ...next[index], eyebrow: value }; update("pricing.items", next); }} /><Field label="Title" value={item.title} onChange={(value) => { const next = [...proposal.pricing.items]; next[index] = { ...next[index], title: value }; update("pricing.items", next); }} /><Field label="Price" value={item.price} onChange={(value) => { const next = [...proposal.pricing.items]; next[index] = { ...next[index], price: value }; update("pricing.items", next); }} /><Field label="Included Items, comma separated" value={item.items.join(", ")} textarea onChange={(value) => { const next = [...proposal.pricing.items]; next[index] = { ...next[index], items: value.split(",").map((entry) => entry.trim()).filter(Boolean) }; update("pricing.items", next); }} /><Button variant="ghost" size="sm" onClick={() => update("pricing.items", proposal.pricing.items.filter((_, i) => i !== index))}><Trash2 size={14} /> Remove</Button></div>)}</CardContent></Card>}

      {activePanel === "settings" && <Card><CardContent className="space-y-5"><Field label="URL Slug" value={proposal.slug} onChange={(value) => update("slug", value)} /><Field label="Status" value={proposal.status} onChange={(value) => update("status", value)} /><div className="rounded-3xl bg-neutral-950 p-4 text-white"><p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Preview URL</p><p className="mt-2 break-all text-sm">/proposals/{proposal.slug}</p></div><Button variant="danger" onClick={deleteCurrent}><Trash2 size={16} /> Delete this proposal</Button></CardContent></Card>}
    </section>
  );
}
