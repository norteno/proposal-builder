"use client";

import { motion } from "framer-motion";
import { Proposal } from "@/lib/types";

export default function ProposalPreview({ proposal, clean = false }: { proposal: Proposal; clean?: boolean }) {
  const titleWords = proposal.title.split(" ");
  const lastWord = titleWords.pop() || "Proposal";

  const themeVars = {
    "--primary": proposal.theme.primary,
    "--secondary": proposal.theme.secondary,
    "--cream": proposal.theme.cream,
    "--accent": proposal.theme.accent,
    "--proposal-text": proposal.theme.text,
    "--dark-text": proposal.theme.darkText,
    "--font-heading": proposal.theme.headingFont,
    "--font-body": proposal.theme.bodyFont
  } as React.CSSProperties;

  return (
    <main className={clean ? "min-h-screen bg-neutral-200" : "flex-1 overflow-y-auto bg-neutral-200 p-3 sm:p-5"}>
      <div
        className={`${clean ? "mx-auto max-w-6xl" : "mx-auto max-w-5xl overflow-hidden rounded-[2rem] shadow-2xl"} bg-white`}
        style={themeVars}
      >
        <section className="relative min-h-[680px] bg-[var(--primary)] px-8 py-10 text-[var(--proposal-text)] sm:px-16 sm:py-14">
          <div className="flex items-start justify-between text-xs uppercase tracking-[0.22em] text-white/70">
            <span>TGS /</span>
            <span>The Graphic Standard</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-44 max-w-2xl"
          >
            <span className="inline-flex rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--dark-text)]">
              {proposal.eyebrow} {proposal.clientName}
            </span>
            <h1 className="mt-6 font-display text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-7xl">
              {titleWords.join(" ")} <em className="font-serif text-[var(--accent)]">{lastWord}</em>
            </h1>
            <div className="mt-10 grid gap-6 border-t border-white/20 pt-6 text-sm text-white/70 sm:grid-cols-[1fr_220px]">
              <p>{proposal.introLetter}</p>
              <div className="border-l border-white/20 pl-5">
                <p className="uppercase tracking-[0.18em]">Prepared By</p>
                <p className="mt-2 text-white">The Graphic Standard</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="bg-[var(--secondary)] px-8 py-20 text-white sm:px-24">
          <div className="mx-auto max-w-2xl">
            <p className="mb-8 text-xs uppercase tracking-[0.24em] text-white/40">Letter</p>
            <p className="text-lg leading-8 text-white/80">{proposal.introLetter}</p>
            <div className="mt-10 flex gap-8 text-sm text-white/60">
              <div>
                <div className="h-10 w-10 rounded-full bg-white/20" />
                <p className="mt-3 text-white">Amanda Spain</p>
                <p>Creative Partner</p>
              </div>
              <div>
                <div className="h-10 w-10 rounded-full bg-white/20" />
                <p className="mt-3 text-white">TGS Team</p>
                <p>Design & Development</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--cream)] px-8 py-20 text-[var(--dark-text)] sm:px-20">
          <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr]">
            <div className="flex gap-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-32 w-24 rounded-t-full bg-neutral-800/80 shadow-xl" />
              ))}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">About the studio</p>
              <h2 className="mt-4 max-w-lg font-display text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
                {proposal.aboutTitle}
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-neutral-700">{proposal.aboutBody}</p>
            </div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-neutral-900/10 pt-8">
            {proposal.clientLogos.map((logo) => (
              <span key={logo} className="text-sm font-black uppercase tracking-[-0.04em] text-neutral-900/70">
                {logo}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-[var(--primary)] px-8 py-20 text-white sm:px-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">Experience</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
                {proposal.proofTitle}
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70">{proposal.proofBody}</p>
            </div>
            <div className="aspect-[4/3] rounded-3xl bg-white/15 p-4 shadow-2xl">
              <div className="h-full rounded-2xl bg-gradient-to-br from-white/80 to-white/20" />
            </div>
          </div>
        </section>

        <section className="bg-[var(--secondary)] px-8 py-20 text-white sm:px-20">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.22em] text-white/50">The proposed team</p>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {proposal.team.map((member, index) => (
              <div key={`${member.name}-${index}`}>
                <div className="aspect-square rounded-2xl bg-white/90 grayscale" />
                <p className="mt-3 text-sm font-bold">{member.name}</p>
                <p className="text-xs text-white/45">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[var(--cream)] px-8 py-20 text-[var(--dark-text)] sm:px-20">
          <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">Scope</p>
          <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-[-0.06em]">Web Design</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {proposal.deliverables.map((item) => (
              <article key={`${item.phase}-${item.title}`} className="rounded-[1.75rem] border border-neutral-900/15 bg-[var(--cream)] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">{item.phase}</p>
                <h3 className="mt-3 font-display text-2xl font-black tracking-[-0.05em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-neutral-700">{item.description}</p>
                <div className="mt-6 rounded-2xl border border-neutral-900/20 p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">Includes</p>
                  <ul className="space-y-2 text-sm text-neutral-800">
                    {item.items.map((included) => (
                      <li key={included} className="flex gap-2">
                        <span>•</span>
                        <span>{included}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="flex min-h-[320px] items-end justify-between bg-[var(--primary)] px-8 py-12 text-white sm:px-20">
          <span className="text-xs uppercase tracking-[0.24em] text-white/50">Scroll</span>
          <h2 className="font-display text-4xl font-black uppercase tracking-[-0.06em] text-white/20">Handoff</h2>
          <span className="text-xs uppercase tracking-[0.24em] text-white/50">Next</span>
        </section>
      </div>
    </main>
  );
}
