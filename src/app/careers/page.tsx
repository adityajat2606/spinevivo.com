import Link from 'next/link'
import { ArrowRight, Briefcase, Laptop, MapPin } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    title: 'Senior Product Designer',
    location: 'Remote (US)',
    type: 'Full-time',
    level: 'Senior',
    focus: 'Design systems for dense information—search, filters, and owner dashboards.',
  },
  {
    title: 'Full-stack Engineer',
    location: 'Hybrid · NYC',
    type: 'Full-time',
    level: 'Mid',
    focus: 'Next.js, edge caching, and accessibility for high-trust listing surfaces.',
  },
  {
    title: 'Community Partnerships',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid',
    focus: 'Launch new metros with clinics, studios, and BIDs—measured, not spray-and-pray.',
  },
]

const benefits = [
  'Medical, dental, and vision—employer-sponsored at 90%',
  'Four-day deep work blocks each month (meetings consolidated)',
  '$2,500 annual learning budget + conference travel',
  'Hardware stipend and ergonomic home-office allowance',
  'Transparent leveling matrix published internally every quarter',
]

const process = [
  { step: '01', title: 'Intro call', body: '30 minutes with hiring manager—goals, constraints, and mutual fit.' },
  { step: '02', title: 'Work session', body: 'Paid async exercise or paired session—no trivia, no whiteboard mazes.' },
  { step: '03', title: 'Team round', body: 'Meet cross-functional partners you would ship with weekly.' },
  { step: '04', title: 'Offer', body: 'Comp bands shared up front; references only after verbal alignment.' },
]

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Help us build the most trusted directory for local businesses. ${SITE_CONFIG.name} is remote-first with intentional on-sites for launches.`}
      actions={
        <Link href="/contact" className={dirSurface.cta}>
          Start a conversation
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {roles.map((role) => (
            <DirPanel key={role.title}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">{role.level}</span>
                <span className="rounded-full border border-black/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#525252]">
                  {role.type}
                </span>
              </div>
              <h2 className={`mt-4 text-xl font-semibold ${dirSurface.title}`}>{role.title}</h2>
              <p className={`mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${dirSurface.muted}`}>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" aria-hidden />
                  {role.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-4 w-4" aria-hidden />
                  Core product
                </span>
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${dirSurface.muted}`}>{role.focus}</p>
              <Link href="/contact" className={`mt-5 inline-flex ${dirSurface.ctaOutline}`}>
                Apply
              </Link>
            </DirPanel>
          ))}
        </div>
        <div className="space-y-5">
          <DirPanel variant="soft">
            <DirEyebrow>Benefits</DirEyebrow>
            <h3 className={`mt-3 text-lg font-semibold ${dirSurface.title}`}>Built for sustainable pace</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              {benefits.map((benefit) => (
                <li key={benefit} className={`flex gap-3 ${dirSurface.muted}`}>
                  <Laptop className="mt-0.5 h-4 w-4 shrink-0 text-[#38bdf8]" aria-hidden />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </DirPanel>
          <DirPanel variant="inset">
            <DirEyebrow>Hiring process</DirEyebrow>
            <div className="mt-4 space-y-4">
              {process.map((p) => (
                <div key={p.step} className="flex gap-4">
                  <span className="font-mono text-xs font-semibold text-[#94a3b8]">{p.step}</span>
                  <div>
                    <p className={`text-sm font-semibold ${dirSurface.title}`}>{p.title}</p>
                    <p className={`mt-1 text-sm ${dirSurface.muted}`}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </DirPanel>
        </div>
      </div>
    </PageShell>
  )
}
