'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, getRecipeEnabledTasks, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

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

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

function directoryNavLinkClass(active: boolean, idleClass: string) {
  return cn(
    'relative rounded-full px-3.5 py-2 text-sm font-semibold tracking-tight transition-colors duration-200 ease-out',
    active
      ? 'bg-black text-white shadow-[0_2px_12px_rgba(0,0,0,0.18)]'
      : cn(idleClass, 'hover:bg-black/[0.05] active:bg-black/[0.08]'),
  )
}

const directoryPalette = {
  'directory-clean': {
    shell:
      'border-b border-black/[0.07] bg-white/85 text-[#0a0a0a] shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/78',
    logo: 'rounded-2xl border border-black/[0.06] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-shadow duration-200 hover:shadow-md',
    nav: 'text-[#404040] hover:text-black',
    search:
      'border border-black/[0.08] bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)] text-[#525252] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]',
    cta: 'bg-black text-white shadow-sm transition-[transform,box-shadow,background-color] duration-200 hover:bg-[#1a1a1a] hover:shadow-md active:scale-[0.98]',
    post: 'border border-black/[0.06] bg-white text-[#0a0a0a] transition-colors hover:bg-[#f8fafc] active:bg-[#f1f5f9]',
    mobile: 'border-t border-black/[0.08] bg-white/98 shadow-[0_-12px_40px_rgba(15,23,42,0.08)] backdrop-blur-md',
  },
  'market-utility': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/96 text-[#1f2617] shadow-[0_1px_0_rgba(64,76,34,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white',
    nav: 'text-[#56604b] hover:text-[#1f2617]',
    search: 'border border-[#d7deca] bg-white text-[#56604b]',
    cta: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    post: 'border border-[#d7deca] bg-white text-[#1f2617] hover:bg-[#eef2e4]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => getRecipeEnabledTasks().filter((task) => task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask =
    getRecipeEnabledTasks().find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('relative sticky top-0 z-50 w-full', palette.shell)}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-200/40 to-transparent" aria-hidden />
        <nav className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6 lg:px-8" aria-label="Main">
          <div className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3 rounded-2xl outline-none ring-offset-2 transition-transform duration-200 hover:opacity-95 focus-visible:ring-2 focus-visible:ring-sky-400/50"
            >
              <div className={cn('flex h-11 w-11 items-center justify-center overflow-hidden p-1.5 sm:h-12 sm:w-12', palette.logo)}>
                <img
                  src="/favicon.png?v=20260416"
                  alt={`${SITE_CONFIG.name} logo`}
                  width="48"
                  height="48"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-lg font-semibold tracking-tight sm:text-xl">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-[#737373]">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              <Link href="/" className={directoryNavLinkClass(pathname === '/', palette.nav)}>
                Home
              </Link>
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={directoryNavLinkClass(isActive, palette.nav)}>
                    {task.label}
                  </Link>
                )
              })}
              <Link href="/search" className={directoryNavLinkClass(pathname.startsWith('/search'), palette.nav)}>
                Search
              </Link>
              <Link href="/contact" className={directoryNavLinkClass(pathname.startsWith('/contact'), palette.nav)}>
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 justify-center px-2 lg:flex lg:px-4">
            <form
              action="/search"
              method="get"
              role="search"
              className={cn(
                'flex h-11 w-full max-w-md min-w-0 items-center gap-2 rounded-full border border-black/[0.08] pl-2.5 pr-1.5 transition-[box-shadow,border-color,background-color] duration-200 focus-within:border-sky-300/60 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(56,189,248,0.2),0_8px_24px_rgba(15,23,42,0.06)] sm:max-w-lg sm:gap-2.5 sm:pl-3 xl:max-w-xl',
                palette.search,
              )}
            >
              <input type="hidden" name="master" value="1" />
              <Search className="pointer-events-none h-4 w-4 shrink-0 text-[#64748b]" aria-hidden />
              <label htmlFor="navbar-search-q" className="sr-only">
                Search businesses and services
              </label>
              <input
                id="navbar-search-q"
                type="search"
                name="q"
                enterKeyHint="search"
                placeholder="Businesses, services, neighborhoods…"
                className="min-h-0 min-w-0 flex-1 bg-transparent py-2 text-sm text-[#0a0a0a] outline-none placeholder:text-[#94a3b8]"
                autoComplete="off"
              />
              <button
                type="submit"
                className={cn(
                  'inline-flex shrink-0 items-center justify-center rounded-full px-3.5 py-2 text-xs font-semibold text-white sm:px-4',
                  palette.cta,
                )}
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4 font-semibold text-[#404040] hover:bg-black/[0.06] hover:text-black">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full font-semibold', palette.cta)}>
                  <Link href="/register" className="inline-flex items-center">
                    <Plus className="mr-1.5 h-4 w-4" />
                    Create Account
                  </Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-[#404040] hover:bg-black/[0.06] lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="directory-mobile-nav"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen ? (
          <div
            id="directory-mobile-nav"
            className={cn('max-h-[min(78vh,520px)] overflow-y-auto overscroll-contain', palette.mobile)}
          >
            <div className="space-y-2 px-4 py-4 pb-6">
              <form
                action="/search"
                method="get"
                role="search"
                onSubmit={() => setIsMobileMenuOpen(false)}
                className={cn('mb-2 flex flex-col gap-2 rounded-2xl border border-black/[0.06] p-3 shadow-sm', palette.search)}
              >
                <input type="hidden" name="master" value="1" />
                <div className="flex items-center gap-2 rounded-xl bg-white/70 px-2 py-1">
                  <Search className="h-4 w-4 shrink-0 text-[#64748b]" aria-hidden />
                  <input
                    type="search"
                    name="q"
                    enterKeyHint="search"
                    placeholder="Search businesses…"
                    className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#0a0a0a] outline-none placeholder:text-[#94a3b8]"
                    autoComplete="off"
                  />
                </div>
                <button type="submit" className={cn('h-11 w-full rounded-xl text-sm font-semibold', palette.cta)}>
                  Search
                </button>
              </form>
              <p className="mb-2 px-1 text-xs font-medium uppercase tracking-[0.18em] text-[#94a3b8]">Menu</p>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors duration-150',
                  pathname === '/' ? 'bg-black text-white shadow-sm' : palette.post,
                )}
              >
                Home
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors duration-150',
                  pathname.startsWith('/contact') ? 'bg-black text-white shadow-sm' : palette.post,
                )}
              >
                Contact
              </Link>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors duration-150',
                      isActive ? 'bg-black text-white shadow-sm' : palette.post,
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0 opacity-90" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        ) : null}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav
        className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}
        aria-label="Main"
      >
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260416" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">List Business</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-mobile-nav"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured listings
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div id="site-mobile-nav" className={style.mobile}>
          <div className="max-h-[min(78vh,520px)] space-y-2 overflow-y-auto overscroll-contain px-4 py-4 pb-6">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search businesses
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
