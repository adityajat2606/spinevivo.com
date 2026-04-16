import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, FileText, HeartHandshake, Newspaper, Users } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/company',
    title: `Company | ${SITE_CONFIG.name}`,
    description: `Mission, people, and programs behind ${SITE_CONFIG.name}—the calm directory for trusted local businesses and wellness providers.`,
  })
}

const pillars = [
  {
    title: 'Trust by design',
    body: 'We bias toward clarity: verified signals, readable profiles, and search that respects how people actually choose care and services.',
    icon: HeartHandshake,
  },
  {
    title: 'Neighborhood scale',
    body: 'Listings are organized for local discovery first—so independents can stand out next to larger brands without paying for chaos.',
    icon: Building2,
  },
  {
    title: 'People behind the product',
    body: 'Editorial, support, and partnerships stay close to operators. When you write in, a human reads it.',
    icon: Users,
  },
]

const links = [
  { href: '/about', label: 'About', description: 'Why we exist and how we work.', icon: Building2 },
  { href: '/team', label: 'Team', description: 'Operators, design, and partnerships.', icon: Users },
  { href: '/careers', label: 'Careers', description: 'Open roles and how we hire.', icon: Users },
  { href: '/blog', label: 'Blog', description: 'Product updates and field notes.', icon: FileText },
  { href: '/press', label: 'Press', description: 'Logos, facts, and coverage.', icon: Newspaper },
]

export default function CompanyPage() {
  return (
    <PageShell
      title="Company"
      description={`${SITE_CONFIG.name} connects people with dependable local businesses—especially clinics, studios, and providers where trust matters most.`}
      actions={
        <>
          <Link href="/listings" className={dirSurface.ctaOutline}>
            Browse listings
          </Link>
          <Link href="/contact" className={dirSurface.cta}>
            Talk to us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <DirPanel>
          <DirEyebrow>Operating principles</DirEyebrow>
          <h2 className={`mt-3 text-2xl font-semibold tracking-tight sm:text-3xl ${dirSurface.title}`}>
            A directory should feel steady, not addictive.
          </h2>
          <p className={`mt-4 text-sm leading-relaxed sm:text-base ${dirSurface.muted}`}>
            We build surfaces that reward completeness and honesty: structured profiles, calm typography, and navigation that gets out of the way.
            Whether someone is booking care or comparing two studios, the goal is the same—fewer dead ends, faster confidence.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {pillars.map(({ title, body, icon: Icon }) => (
              <div key={title} className={`${dirSurface.inset} flex flex-col gap-3`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0369a1]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className={`text-sm font-semibold ${dirSurface.title}`}>{title}</h3>
                <p className={`text-xs leading-relaxed sm:text-sm ${dirSurface.muted}`}>{body}</p>
              </div>
            ))}
          </div>
        </DirPanel>
        <div className="grid gap-4">
          {links.map(({ href, label, description, icon: Icon }) => (
            <Link key={href} href={href} className="group block">
              <DirPanel variant="soft" className="transition duration-200 group-hover:border-black/[0.12] group-hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.06] bg-white text-[#0a0a0a]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className={`text-lg font-semibold ${dirSurface.title}`}>{label}</p>
                      <p className={`mt-1 text-sm ${dirSurface.muted}`}>{description}</p>
                    </div>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[#94a3b8] transition group-hover:translate-x-0.5 group-hover:text-[#0a0a0a]" aria-hidden />
                </div>
              </DirPanel>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
