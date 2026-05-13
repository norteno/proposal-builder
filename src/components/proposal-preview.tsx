"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { Proposal } from "@/lib/types";

function ImageOrPlaceholder({ src, label, className }: { src?: string; label: string; className: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={label} className={className} />
    );
  }
  return <div className={className} aria-label={label} />;
}

function StudioLogo({ proposal }: { proposal: Proposal }) {
  if (proposal.studioLogoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={proposal.studioLogoUrl} alt="Studio logo" className="max-h-12 max-w-[220px] object-contain opacity-100" />
    );
  }
  return <span className="rounded-full border border-current/30 px-3 py-1 text-xs uppercase tracking-[0.22em] opacity-70">Upload Logo</span>;
}


function SectionInner({
  children,
  className = "py-20",
  contentClassName = "max-w-[1200px]"
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div className="flex w-full justify-center">
      <div className={`proposal-section-container flex w-full max-w-[1600px] justify-center px-8 sm:px-16 lg:px-20 ${className}`}>
        <div className={`w-full ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

function TimelineSection({ proposal }: { proposal: Proposal }) {
  const months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7+"];
  const minMonth = 1;
  const maxMonth = 8.2;
  const span = maxMonth - minMonth;
  const pct = (value: number) => `${Math.max(0, Math.min(100, ((value - minMonth) / span) * 100))}%`;

  return (
    <section className="bg-[#f8f7f4]" style={{ color: proposal.sectionTextColors.timeline }}>
      <SectionInner>
      <p className="text-xs uppercase tracking-[0.24em] opacity-100">Ballpark</p>
      <h2 className="mt-5 font-display text-5xl font-black tracking-[-0.02em] sm:text-6xl">Estimated Timeline</h2>
      <div className="mt-16 overflow-x-auto pb-4">
        <div className="min-w-[920px]">
          <div className="grid grid-cols-[180px_1fr] gap-8">
            <div />
            <div className="grid grid-cols-7 text-xs uppercase tracking-[0.18em] opacity-45">
              {months.map((month) => <div key={month}>{month}</div>)}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-[180px_1fr] gap-8">
            <div className="space-y-8">
              {proposal.timeline.map((item, index) => (
                <div key={`timeline-label-${index}`} className="h-14">
                  <p className="font-bold uppercase tracking-[0.12em] opacity-75">{item.label}</p>
                  <p className="mt-1" style={{ color: proposal.sectionBodyColors.timeline }}>{item.duration}</p>
                </div>
              ))}
            </div>
            <div className="relative border-l border-neutral-200">
              <div className="absolute inset-y-0 left-0 right-0 grid grid-cols-7">
                {months.map((month) => <div key={`grid-${month}`} className="border-r border-neutral-200" />)}
              </div>
              <div className="relative z-10 space-y-8 py-2">
                {proposal.timeline.map((item, index) => (
                  <div key={`timeline-bar-${index}`} className="relative h-14">
                    <div
                      className="absolute top-2 flex h-10 items-center rounded-lg px-4 text-xs font-black uppercase tracking-[0.12em]"
                      style={{ left: pct(item.startMonth), width: `calc(${pct(item.endMonth)} - ${pct(item.startMonth)})`, backgroundColor: item.color, color: item.color.toLowerCase() === "#0d3d34" ? "#e9ff3d" : "#1b1b1b" }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <p className="italic" style={{ color: proposal.sectionBodyColors.timeline }}>{proposal.timelineNote}</p>
          </div>
        </div>
      </div>
      </SectionInner>
    </section>
  );
}

function PricingSection({ proposal }: { proposal: Proposal }) {
  return (
    <section className="bg-[var(--primary)]" style={{ color: proposal.sectionTextColors.pricing }}>
      <SectionInner>
      <p className="text-xs uppercase tracking-[0.24em] opacity-100">{proposal.pricing.eyebrow}</p>
      <h2 className="mt-5 font-display text-5xl font-black tracking-[-0.02em] sm:text-6xl">{proposal.pricing.title}</h2>
      <div className="mt-8 rounded-3xl p-8 sm:p-10" style={{ backgroundColor: proposal.pricing.totalBoxBackgroundColor }}>
        <div className="grid gap-8 md:grid-cols-[1fr_220px] md:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] opacity-100">{proposal.pricing.totalLabel}</p>
            <h3 className="mt-5 font-display text-3xl font-black tracking-[-0.02em]">{proposal.pricing.totalTitle}</h3>
            <p className="mt-6 max-w-xl text-lg leading-8" style={{ color: proposal.sectionBodyColors.pricing }}>{proposal.pricing.totalDescription}</p>
          </div>
          <p className="font-display text-5xl font-black text-[var(--accent)] sm:text-6xl">{proposal.pricing.totalPrice}</p>
        </div>
      </div>
      <div className="my-10 flex items-center gap-6 text-xs uppercase tracking-[0.24em] opacity-50"><span className="h-px flex-1 bg-current opacity-30" />{proposal.pricing.splitLabel}<span className="h-px flex-1 bg-current opacity-30" /></div>
      <div className="grid gap-5 md:grid-cols-2">
        {proposal.pricing.items.map((item, index) => (
          <article key={`pricing-card-${index}`} className="rounded-3xl border border-white/10 p-8" style={{ backgroundColor: proposal.pricing.cardBackgroundColor }}>
            <p className="text-xs uppercase tracking-[0.24em] opacity-100">{item.eyebrow}</p>
            <h3 className="mt-5 font-display text-2xl font-black tracking-[-0.01em]">{item.title}</h3>
            <p className="mt-4 font-display text-4xl font-black text-[var(--accent)]">{item.price}</p>
            <ul className="mt-8 space-y-4 text-sm leading-6" style={{ color: proposal.sectionBodyColors.pricing }}>
              {item.items.map((included, itemIndex) => (
                <li key={`pricing-${index}-${itemIndex}`} className="flex gap-3"><span className="text-[var(--accent)]">✓</span><span>{included}</span></li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      </SectionInner>
    </section>
  );
}

export default function ProposalPreview({ proposal, clean = false }: { proposal: Proposal; clean?: boolean }) {
  const themeVars = {
    "--primary": proposal.theme.primary,
    "--secondary": proposal.theme.secondary,
    "--cream": proposal.theme.cream,
    "--accent": proposal.theme.accent,
    "--proposal-text": proposal.theme.text,
    "--dark-text": proposal.theme.darkText,
    "--font-heading": proposal.theme.headingFont,
    "--font-body": proposal.theme.bodyFont
  } as CSSProperties;

  return (
    <div role="main" className={clean ? "min-h-screen bg-neutral-200" : "flex-1 overflow-y-auto bg-neutral-200"}>
      <div className="proposal-preview-shell w-full overflow-hidden" style={themeVars}>
        <section className="relative min-h-[680px] bg-[var(--primary)]" style={{ color: proposal.sectionTextColors.hero }}>
          <SectionInner className="py-10 sm:py-14">
          <div className="flex items-start justify-between text-xs uppercase tracking-[0.22em]"><StudioLogo proposal={proposal} /><span className="opacity-70">{proposal.headerText}</span></div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-44 max-w-[51rem]">
            <span className="inline-flex rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--dark-text)]">{proposal.eyebrow} {proposal.clientName}</span>
            <h1 className="mt-8 font-display text-5xl font-black leading-[0.92] tracking-[-0.02em] sm:text-7xl">{proposal.title}</h1>
            <div className="mt-10 grid gap-6 border-t border-[#061D00]/20 pt-6 text-lg sm:grid-cols-[1fr_220px]" style={{ color: proposal.sectionBodyColors.hero }}>
              <p>{proposal.introLetter}</p><div className="border-l border-[#061D00]/20 pl-5"><p className="uppercase tracking-[0.18em]">Prepared By</p><p className="mt-2" style={{ color: proposal.sectionTextColors.hero }}>The Graphic Standard</p></div>
            </div>
          </motion.div>
          </SectionInner>
        </section>

        <section className="bg-[var(--secondary)]" style={{ color: proposal.sectionTextColors.letter }}>
          <SectionInner className="py-20">
          <div className="max-w-3xl"><p className="mb-8 text-xs uppercase tracking-[0.24em] opacity-100">Letter</p><p className="text-lg leading-8" style={{ color: proposal.sectionBodyColors.letter }}>{proposal.introLetter}</p><div className="mt-10 flex flex-wrap gap-8 text-sm" style={{ color: proposal.sectionBodyColors.letter }}>{proposal.letterSigners.map((signer, index) => <div key={`letter-signer-${index}`} className="min-w-[140px]"><ImageOrPlaceholder src={signer.imageUrl} label={signer.name} className="h-12 w-12 rounded-full bg-white/20 object-cover" /><p className="mt-3" style={{ color: proposal.sectionTextColors.letter }}>{signer.name}</p><p>{signer.role}</p></div>)}</div></div>
          </SectionInner>
        </section>

        <section className="bg-[var(--cream)]" style={{ color: proposal.sectionTextColors.about }}>
          <SectionInner>
          <div className="grid items-center gap-10 lg:grid-cols-[520px_1fr]">
            {proposal.aboutImageUrl ? <div className="overflow-hidden rounded-[2rem]"><ImageOrPlaceholder src={proposal.aboutImageUrl} label="About the studio" className="h-[430px] w-full rounded-[2rem] bg-neutral-800/80 object-cover" /></div> : <div className="flex gap-3">{[0, 1, 2].map((item) => <div key={item} className="h-40 w-32 rounded-t-full bg-neutral-800/80" />)}</div>}
            <div><p className="text-xs uppercase tracking-[0.22em] opacity-100">About the studio</p><h2 className="mt-6 max-w-lg font-display text-4xl font-black leading-none tracking-[-0.02em] sm:text-5xl">{proposal.aboutTitle}</h2><p className="mt-6 max-w-3xl text-lg leading-6" style={{ color: proposal.sectionBodyColors.about }}>{proposal.aboutBody}</p></div>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-current/10 pt-8">{proposal.clientLogos.map((logo, index) => <div key={`logo-preview-${index}`} className="flex min-h-12 min-w-[96px] items-center justify-center">{logo.imageUrl ? <img src={logo.imageUrl} alt={logo.name} className="max-h-12 max-w-[130px] object-contain grayscale" /> : <span className="text-sm font-black uppercase tracking-[-0.04em] opacity-70">{logo.name}</span>}</div>)}</div>
          </SectionInner>
        </section>

        <section className="bg-[var(--primary)]" style={{ color: proposal.sectionTextColors.experience }}>
          <SectionInner>
          <div className="grid gap-10 lg:grid-cols-[1fr_520px]"><div><p className="text-xs uppercase tracking-[0.22em] opacity-100">Experience</p><h2 className="mt-6 max-w-xl font-display text-4xl font-black leading-none tracking-[-0.02em] sm:text-5xl">{proposal.proofTitle}</h2><p className="mt-6 max-w-2xl text-lg leading-6" style={{ color: proposal.sectionBodyColors.experience }}>{proposal.proofBody}</p></div><div className="h-[400px] overflow-hidden rounded-3xl">{proposal.experienceImageUrl ? <ImageOrPlaceholder src={proposal.experienceImageUrl} label="Experience" className="h-full w-full rounded-3xl bg-white/20 object-cover" /> : <div className="h-full rounded-3xl bg-gradient-to-br from-white/80 to-white/20" />}</div></div>
          </SectionInner>
        </section>

        <section className="bg-[var(--secondary)]" style={{ color: proposal.sectionTextColors.team }}><SectionInner><p className="mb-8 text-xs font-bold uppercase tracking-[0.22em] opacity-100">The proposed team</p><div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">{proposal.team.map((member, index) => <div key={`team-preview-${index}`}><ImageOrPlaceholder src={member.imageUrl} label={member.name} className="aspect-square w-full rounded-2xl bg-white/90 object-cover grayscale" /><p className="mt-3 text-sm font-bold">{member.name}</p><p className="text-xs" style={{ color: proposal.sectionBodyColors.team }}>{member.role}</p></div>)}</div></SectionInner></section>

        <section className="bg-[var(--cream)]" style={{ color: proposal.sectionTextColors.deliverables }}><SectionInner><p className="text-xs uppercase tracking-[0.24em] opacity-100">Scope</p><h2 className="mt-4 font-display text-4xl font-black tracking-[-0.02em]">Web Design</h2><div className="mt-12 grid gap-10 md:grid-cols-2">{proposal.deliverables.map((item, index) => <article key={`deliverable-preview-${index}`} className="rounded-[1.75rem] border border-current/15 bg-[var(--cream)] p-6"><p className="text-xs font-bold uppercase tracking-[0.2em] opacity-100">{item.phase}</p><h3 className="mt-3 font-display text-2xl font-black tracking-[-0.01em]">{item.title}</h3><p className="mt-4 text-sm leading-6" style={{ color: proposal.sectionBodyColors.deliverables }}>{item.description}</p><div className="mt-6 rounded-2xl border border-current/20 p-4"><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] opacity-50">Includes</p><ul className="space-y-2 text-sm" style={{ color: proposal.sectionBodyColors.deliverables }}>{item.items.map((included, itemIndex) => <li key={`included-${index}-${itemIndex}`} className="flex gap-2"><span>•</span><span>{included}</span></li>)}</ul></div></article>)}</div></SectionInner></section>

        <TimelineSection proposal={proposal} />
        <PricingSection proposal={proposal} />

        <section className="bg-[var(--primary)]" style={{ color: proposal.sectionTextColors.handoff }}><SectionInner className="min-h-[320px] py-12" contentClassName="flex min-h-[320px] items-end justify-center text-center"><h2 className="font-display text-5xl font-black tracking-[-0.02em] sm:text-6xl">Thank You</h2></SectionInner></section>
      </div>
    </div>
  );
}
