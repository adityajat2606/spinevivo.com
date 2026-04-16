import Link from 'next/link'
import { ArrowRight, BookOpen, LifeBuoy, Search } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Getting started',
    body: 'Create an account, claim a listing, and publish verified hours with photos in one sitting.',
    icon: BookOpen,
  },
  {
    title: 'Search & filters',
    body: 'Use category chips, distance, and open-now toggles together—we designed them to stack without breaking relevance.',
    icon: Search,
  },
  {
    title: 'Trust & verification',
    body: 'Learn what badges mean, how appeals work, and how to update credentials after a move or rebrand.',
    icon: LifeBuoy,
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Guides for neighbors discovering care and movement studios, plus owners managing live profiles."
      actions={
        <>
          <Link href="/status" className={dirSurface.ctaOutline}>
            System status
          </Link>
          <Link href="/contact" className={dirSurface.cta}>
            Contact support
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {topics.map(({ title, body, icon: Icon }) => (
          <DirPanel key={title} variant="soft">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0369a1] shadow-sm">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <h2 className={`mt-4 text-lg font-semibold ${dirSurface.title}`}>{title}</h2>
            <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>{body}</p>
          </DirPanel>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <DirPanel>
          <DirEyebrow>FAQ</DirEyebrow>
          <h3 className={`mt-3 text-xl font-semibold ${dirSurface.title}`}>Short answers to common blockers</h3>
          <Accordion type="single" collapsible className="mt-5 w-full">
            {mockFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-black/[0.06]">
                <AccordionTrigger className="text-left text-sm font-medium text-[#0a0a0a] hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#525252]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DirPanel>
        <div className="space-y-4">
          <DirPanel variant="soft">
            <DirEyebrow>Still stuck?</DirEyebrow>
            <p className={`mt-3 text-sm leading-relaxed ${dirSurface.muted}`}>
              Send screenshots, listing URLs, and what you expected to happen. We route owner issues to a dedicated inbox with SLA tracking.
            </p>
            <Link href="/contact" className={`mt-5 inline-flex ${dirSurface.cta}`}>
              Open a ticket
            </Link>
          </DirPanel>
          <DirPanel variant="inset">
            <p className={`text-sm font-semibold ${dirSurface.title}`}>Pro tip</p>
            <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>
              Updating photos seasonally and confirming holiday hours are the fastest ways to improve ranking—no keyword hacks required.
            </p>
          </DirPanel>
        </div>
      </div>
    </PageShell>
  )
}
