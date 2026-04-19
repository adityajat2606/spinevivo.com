import Link from 'next/link'
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'

const services = [
  { name: 'Web app', detail: 'Search, listings, accounts', status: 'operational' as const },
  { name: 'Owner dashboard', detail: 'Edits, media uploads', status: 'operational' as const },
  { name: 'Public API', detail: 'Read endpoints + webhooks', status: 'operational' as const },
  { name: 'Media CDN', detail: 'Image optimization', status: 'degraded' as const },
]

const incidents = [
  {
    date: 'Apr 10, 2026',
    title: 'Elevated latency on image transforms',
    status: 'Monitoring',
    body: 'Edge cache warm-up after a certificate rotation caused slower thumbnails for ~18 minutes. No data loss.',
  },
  {
    date: 'Mar 12, 2026',
    title: 'Delayed email digests',
    status: 'Resolved',
    body: 'Queue backlog cleared; duplicate sends prevented via idempotency keys.',
  },
  {
    date: 'Feb 22, 2026',
    title: 'Search indexing lag',
    status: 'Resolved',
    body: 'New listings appeared after ~25 minute delay. Indexing workers scaled up permanently.',
  },
]

function StatusBadge({ status }: { status: 'operational' | 'degraded' | 'outage' }) {
  if (status === 'operational') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-100">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
        Operational
      </span>
    )
  }
  if (status === 'degraded') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-100">
        <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
        Degraded
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-900 ring-1 ring-rose-100">
      <Clock className="h-3.5 w-3.5" aria-hidden />
      Outage
    </span>
  )
}

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="Live component health for the public app, owner tools, APIs, and media delivery. Updated as incidents progress."
      actions={
        <Link href="/contact" className={dirSurface.ctaOutline}>
          Report an issue
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <DirPanel key={service.name} variant="soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className={`text-lg font-semibold ${dirSurface.title}`}>{service.name}</h2>
                <p className={`mt-1 text-sm ${dirSurface.muted}`}>{service.detail}</p>
              </div>
              <StatusBadge status={service.status} />
            </div>
          </DirPanel>
        ))}
      </div>

      <DirPanel className="mt-10">
        <DirEyebrow>Incident history</DirEyebrow>
        <h3 className={`mt-3 text-xl font-semibold ${dirSurface.title}`}>Recent events</h3>
        <div className="mt-6 space-y-4">
          {incidents.map((incident) => (
            <div key={incident.title} className={`${dirSurface.inset}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-medium uppercase tracking-wide ${dirSurface.muted}`}>{incident.date}</span>
                <span className="rounded-full border border-black/[0.08] bg-white px-2.5 py-0.5 text-[11px] font-semibold text-[#404040]">
                  {incident.status}
                </span>
              </div>
              <p className={`mt-2 text-base font-semibold ${dirSurface.title}`}>{incident.title}</p>
              <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>{incident.body}</p>
            </div>
          ))}
        </div>
      </DirPanel>
    </PageShell>
  )
}
