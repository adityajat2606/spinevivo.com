import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/blog',
    title: `Blog | ${SITE_CONFIG.name}`,
    description: `Field notes on local search, trusted listings, and product updates from the ${SITE_CONFIG.name} team.`,
  })
}

const posts = [
  {
    slug: 'placeholder' as const,
    title: 'Designing calmer search for care decisions',
    excerpt: 'What we learned testing directory layouts with first-time patients and studio members.',
    read: '6 min read',
    tag: 'Product',
  },
  {
    slug: null,
    title: 'Checklist: a complete listing in under twenty minutes',
    excerpt: 'Photos, hours, services, and proof—how we help owners ship profiles that convert.',
    read: '4 min read',
    tag: 'Playbooks',
  },
  {
    slug: null,
    title: 'Why we still believe in human review',
    excerpt: 'Automation scales, but neighborhoods need judgment. Here is how we combine both.',
    read: '5 min read',
    tag: 'Trust & safety',
  },
]

const series = [
  { title: 'Neighborhood launches', body: 'Notes from pilots in new metros—what broke, what surprised us, what we fixed.' },
  { title: 'Owner toolkit', body: 'Practical guidance for photos, descriptions, and seasonal promos without spammy tactics.' },
  { title: 'Behind the ranking', body: 'Transparent write-ups on how we think about relevance, distance, and completeness.' },
]

export default function BlogPage() {
  return (
    <PageShell
      title="Blog"
      description="Longer-form updates from our team—product decisions, operator playbooks, and the occasional launch diary."
      actions={
        <Link href="/press" className={dirSurface.ctaOutline}>
          Press kit
        </Link>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-5">
          {posts.map((post, index) => {
            const inner = (
              <DirPanel
                className={
                  post.slug
                    ? 'transition duration-200 group-hover:border-black/[0.12] group-hover:shadow-[0_28px_80px_rgba(15,23,42,0.09)]'
                    : ''
                }
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-black/[0.08] bg-[#f3f8ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0369a1]">
                    {post.tag}
                  </span>
                  <span className={`flex items-center gap-1 text-xs ${dirSurface.muted}`}>
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {post.read}
                  </span>
                  {!post.slug ? (
                    <span className="rounded-full border border-dashed border-black/[0.15] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#737373]">
                      Coming soon
                    </span>
                  ) : null}
                </div>
                <h2 className={`mt-4 text-xl font-semibold tracking-tight sm:text-2xl ${dirSurface.title}`}>{post.title}</h2>
                <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${dirSurface.muted}`}>{post.excerpt}</p>
                {post.slug ? (
                  <span className={`mt-5 inline-flex items-center text-sm font-semibold text-[#0a0a0a]`}>
                    Continue reading
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                ) : (
                  <p className={`mt-5 text-sm font-medium text-[#64748b]`}>Publishing shortly—subscribe via the sidebar to get notified.</p>
                )}
              </DirPanel>
            )
            return post.slug ? (
              <Link key={`${post.title}-${index}`} href={`/blog/${post.slug}`} className="group block">
                {inner}
              </Link>
            ) : (
              <div key={`${post.title}-${index}`}>{inner}</div>
            )
          })}
        </div>
        <div className="space-y-4">
          <DirPanel variant="soft">
            <DirEyebrow>Newsletter</DirEyebrow>
            <h3 className={`mt-3 text-lg font-semibold ${dirSurface.title}`}>Quarterly digest</h3>
            <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>
              A single email with launches, policy changes worth knowing, and one actionable tip for listing owners.
            </p>
            <Link href="/contact" className={`mt-6 inline-flex w-full items-center justify-center sm:w-auto ${dirSurface.cta}`}>
              Request invite
            </Link>
          </DirPanel>
          {series.map((item) => (
            <DirPanel key={item.title} variant="inset">
              <h3 className={`text-sm font-semibold ${dirSurface.title}`}>{item.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>{item.body}</p>
            </DirPanel>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
