import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/team',
    title: `Team | ${SITE_CONFIG.name}`,
    description: `Meet the people building ${SITE_CONFIG.name}—design, partnerships, and support focused on trustworthy local listings.`,
  })
}

const focusAreas = [
  {
    title: 'Product & design',
    body: 'We prototype in real cities, then ship patterns that scale—always testing with first-time visitors, not only power users.',
  },
  {
    title: 'Partnerships',
    body: 'Clinics, studios, and neighborhood anchors help us keep categories honest and recommendations grounded.',
  },
  {
    title: 'Care & trust',
    body: 'Support and moderation stay in-house so policy decisions stay connected to the people on the ground.',
  },
]

export default function TeamPage() {
  return (
    <PageShell
      title="Team"
      description={`Small, senior group across product, partnerships, and operations—building ${SITE_CONFIG.name} as a long-term directory, not a growth hack.`}
      actions={
        <>
          <Link href="/careers" className={dirSurface.cta}>
            View open roles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/company" className={dirSurface.ctaOutline}>
            Company overview
          </Link>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
        <div className="space-y-4">
          {focusAreas.map((area) => (
            <DirPanel key={area.title} variant="soft">
              <h2 className={`text-lg font-semibold ${dirSurface.title}`}>{area.title}</h2>
              <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>{area.body}</p>
            </DirPanel>
          ))}
        </div>
        <DirPanel>
          <DirEyebrow>Leadership & core crew</DirEyebrow>
          <p className={`mt-3 text-sm leading-relaxed ${dirSurface.muted}`}>
            Bios are short on purpose—reach out if you want to collaborate on a city launch or a care vertical.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {mockTeamMembers.map((member) => (
              <div key={member.id} className={`${dirSurface.inset}`}>
                <div className="flex items-start gap-3">
                  <Avatar className="h-14 w-14 border border-black/[0.06]">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className={`font-semibold ${dirSurface.title}`}>{member.name}</p>
                    <p className={`text-xs ${dirSurface.muted}`}>{member.role}</p>
                    {member.location ? (
                      <p className={`mt-2 flex items-center gap-1 text-xs ${dirSurface.muted}`}>
                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {member.location}
                      </p>
                    ) : null}
                  </div>
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${dirSurface.muted}`}>{member.bio}</p>
              </div>
            ))}
          </div>
        </DirPanel>
      </div>
    </PageShell>
  )
}
