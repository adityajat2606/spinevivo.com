import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Compass, FileText, Image as ImageIcon, LayoutGrid, Plus, Search, ShieldCheck, Sparkles, Star, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { SITE_CONFIG, getRecipeEnabledTasks, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

const DIRECTORY_HERO_IMAGE =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=82'

function getDirectoryTone(_brandPack: string) {
  return {
    shell: 'bg-[#fafbfd] text-[#0a0a0a]',
    hero: 'relative overflow-hidden',
    panel: 'rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]',
    soft: 'rounded-[1.75rem] border border-black/[0.06] bg-[#f3f8ff]/90',
    muted: 'text-[#525252]',
    title: 'text-[#0a0a0a]',
    badge: 'bg-black text-white',
    action: 'bg-black text-white hover:bg-[#1a1a1a]',
    actionAlt: 'rounded-full border border-black/[0.1] bg-white text-[#0a0a0a] hover:bg-[#f8fafc]',
  }
}

function getEditorialTone() {
  return {
    shell: 'bg-[#fbf6ee] text-[#241711]',
    panel: 'border border-[#dcc8b7] bg-[#fffdfa] shadow-[0_24px_60px_rgba(77,47,27,0.08)]',
    soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
    muted: 'text-[#6e5547]',
    title: 'text-[#241711]',
    badge: 'bg-[#241711] text-[#fff1e2]',
    action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    actionAlt: 'border border-[#dcc8b7] bg-transparent text-[#241711] hover:bg-[#f5e7d7]',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask: _primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts: _profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const discoverPosts = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 4)
  const categoryPills = CATEGORY_OPTIONS.slice(0, 6)
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main className="overflow-x-hidden">
      <section className={tone.hero}>
        <div className="relative min-h-[min(92vh,720px)]">
          <ContentImage
            src={DIRECTORY_HERO_IMAGE}
            alt="Modern offices and city skyline"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            intrinsicWidth={2000}
            intrinsicHeight={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-[#0a1628]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent" />
          <div className="relative mx-auto flex max-w-7xl flex-col justify-end gap-10 px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md">
                  <Compass className="h-3.5 w-3.5" />
                  Trusted business directory
                </span>
                <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  Find the right local business in minutes, not endless scrolling.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">{SITE_CONFIG.description}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white shadow-lg backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Happy explorers</p>
                    <p className="mt-1 text-lg font-semibold">125k+</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white shadow-lg backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Verified listings</p>
                    <p className="mt-1 text-lg font-semibold">4.9 ★</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/dashboard/listings/new"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition hover:bg-white/95"
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                    Create listing
                  </Link>
                </div>
              </div>
              <div className={`${tone.panel} p-5 sm:p-6`}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#737373]">Search the directory</p>
                <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" action="/search" method="get">
                  <input type="hidden" name="master" value="1" />
                  <label className="grid gap-1.5 text-xs font-medium text-[#525252]">
                    Location
                    <input
                      name="q"
                      placeholder="City, neighborhood, ZIP"
                      className="h-11 rounded-2xl border border-black/[0.08] bg-[#f8fafc] px-3 text-sm text-[#0a0a0a] placeholder:text-[#a3a3a3]"
                      autoComplete="off"
                    />
                  </label>
                  <label className="grid gap-1.5 text-xs font-medium text-[#525252]">
                    Category
                    <select
                      name="category"
                      className="h-11 rounded-2xl border border-black/[0.08] bg-[#f8fafc] px-3 text-sm text-[#0a0a0a]"
                      defaultValue=""
                    >
                      <option value="">All types</option>
                      {categoryPills.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-semibold text-white transition hover:bg-[#1a1a1a] sm:w-auto sm:min-w-[120px]"
                    >
                      <Search className="h-4 w-4" />
                      Search
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-xs text-[#737373]">Results open on the search page with the same filters you use across the site.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#737373]">Browse by category</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link
            href="/listings"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a1a1a]"
          >
            All
          </Link>
          {categoryPills.map((c) => (
            <Link
              key={c.slug}
              href={`/listings?category=${encodeURIComponent(c.slug)}`}
              className="rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-semibold text-[#404040] shadow-sm transition hover:border-black/20 hover:bg-[#f3f8ff]"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-black/[0.06] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#737373]">Featured businesses</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[#0a0a0a] sm:text-4xl">Premium listings with photos, hours, and clear next steps.</h2>
          </div>
          <Link href="/listings" className={`inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm font-semibold ${tone.action}`}>
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredListings.length ? (
            featuredListings.map((post) => (
              <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
            ))
          ) : (
            <div className="col-span-full rounded-[2rem] border border-dashed border-black/10 bg-[#f8fafc] px-6 py-16 text-center text-[#525252]">
              <Building2 className="mx-auto h-10 w-10 text-[#a3a3a3]" />
              <p className="mt-4 text-lg font-semibold text-[#0a0a0a]">Fresh listings on the way</p>
              <p className="mt-2 text-sm">Check back soon or open the full directory to explore what is live.</p>
              <Link href="/listings" className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${tone.action}`}>
                Open directory
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#737373]">How it works</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em]">Everything should be this easy</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#525252]">
              A calmer path from search to shortlist: fewer distractions, stronger trust signals, and surfaces built for decisions.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Search with intent',
                body: 'Filter by category and location so the first screen already matches what you need.',
                icon: Search,
              },
              {
                title: 'Compare with confidence',
                body: 'Photos, maps, and structured details replace guesswork when you are choosing a provider.',
                icon: ShieldCheck,
              },
              {
                title: 'Act in one tap',
                body: 'Call, email, or visit the website without hunting through noisy feeds or popups.',
                icon: Sparkles,
              },
            ].map((step) => (
              <div key={step.title} className={`${tone.soft} p-6 text-left`}>
                <step.icon className="h-6 w-6 text-[#0a0a0a]" />
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${tone.muted}`}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#737373]">Top rated this week</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Businesses people return to</h2>
            </div>
            <Link href="/listings" className="text-sm font-semibold text-[#0a0a0a] underline-offset-4 hover:underline">
              See directory
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {discoverPosts.map((post) => {
              const meta = getPostMeta(post)
              return (
                <Link
                  key={post.id}
                  href={getTaskHref('listing', post.slug)}
                  className={`group overflow-hidden ${tone.panel}`}
                >
                  <div className="relative h-40 overflow-hidden bg-[#e5e7eb]">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#eab308]">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="ml-1 text-[#525252]">(4.9)</span>
                    </div>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#737373]">{meta.category || 'Local'}</p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">{post.title}</h3>
                    <p className={`mt-2 line-clamp-2 text-sm ${tone.muted}`}>{post.summary || 'Reliable service with a strong local reputation.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {quickRoutes.length > 1 ? (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickRoutes.map((task) => {
              const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
              return (
                <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <Icon className="h-5 w-5" />
                  <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts, supportTasks }: { primaryTask?: EnabledTask; articlePosts: SitePost[]; supportTasks: EnabledTask[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <FileText className="h-3.5 w-3.5" />
              Reading-first publication
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Essays, analysis, and slower reading designed like a publication, not a dashboard.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                About the publication
              </Link>
            </div>
          </div>

          <aside className={`rounded-[2rem] p-6 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Inside this issue</p>
            <div className="mt-5 space-y-5">
              {side.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="block border-b border-black/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-60">Feature</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Long-form perspective with a calmer reading rhythm.'}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {lead ? (
          <div className={`mt-12 overflow-hidden rounded-[2.5rem] ${tone.panel}`}>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] overflow-hidden">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Lead story</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{lead.title}</h2>
                <p className={`mt-4 text-sm leading-8 ${tone.muted}`}>{lead.summary || 'A more deliberate lead story surface with room for a proper narrative setup.'}</p>
                <Link href={`/articles/${lead.slug}`} className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportTasks.slice(0, 3).map((task) => (
            <Link key={task.key} href={task.route} className={`rounded-[1.8rem] p-6 ${tone.soft}`}>
              <h3 className="text-xl font-semibold">{task.label}</h3>
              <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Business media highlights
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led business discovery with verified profiles and a cleaner browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                View listings
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet business owners
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Listing notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Clearer business media, fewer boxes, stronger scanability.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This layout keeps directory clarity while still giving business photos and identity details enough visual weight.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Business profile with trust signals and service highlights.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Saved business lists
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit local business options through curated listing groups.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open saved lists
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore owners
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Saved list</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer listing surface with room for context and grouped comparison.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like a saved shortlist than a noisy generic feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure stays calm and helps visitors compare, save, and return to trusted local businesses.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Owner profile, saved listings, and local business notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = getRecipeEnabledTasks()
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
