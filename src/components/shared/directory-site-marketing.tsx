import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Presentational tokens aligned with the homepage directory look (ink + sky wash). */
export const dirSurface = {
  panel:
    'rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:p-8',
  soft: 'rounded-[2rem] border border-black/[0.06] bg-[#f3f8ff]/90 p-6 sm:p-8',
  inset: 'rounded-2xl border border-black/[0.06] bg-[#fafbfd] p-5 sm:p-6',
  muted: 'text-[#525252]',
  title: 'text-[#0a0a0a]',
  eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.22em] text-[#64748b]',
  cta:
    'inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#1a1a1a]',
  ctaOutline:
    'inline-flex h-11 items-center justify-center rounded-full border border-black/[0.1] bg-white px-5 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#f8fafc]',
}

export function DirPanel({
  className,
  variant = 'panel',
  children,
}: {
  className?: string
  variant?: 'panel' | 'soft' | 'inset'
  children: ReactNode
}) {
  const base = variant === 'soft' ? dirSurface.soft : variant === 'inset' ? dirSurface.inset : dirSurface.panel
  return <div className={cn(base, className)}>{children}</div>
}

export function DirEyebrow({ children }: { children: ReactNode }) {
  return <p className={dirSurface.eyebrow}>{children}</p>
}
