import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Code2, Webhook } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/developers',
    title: `Developers | ${SITE_CONFIG.name}`,
    description: `API overview, webhooks, and integration patterns for teams embedding ${SITE_CONFIG.name} data into their own products.`,
  })
}

const tiles = [
  {
    href: '/developers/authentication',
    title: 'Authentication',
    body: 'API keys, rotating secrets, and scoped tokens for server-to-server integrations.',
    icon: Code2,
  },
  {
    href: '/developers/webhooks',
    title: 'Webhooks',
    body: 'Subscribe to listing updates, verification changes, and moderation outcomes.',
    icon: Webhook,
  },
  {
    href: '/developers/rate-limits',
    title: 'Rate limits',
    body: 'Burst allowances, backoff headers, and how we protect neighborhood datasets.',
    icon: BookOpen,
  },
]

export default function DevelopersPage() {
  return (
    <PageShell
      title="Developers"
      description="Stable JSON APIs, predictable pagination, and webhooks designed for healthcare-adjacent workflows where stale data is not acceptable."
      actions={
        <>
          <Link href="/contact" className={dirSurface.ctaOutline}>
            Request sandbox
          </Link>
          <Link href="/developers/authentication" className={dirSurface.cta}>
            Read the docs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {tiles.map(({ href, title, body, icon: Icon }) => (
          <Link key={href} href={href} className="group block">
            <DirPanel variant="soft" className="h-full transition group-hover:border-black/[0.12] group-hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <Icon className="h-6 w-6 text-[#0369a1]" aria-hidden />
              <h2 className={`mt-4 text-lg font-semibold ${dirSurface.title}`}>{title}</h2>
              <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>{body}</p>
              <span className={`mt-5 inline-flex items-center text-sm font-semibold`}>
                Open chapter
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </DirPanel>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <DirPanel>
          <DirEyebrow>Design goals</DirEyebrow>
          <h3 className={`mt-3 text-xl font-semibold ${dirSurface.title}`}>Built for integrators who care about provenance</h3>
          <p className={`mt-4 text-sm leading-relaxed ${dirSurface.muted}`}>
            Every payload includes verification timestamps, human review states, and media checksums when available. We version schemas explicitly
            and ship migration guides before sunset dates.
          </p>
          <p className={`mt-4 text-sm leading-relaxed ${dirSurface.muted}`}>
            Need a BAA or custom SLA for clinical tooling? Mention it in your sandbox request—{SITE_CONFIG.name} partners with compliance teams
            regularly.
          </p>
        </DirPanel>
        <DirPanel variant="inset">
          <DirEyebrow>Quickstart</DirEyebrow>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#404040]">
            <li>Create a developer workspace from the dashboard (coming soon—email support for early access).</li>
            <li>Generate a restricted API key with read-only listing scope.</li>
            <li>Point the SDK or curl examples at the sandbox base URL.</li>
            <li>Register a webhook endpoint with signed delivery headers.</li>
          </ol>
        </DirPanel>
      </div>
    </PageShell>
  )
}
