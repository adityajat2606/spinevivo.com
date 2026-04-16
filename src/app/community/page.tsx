import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Sparkles, Users } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/community',
    title: `Community | ${SITE_CONFIG.name}`,
    description: `Guidelines, gatherings, and ways to contribute to ${SITE_CONFIG.name} beyond submitting a listing.`,
  })
}

const ways = [
  {
    title: 'City ambassadors',
    body: 'Help new owners polish their first profile, host a coffee-hour for operators, or translate templates for your neighborhood.',
    icon: Users,
  },
  {
    title: 'Office hours',
    body: 'Monthly video sessions with product and partnerships—bring questions about search, categories, or upcoming launches.',
    icon: MessageCircle,
  },
  {
    title: 'Beta cohorts',
    body: 'Small groups try upcoming surfaces early. Feedback directly shapes release notes.',
    icon: Sparkles,
  },
]

const guidelines = [
  'Lead with accuracy—no astroturfing, fake reviews, or keyword stuffing.',
  'Share pricing transparently when recommending a provider you work with.',
  'Keep feedback specific and kind; we remove pile-ons and callouts without context.',
  'Report listings that appear unsafe or misleading; moderators respond within one business day.',
]

export default function CommunityPage() {
  return (
    <PageShell
      title="Community"
      description={`${SITE_CONFIG.name} grows when owners, neighbors, and clinicians share what actually worked—not when feeds optimize for outrage.`}
      actions={
        <>
          <Link href="/help" className={dirSurface.ctaOutline}>
            Help center
          </Link>
          <Link href="/contact" className={dirSurface.cta}>
            Host a meetup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {ways.map(({ title, body, icon: Icon }) => (
          <DirPanel key={title} variant="soft">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0369a1] shadow-sm">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <h2 className={`mt-4 text-lg font-semibold ${dirSurface.title}`}>{title}</h2>
            <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>{body}</p>
          </DirPanel>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <DirPanel>
          <DirEyebrow>Community guidelines</DirEyebrow>
          <h3 className={`mt-3 text-xl font-semibold ${dirSurface.title}`}>Keep it useful and local</h3>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed">
            {guidelines.map((rule) => (
              <li key={rule} className={`flex gap-3 ${dirSurface.muted}`}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38bdf8]" aria-hidden />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </DirPanel>
        <DirPanel variant="soft">
          <DirEyebrow>Moderation</DirEyebrow>
          <p className={`mt-3 text-sm leading-relaxed ${dirSurface.muted}`}>
            We combine automated signals with human review. Serious safety issues are escalated immediately; routine fixes (hours, photos,
            duplicate addresses) are handled asynchronously so owners are not stuck waiting.
          </p>
          <p className={`mt-4 text-sm leading-relaxed ${dirSurface.muted}`}>
            Want to propose a community program in your city? Email partnerships—we read every note.
          </p>
          <Link href="/status" className={`mt-6 inline-flex items-center text-sm font-semibold text-[#0a0a0a] hover:underline`}>
            Check platform status
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </DirPanel>
      </div>
    </PageShell>
  )
}
