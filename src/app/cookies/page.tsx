import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Required for login sessions, security (CSRF protection), load balancing, and remembering cookie consent choices. These cannot be disabled if you want authenticated features.',
  },
  {
    title: 'Functional cookies',
    body: 'Remember preferences such as saved filters, UI density, and locale selections. They make repeat visits smoother without re-asking for the same settings.',
  },
  {
    title: 'Analytics cookies',
    body: 'Help us understand aggregate usage—popular categories, drop-off points, and performance timings. Where possible we aggregate or pseudonymize data.',
  },
  {
    title: 'Marketing cookies',
    body: 'Only used if you opt in. They may measure campaign effectiveness or coordinate remarketing with partner platforms. You can withdraw consent anytime.',
  },
  {
    title: 'Managing cookies',
    body: 'Use our cookie banner controls, browser settings, or industry opt-out tools where available. Blocking essential cookies may break parts of the experience.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="What cookies and similar technologies we use, why we use them, and how you can control them."
    >
      <DirPanel className="mb-8">
        <DirEyebrow>At a glance</DirEyebrow>
        <p className={`mt-3 text-sm leading-relaxed sm:text-base ${dirSurface.muted}`}>
          Cookies are small text files stored on your device. We use them sparingly: to keep you signed in safely, to remember preferences, and—with consent—to improve the product.
        </p>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#94a3b8]">Last updated: April 16, 2026</p>
      </DirPanel>
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <DirPanel key={section.title} variant="soft">
            <h3 className={`text-base font-semibold ${dirSurface.title}`}>{section.title}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${dirSurface.muted}`}>{section.body}</p>
          </DirPanel>
        ))}
      </div>
    </PageShell>
  )
}
