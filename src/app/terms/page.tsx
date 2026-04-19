import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Accepting these terms',
    body: `By accessing ${SITE_CONFIG.name} you agree to these Terms and our Privacy Policy. If you disagree, do not use the service.`,
  },
  {
    title: 'Accounts & eligibility',
    body: 'You must provide accurate registration information, keep credentials secure, and be legally able to enter contracts in your jurisdiction. We may suspend accounts that risk user safety or platform integrity.',
  },
  {
    title: 'Listings & content',
    body: 'You are responsible for content you publish. You grant us a license to host, display, and distribute that content as needed to operate the directory. You represent you have rights to any media or text you upload.',
  },
  {
    title: 'Acceptable use',
    body: 'No unlawful, harassing, deceptive, or spam activity. No attempts to scrape at rates that degrade service for others. No circumvention of technical limits or verification requirements.',
  },
  {
    title: 'Disclaimers',
    body: 'The platform is provided “as is.” We do not endorse every listing; verification signals are informational. For health decisions, consult licensed professionals directly.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the fullest extent permitted by law, we are not liable for indirect or consequential damages arising from use of the site. Some jurisdictions do not allow certain limitations—those limits may not apply to you.',
  },
  {
    title: 'Changes',
    body: 'We may update these Terms. Material changes will be posted on this page with an updated date. Continued use after changes constitutes acceptance.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`Rules for using ${SITE_CONFIG.name}, including accounts, listings, acceptable use, and disclaimers.`}
    >
      <DirPanel className="mb-8">
        <DirEyebrow>Quick read</DirEyebrow>
        <p className={`mt-3 text-sm leading-relaxed sm:text-base ${dirSurface.muted}`}>
          These terms balance openness for owners with protections for visitors. They are written to be readable—still, contact us if something is unclear for your use case.
        </p>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#94a3b8]">Last updated: April 16, 2026</p>
      </DirPanel>
      <div className="space-y-4">
        {sections.map((section) => (
          <DirPanel key={section.title} variant="inset">
            <h3 className={`text-base font-semibold ${dirSurface.title}`}>{section.title}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${dirSurface.muted}`}>{section.body}</p>
          </DirPanel>
        ))}
      </div>
    </PageShell>
  )
}
