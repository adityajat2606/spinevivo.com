import Link from 'next/link'
import { ArrowRight, Shield, Sparkles, Target } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { SITE_CONFIG } from '@/lib/site-config'

const stats = [
  { value: '120+', label: 'Cities with curated categories' },
  { value: '4.9?', label: 'Average owner satisfaction (quarterly)' },
  { value: '24h', label: 'Typical response on trust & safety' },
]

const values = [
  {
    title: 'Clarity over noise',
    body: 'We strip away infinite-scroll tricks so visitors can compare providers and studios with steady context, not engagement bait.',
    icon: Sparkles,
  },
  {
    title: 'Proof, not promises',
    body: 'Structured profiles, photos, hours, and verification states are first-class. Marketing fluff is deprioritized in search.',
    icon: Shield,
  },
  {
    title: 'Neighborhood intent',
    body: 'Ranking favors completeness, proximity, and recency of updates so independents can compete fairly with larger brands.',
    icon: Target,
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`We are building a calm directory for local businesses where trust matters, clinics, movement studios, and the everyday services neighbors rely on.`}
      actions={
        <>
          <Link href="/listings" className={dirSurface.ctaOutline}>
            Explore listings
          </Link>
          <Link href="/contact" className={dirSurface.cta}>
            Partner with us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <DirPanel>
          <DirEyebrow>Our story</DirEyebrow>
          <h2 className={`mt-3 text-2xl font-semibold tracking-tight sm:text-3xl ${dirSurface.title}`}>
            Search should feel supportive, especially when health is on the line.
          </h2>
          <p className={`mt-4 text-sm leading-relaxed sm:text-base ${dirSurface.muted}`}>
            {SITE_CONFIG.name} started as a reaction to cluttered maps and pay-to-win placement. We wanted a single surface where owners could tell
            their story with structure, and where neighbors could compare options without losing an afternoon to ads.
          </p>
          <p className={`mt-4 text-sm leading-relaxed sm:text-base ${dirSurface.muted}`}>
            Today we partner with operators, clinicians, and community anchors to keep categories honest. Editorial curation sits next to automation
            so the platform stays fast without becoming careless.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className={`${dirSurface.inset} text-center`}>
                <div className={`text-2xl font-semibold ${dirSurface.title}`}>{item.value}</div>
                <div className={`mt-1 text-xs leading-snug ${dirSurface.muted}`}>{item.label}</div>
              </div>
            ))}
          </div>
        </DirPanel>
        <div className="space-y-4">
          {values.map(({ title, body, icon: Icon }) => (
            <DirPanel key={title} variant="soft">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0369a1] shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className={`text-lg font-semibold ${dirSurface.title}`}>{title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>{body}</p>
                </div>
              </div>
            </DirPanel>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
