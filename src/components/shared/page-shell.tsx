'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_80%_50%_at_0%_-20%,rgba(56,189,248,0.12),transparent_55%),linear-gradient(180deg,#f8fafc_0%,#ffffff_55%,#f1f9ff_100%)] text-[#0a0a0a]">
      <NavbarShell />
      <main>
        <section className="border-b border-black/[0.06] bg-[linear-gradient(180deg,rgba(248,250,252,0.98),#ffffff)]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl">{title}</h1>
                {description && (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#525252] sm:text-base">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
