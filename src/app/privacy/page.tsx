import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'

const sections = [
  {
    title: 'Information we collect',
    body: 'Account details you provide (name, email, phone where required), listing content you upload, usage events (pages viewed, searches, device type), and support conversations you start with our team.',
  },
  {
    title: 'How we use information',
    body: 'To operate and improve the directory, personalize search results where allowed, detect fraud or policy violations, send transactional emails, and comply with legal obligations. We do not sell personal data to data brokers.',
  },
  {
    title: 'Sharing',
    body: 'We share data with subprocessors that help us host infrastructure, send email, and analyze reliability—all under contracts with confidentiality and security commitments. Public listing content is visible on the site as you publish it.',
  },
  {
    title: 'Retention & deletion',
    body: 'We keep account data while your account is active and for a limited period afterward for legal and safety reasons. You may request deletion of personal data subject to exceptions (e.g., fraud investigations).',
  },
  {
    title: 'Security',
    body: 'We use encryption in transit, access controls on production systems, and regular dependency updates. No online service is perfectly secure—report suspected vulnerabilities to our security inbox via Contact.',
  },
  {
    title: 'Your choices',
    body: 'Manage marketing preferences in account settings, export certain data on request, and contact us to exercise privacy rights available in your jurisdiction.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How we collect, use, store, and protect information when you use this platform—as a visitor, listing owner, or partner."
    >
      <DirPanel className="mb-8">
        <DirEyebrow>Summary</DirEyebrow>
        <p className={`mt-3 text-sm leading-relaxed sm:text-base ${dirSurface.muted}`}>
          We run a business directory. That means we process both account data (private) and listing content (public by design). This policy explains the split, your controls, and how to reach us with questions.
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
