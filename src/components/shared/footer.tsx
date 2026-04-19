import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, getRecipeEnabledTasks, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const footerLinks = {
  company: [
    { name: 'Company', href: '/company' },
    { name: 'Business Listings', href: '/listings' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const enabledTasks = getRecipeEnabledTasks()
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const platformLinks = enabledTasks.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-black/[0.06] bg-[#f8fafc] text-[#0a0a0a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#525252]">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link
                key={task.key}
                href={task.route}
                className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-[#0a0a0a] shadow-sm hover:bg-[#f3f8ff]"
              >
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f_0%,#0b1a2e_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 p-1.5">
                  <img src="/favicon.png?v=20260416" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8df0c8] px-4 py-2.5 text-sm font-semibold text-[#07111f] hover:bg-[#77dfb8]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {platformLinks.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-white">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-slate-200 hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-[#dbc6b6] bg-[linear-gradient(180deg,#fff9f0_0%,#fff1df_100%)] text-[#2f1d16]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial desk
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#72594a]">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Sections</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {platformLinks.map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.company.map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-black/[0.06] bg-white text-[#0a0a0a]">
      <div className="bg-[linear-gradient(135deg,#e8f4ff_0%,#f5f9ff_45%,#ffffff_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-black/[0.06] bg-white/80 px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm md:flex-row md:items-center">
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-medium italic tracking-tight text-[#0a0a0a] md:text-3xl">
                Stay in the loop
              </p>
              <p className="mt-2 max-w-md text-sm text-[#525252]">New verified businesses and neighborhood guides, delivered without clutter.</p>
            </div>
            <div className="flex w-full max-w-lg flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <p className="flex-1 text-sm leading-relaxed text-[#525252]">
                Claim your profile, add photos and hours, and show up when neighbors search for what you offer.
              </p>
              <Link
                href="/register"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-[#1a1a1a]"
              >
                List your business
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr_0.85fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-1 shadow-sm">
                <img src="/favicon.png?v=20260416" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-lg font-semibold tracking-tight">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-[#737373]">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#525252]">{SITE_CONFIG.description}</p>
            {primaryTask ? (
              <Link
                href={primaryTask.route}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1a1a1a]"
              >
                Browse directory
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#737373]">Directory</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#404040]">
              {platformLinks.map((item: any) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center gap-2 hover:text-black">
                    {item.icon ? <item.icon className="h-4 w-4 opacity-70" /> : null}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {(['company', 'resources', 'legal'] as const).map((section) => (
            <div key={section}>
              <h3 className="text-xs font-semibold capitalize tracking-[0.2em] text-[#737373]">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-[#404040]">
                {footerLinks[section].map((item: any) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-black">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-black/[0.06] pt-6 text-center text-sm text-[#737373]">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
