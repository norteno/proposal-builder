import { FileText, Image, LayoutTemplate, Palette, Settings, Sparkles, Users } from "lucide-react";

export type Panel = "content" | "brand" | "logos" | "team" | "deliverables" | "settings";

export function Sidebar({ activePanel, setActivePanel }: { activePanel: Panel; setActivePanel: (panel: Panel) => void }) {
  const nav = [
    { id: "content", label: "Content", icon: FileText },
    { id: "brand", label: "Brand", icon: Palette },
    { id: "logos", label: "Logos", icon: Image },
    { id: "team", label: "Team", icon: Users },
    { id: "deliverables", label: "Deliverables", icon: LayoutTemplate },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white p-4 lg:block">
      <div className="mb-8 rounded-3xl bg-neutral-950 p-5 text-white">
        <div className="mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 text-neutral-950">
          <Sparkles size={18} />
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400">Proposal OS</p>
        <h1 className="mt-2 text-xl font-semibold leading-tight">Brand & Website Proposal Builder</h1>
      </div>
      <nav className="space-y-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                isActive ? "bg-neutral-950 text-white" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
