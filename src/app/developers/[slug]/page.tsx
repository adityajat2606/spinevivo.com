import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const CHAPTERS: Record<
  string,
  {
    title: string
    description: string
    sections: { heading: string; body: string }[]
  }
> = {
  authentication: {
    title: 'Authentication',
    description: 'Issue and rotate credentials without taking the directory offline.',
    sections: [
      {
        heading: 'API keys',
        body: 'Create separate keys for staging and production. Keys are prefix-coded so support can identify leaks quickly without exposing the full secret in tickets.',
      },
      {
        heading: 'Scopes',
        body: 'Default to read-only listing scope. Write scopes require a human-reviewed integration checklist—this protects owners from silent profile edits.',
      },
      {
        heading: 'Rotation',
        body: 'Rotate secrets with a two-key overlap window. Old keys remain valid for 24 hours while you deploy new environment variables.',
      },
    ],
  },
  webhooks: {
    title: 'Webhooks',
    description: 'Receive structured events when listings or verification states change.',
    sections: [
      {
        heading: 'Delivery guarantees',
        body: 'At-least-once delivery with exponential backoff. Duplicate events include the same idempotency key so your workers can safely de-dupe.',
      },
      {
        heading: 'Signing',
        body: 'Every payload ships with an HMAC signature using your endpoint secret. We recommend verifying before parsing JSON to reject forged traffic early.',
      },
      {
        heading: 'Retries',
        body: '5xx and connection resets retry for up to three days. 4xx responses pause delivery until you fix the endpoint—no silent drops.',
      },
    ],
  },
  'rate-limits': {
    title: 'Rate limits',
    description: 'Predictable ceilings that keep neighborhood data responsive for everyone.',
    sections: [
      {
        heading: 'Headers',
        body: 'Each response includes remaining quota, reset time, and a request id for tracing. Burst traffic receives 429 with a Retry-After you can trust.',
      },
      {
        heading: 'Fair use',
        body: 'Bulk exporters should page slowly and respect ETag headers. Aggressive scraping triggers progressive penalties instead of hard bans when possible.',
      },
      {
        heading: 'Elevated tiers',
        body: 'Clinical aggregators and municipal partners can request higher ceilings with signed usage reports—contact partnerships with your projected QPS.',
      },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(CHAPTERS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const chapter = CHAPTERS[slug]
  if (!chapter) {
    return buildPageMetadata({ path: '/developers', title: `Developers | ${SITE_CONFIG.name}` })
  }
  return buildPageMetadata({
    path: `/developers/${slug}`,
    title: `${chapter.title} | Developers | ${SITE_CONFIG.name}`,
    description: chapter.description,
  })
}

export default async function DeveloperDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const chapter = CHAPTERS[slug]
  if (!chapter) notFound()

  return (
    <PageShell
      title={chapter.title}
      description={chapter.description}
      actions={
        <Link href="/developers" className={dirSurface.ctaOutline}>
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
          All topics
        </Link>
      }
    >
      <DirPanel>
        <DirEyebrow>Developer documentation</DirEyebrow>
        <div className="mt-6 space-y-8">
          {chapter.sections.map((section) => (
            <div key={section.heading}>
              <h2 className={`text-lg font-semibold ${dirSurface.title}`}>{section.heading}</h2>
              <p className={`mt-2 text-sm leading-relaxed sm:text-base ${dirSurface.muted}`}>{section.body}</p>
            </div>
          ))}
        </div>
      </DirPanel>
      <p className={`mt-8 text-center text-sm ${dirSurface.muted}`}>
        Need an integration review?{' '}
        <Link href="/contact" className="font-semibold text-[#0a0a0a] underline-offset-4 hover:underline">
          Contact the platform team
        </Link>
        .
      </p>
    </PageShell>
  )
}
